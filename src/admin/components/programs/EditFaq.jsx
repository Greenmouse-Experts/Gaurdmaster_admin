import { useState } from "react";
import { updateFaq } from "../../../services/api/faqsApi";
import { toast } from "react-toastify";

const EditFaq = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [faqDetail, setFaqDetail] = useState({
    question: data?.question || "",
    answer: data?.answer || "",
  });
  const handleChange = (name, value) => {
    setFaqDetail({ ...faqDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    updateFaq(data.id, faqDetail)
      .then((data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
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
            <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
              {isBusy ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFaq;
