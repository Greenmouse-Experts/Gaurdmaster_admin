import React, { useState } from "react";
import { createSubContent } from "../../../../services/api/programsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CreateSubContent = ({ id, cntId, close, refetch }) => {
  const create = useMutation({
    mutationFn: createSubContent,
    mutationKey: ["addContent"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [mediaType, setMediaType] = useState('')
  const medias = [
    {
        name: "media",
        value: "video",
        naming: "Image/Video",
        accepts: "video/mp4,video/x-m4v,video/*,image/*"
    },
    {
        name: "media",
        value: "file",
        naming: "File/Document",
        accepts: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    {
        name: "media",
        value: "audio",
        naming: "Audio",
        accepts: "audio/mp3,audio/*;capture=microphone"
    },
  ]
  const [userDetail, setUserDetail] = useState({
    title: "",
    course: id,
    courseContent: cntId,
    duration: 0,
    media: "https://www.udemy.com/course/100-days-of-code/",
    previewUrl: "https://www.udemy.com/course/100-days-of-code/", // optional
    mediaType: ""
  });
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    create.mutate(userDetail, {
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
    <div className="px-4">
      <form action="" onSubmit={submitAction}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="input">
            <label>Course Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Course Title"
                value={userDetail.title}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="input">
            <label>Course Duration</label>
            <div>
              <input
                type="text"
                placeholder="Enter Course Duration"
                value={userDetail.duration}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
            <div>
                <p>Course Media TYpe</p>
                <div>
                    {
                        medias.map((item, i) => (
                            <div>
                                <input type="checkbox" name={item.name} value={item.value} className="w-4 h-4" />
                                <label>{item.naming}</label>
                            </div>
                        ))
                    }
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

export default CreateSubContent;
