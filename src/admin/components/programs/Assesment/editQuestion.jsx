import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { editQuestion } from "../../../../services/api/programsApi";
import { IoSend } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";

const EditQuestion = ({data, close, refetch}) => {
  const [objective, setObjective] = useState(data.options || []);
  const [answer, setAnswer] = useState(data.correctOption || null);
  const [optionInput, setOptionInput] = useState("");
  const [inputDetail, setInputDetail] = useState({
    question: data?.question || "",
    options: [],
    point: data?.point || 0,
    correctOption: 0,
    isPublished: data.isPublished? "active" : "inactive",
  });
  const handleChange = (name, value) => {
    setInputDetail({ ...inputDetail, [name]: value });
  };
  const handleAddQuestion = () => {
    if (optionInput === "") {
      toast.info("Please input a value");
      return;
    }
    if (objective.includes(optionInput)) {
      toast.info("Option already added");
    } else {
      setObjective([...objective, optionInput]);
      setOptionInput("");
    }
  };
  const removeObjective = (item, i) => {
    const filtered = objective.filter((where) => where !== item);
    if (answer === i + 1) {
      toast.info("Please unselect as answer before removing");
    } else {
      setObjective(filtered);
    }
  };
  const makeAnswer = (item) => {
    setAnswer(Number(item) + 1);
  };
  const [isBusy, setIsBusy] = useState(false);
  const submitAction = async (e) => {
    e.preventDefault();
    if (!answer || !objective.length) {
      toast.info("Please fill the required field");
    }
    setIsBusy(true);
    const payload = {
      ...inputDetail,
      options: objective,
      point: Number(inputDetail.point),
      isPublished: inputDetail.isPublished === "active" ? true : false,
      correctOption: answer,
    };
    await editQuestion(data?.id, payload)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        refetch();
        close();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
      });
  };
  return (
    <div className="px-4">
    <form action="" onSubmit={submitAction}>
      <div className="max-h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-5">
          <div className="input">
            <label>Question</label>
            <div>
              <input
                type="text"
                placeholder="Enter Question"
                value={inputDetail.question}
                required
                onChange={(e) => handleChange("question", e.target.value)}
              />
            </div>
          </div>
          <div className="lg:col-span-2 grid gap-5 lg:grid-cols-2">
            <div className="input">
              <label>Question Point</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Qouestion Point"
                  value={inputDetail.point}
                  required
                  onChange={(e) => handleChange("point", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Published</label>
              <div>
                <select
                  value={inputDetail.isPublished}
                  required
                  onChange={(e) => handleChange("isPublished", e.target.value)}
                  className="p-4"
                >
                  <option value="">Select an option</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2">
              Optinos (click on any of the added options to select the right
              answer)
            </p>
            <div className="">
              <div className="flex items-center mb-2 gap-x-2">
                {!!objective.length &&
                  objective.map((item, i) => (
                    <div
                      className={`flex border border-gray-500 py-1 px-2 items-center gap-x-5 rounded cursor-pointer ${answer === i + 1 && 'bg-green-300'}`}
                      key={i}
                      onClick={() => makeAnswer(i)}
                    >
                      {item}
                      <div onClick={(e) => e.stopPropagation()}>
                          <MdOutlineRemoveCircle className="text-red-600" onClick={() => removeObjective(item, i)} />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex items-center w-full p-2 gap-x-2 border border-gray-700 rounded-lg">
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  className="w-full p-2"
                />
                <IoSend className="text-2xl shrink-0" onClick={handleAddQuestion} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-end">
        <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
          {isBusy ? "Submiting..." : "Submit"}
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditQuestion;
