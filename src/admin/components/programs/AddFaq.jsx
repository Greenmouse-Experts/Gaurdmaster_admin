import { useState } from "react";
import { createFaq } from "../../../services/api/faqsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddFaq = ({ close, refetch }) => {
  const create = useMutation({
    mutationFn: createFaq,
    mutationKey: ["addFaq"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [faqDetail, setFaqDetail] = useState({
    question: "",
    answer: "",
  });
  const handleChange = (name, value) => {
    setFaqDetail({ ...faqDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    create.mutate(faqDetail, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        close();
      },
      onError: (error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="px-4">
        <form action="" onSubmit={submitAction}>
          <div className="input">
            <label>Question</label>
            <div>
              <input
                type="text"
                placeholder="Enter Question"
                value={faqDetail.question}
                required
                onChange={(e) => handleChange("question", e.target.value)}
              />
            </div>
          </div>
          <div className="input mt-4">
            <label>Answer</label>
            <div>
              <textarea
                rows={4}
                placeholder="Enter Answer"
                value={faqDetail.answer}
                required
                onChange={(e) => handleChange("answer", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="bg-primary w-full py-3 fw-500 lg:text-lg">
              {isBusy ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFaq;
