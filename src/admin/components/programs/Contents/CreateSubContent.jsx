import React, { useState } from "react";
import { createSubContent } from "../../../../services/api/programsApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  uploadAudio,
  uploadFile,
  uploadImage,
  uploadVideo,
} from "../../../../services/api/routineApi";

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
        ".doc,.docx,.ppt,.pptx,.pdf",
    },
    {
      name: "media",
      value: "audio",
      naming: "Audio",
      accepts: "audio/mp3,audio/*;capture=microphone",
    },
  ];
  const formatSize = {
    image: "Image size must not be above 1mb",
    video: "Video size should not be above 100mb",
    audio: "Audio file size should not be above 8mb",
    document: "Document size should not be above 10mb"
  }
  const [userDetail, setUserDetail] = useState({
    title: "",
    description: "",
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
    if (userDetail.mediaType === "video") {
      return uploadVideo;
    } else if (userDetail.mediaType === "image") {
      return uploadImage;
    } else if (userDetail.mediaType === "document") {
      return uploadFile;
    } else if (userDetail.mediaType === "audio") {
      return uploadAudio;
    } else return;
  };
  const mutation = useMutation({
    mutationFn: getUpload(),
    onSuccess: (data) => {
      const payload = {
        ...userDetail,
        duration: Number(userDetail.duration),
        media:
          userDetail.mediaType === "image"
            ? data.image
            : userDetail.mediaType === "video"
              ? data.video
              : userDetail.mediaType === "audio"
                ? data.audio
                : data.doc,
        previewUrl: userDetail.previewUrl === "" ? null : userDetail.previewUrl,
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
    onError: (error) => {
      toast.error(error.response.data.message);
      setIsBusy(false);
    },
  });
  const submitAction = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    if (
      userDetail.media === "" ||
      userDetail.title === ""
    ) {
      toast.info("Please fill the required fields");
      return;
    }
    // validate sizes
    if(userDetail.mediaType === "image"){
      if (userDetail.media.size > 1 * 1000 * 1024) {
        toast.info("Only images with maximum size of 1MB is allowed");
        return;
      }
    }
    if(userDetail.mediaType === "video"){
      if (userDetail.media.size > 50 * 1000 * 1024) {
        toast.info("Only video with maximum size of 50MB is allowed");
        return;
      }
    }
    if(userDetail.mediaType === "document"){
      if (userDetail.media.size > 10 * 1000 * 1024) {
        toast.info("Only documents with maximum size of 10MB is allowed");
        return;
      }
    }
    if(userDetail.mediaType === "audio"){
      if (userDetail.media.size > 8 * 1000 * 1024) {
        toast.info("Only audios with maximum size of 8MB is allowed");
        return;
      }
    }
    if (userDetail.previewUrl) {
      if (userDetail.mediaType === "image") {
        const fd = new FormData();
        fd.append("image", userDetail.previewUrl);
        await uploadImage(fd)
          .then((data) => {
            setUserDetail({ ...userDetail, previewUrl: data.image });
          })
          .catch(() => { });
      } else if (userDetail.mediaType === "video") {
        const fd = new FormData();
        fd.append("video", userDetail.previewUrl);
        await uploadVideo(fd)
          .then((data) => {
            setUserDetail({ ...userDetail, previewUrl: data.video });
          })
          .catch(() => { });
      } else if (userDetail.mediaType === "document") {
        const fd = new FormData();
        fd.append("doc", userDetail.previewUrl);
        await uploadFile(fd)
          .then((data) => {
            setUserDetail({ ...userDetail, previewUrl: data.doc });
          })
          .catch(() => { });
      } else if (userDetail.mediaType === "audio") {
        const fd = new FormData();
        fd.append("audio", userDetail.previewUrl);
        await uploadVideo(fd)
          .then((data) => {
            setUserDetail({ ...userDetail, previewUrl: data.audio });
          })
          .catch(() => { });
      } else {
      }
    }
    const fd = new FormData();
    fd.append(userDetail.mediaType === "document" ? "doc" : userDetail.mediaType, userDetail.media);
    mutation.mutate(fd);
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
          <div className="input mt-5">
            <label>Description</label>
            <div>
              <textarea
                rows={4}
                placeholder="Enter Description"
                value={userDetail.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
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
              <p className="fs-400 italic">{formatSize[userDetail.mediaType]}</p>
              <div className="mt-3 border p-4 place-center relative">
                {userDetail.media === "" ? (
                  <p
                    className={`text-white relative z-0 !syne px-6 py-2 my-6 rounded-lg ${mediaType === "" ? "bg-gray-300" : "bg-gray-900"
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
                    className={`text-white relative z-0 !syne px-6 py-2 my-6 rounded-lg ${mediaType === "" ? "bg-gray-300" : "bg-gray-900"
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
