import React, { useState } from "react";
import { createSubContent } from "../../../../services/api/programsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadImage, uploadVideo } from "../../../../services/api/routineApi";

const CreateSubContent = ({ id, courseId, close, refetch }) => {
  const create = useMutation({
    mutationFn: createSubContent,
    mutationKey: ["addContent"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const medias = [
    {
        name: "media",
        value: "image",
        naming: "Image",
        accepts: "image/*",
      },
    {
      name: "media",
      value: "video",
      naming: "Video",
      accepts: "video/mp4,video/x-m4v,video/*",
    },
    {
      name: "media",
      value: "document",
      naming: "File/Document",
      accepts:
        ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    {
      name: "media",
      value: "audio",
      naming: "Audio",
      accepts: "audio/mp3,audio/*;capture=microphone",
    },
  ];
  const [userDetail, setUserDetail] = useState({
    title: "",
    course: courseId,
    courseContent: id,
    duration: 0,
    media: "",
    previewUrl: "", // optional
    mediaType: "",
  });
  const handleMediaChange = (e, accepts) => {
    setUserDetail({ ...userDetail, mediaType: e });
    setMediaType(accepts);
  };
  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };
  const getUpload = () => {
    if(userDetail.mediaType === "video"){
      return uploadVideo
    }else if(userDetail.mediaType === "image"){
      return uploadImage
    }else return;
  }
  const mutation = useMutation({
    mutationFn: getUpload(),
    onSuccess: (data) => {
      const payload = {
        ...userDetail,
        duration: Number(userDetail.duration),
        media: userDetail.media === "image"? data.image : data.video,
        previewUrl: userDetail.media === "image"? data.image : data.video,
      };
      create.mutate(payload, {
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
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    if(userDetail.media === "" || userDetail.title === "" || userDetail.duration === 0){
        toast.info('Please fill the required fields')
        return ;
    }
    const fd = new FormData()
    fd.append(userDetail.mediaType, userDetail.media)
    userDetail.previewUrl !== "" && fd.append(userDetail.mediaType, userDetail.previewUrl)
    mutation.mutate(fd)
  };
  return (
    <div className="px-4">
      <form action="" onSubmit={submitAction}>
        <div className="max-h-[400px] overflow-y-auto">
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
              <label>Course Duration (minutes)</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Course Duration"
                  value={userDetail.duration}
                  required
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-6">
              <p>Course Media TYpe</p>
              <div className="flex gap-x-5 lg:gap-x-12 mt-3">
                {medias.map((item, i) => (
                  <div className="flex items-center gap-x-4">
                    <input
                      type="radio"
                      name={item.name}
                      value={item.value}
                      onChange={(e) =>
                        handleMediaChange(e.target.value, item.accepts)
                      }
                      className="w-6 h-6"
                    />
                    <label className="block">{item.naming}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p>Course Media</p>
              <div className="mt-3 border p-4 place-center relative">
                {userDetail.media === "" ? (
                  <p
                    className={`text-white relative z-0 !syne px-6 py-2 my-6 rounded-lg ${
                      mediaType === "" ? "bg-gray-300" : "bg-gray-900"
                    }`}
                  >
                    Click To Upload
                  </p>
                ) : (
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1708094709/GuardMaster/539-5398854_files-png-image-file-types-of-office-files_tjgdso.png"
                    alt="image"
                    className="w-44"
                  />
                )}
                <input
                  type="file"
                  accept={mediaType}
                  onChange={(e) => handleChange("media", e.target.files[0])}
                  className="absolute z-10 top-0 left-0 w-full h-full opacity-0"
                />
              </div>
            </div>
            <div className="mt-6">
              <p>Course Media Preview</p>
              <div className="mt-3 border p-4 place-center relative">
                {userDetail.previewUrl === "" ? (
                  <p
                    className={`text-white relative z-0 !syne px-6 py-2 my-6 rounded-lg ${
                      mediaType === "" ? "bg-gray-300" : "bg-gray-900"
                    }`}
                  >
                    Click To Upload
                  </p>
                ) : (
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1708094709/GuardMaster/539-5398854_files-png-image-file-types-of-office-files_tjgdso.png"
                    alt="image"
                    className="w-44"
                  />
                )}
                <input
                  type="file"
                  accept={mediaType}
                  onChange={(e) =>
                    handleChange("previewUrl", e.target.files[0])
                  }
                  className="absolute z-10 top-0 left-0 w-full h-full opacity-0"
                />
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

export default CreateSubContent;
