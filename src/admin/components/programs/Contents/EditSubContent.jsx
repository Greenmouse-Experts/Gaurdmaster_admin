import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateSubContent } from "../../../../services/api/programsApi";
import {
  uploadAudio,
  uploadFile,
  uploadImage,
  uploadVideo,
} from "../../../../services/api/routineApi";
import { toast } from "react-toastify";

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
    accepts: ".doc,.docx,.ppt,.pptx,.pdf",
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
  video: "Video size should not be above 50mb",
  audio: "Audio file size should not be above 8mb",
  document: "Document size should not be above 10mb",
};

// max size (MB) per media type, matching the create flow
const sizeLimits = {
  image: 1,
  video: 50,
  document: 10,
  audio: 8,
};

// upload a single file for the given media type and return its hosted url
const uploadMedia = async (mediaType, file) => {
  const fd = new FormData();
  const field = mediaType === "document" ? "doc" : mediaType;
  fd.append(field, file);
  if (mediaType === "image") return (await uploadImage(fd)).image;
  if (mediaType === "video") return (await uploadVideo(fd)).video;
  if (mediaType === "audio") return (await uploadAudio(fd)).audio;
  return (await uploadFile(fd)).doc;
};

const EditSubContent = ({ close, refetch, item }) => {
  const update = useMutation({
    mutationFn: (payload) => updateSubContent(item.id, payload),
    mutationKey: ["editSubContent"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const [mediaType, setMediaType] = useState(
    medias.find((m) => m.value === item?.mediaType)?.accepts || ""
  );
  const [userDetail, setUserDetail] = useState({
    title: item?.title || "",
    description: item?.description || "",
    duration: item?.duration || 0,
    media: "",
    previewUrl: "",
    mediaType: item?.mediaType || "",
  });

  const handleMediaChange = (value, accepts) => {
    setUserDetail({
      ...userDetail,
      mediaType: value,
      media: "",
      previewUrl: "",
    });
    setMediaType(accepts);
  };

  const handleChange = (name, value) => {
    setUserDetail({ ...userDetail, [name]: value });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    if (userDetail.title === "") {
      toast.info("Please fill the required fields");
      return;
    }
    setIsBusy(true);

    let payload = {
      title: userDetail.title,
      description: userDetail.description,
      duration: Number(userDetail.duration),
    };

    // A new media file is optional on edit — only upload when one is selected.
    if (userDetail.media) {
      if (!userDetail.mediaType) {
        toast.info("Please select a media type");
        setIsBusy(false);
        return;
      }
      const maxBytes = sizeLimits[userDetail.mediaType] * 1000 * 1024;
      if (userDetail.media.size > maxBytes) {
        toast.info(formatSize[userDetail.mediaType]);
        setIsBusy(false);
        return;
      }
      try {
        const previewUrl = userDetail.previewUrl
          ? await uploadMedia(userDetail.mediaType, userDetail.previewUrl)
          : null;
        const media = await uploadMedia(userDetail.mediaType, userDetail.media);
        payload = {
          ...payload,
          media,
          mediaType: userDetail.mediaType,
          previewUrl,
        };
      } catch (error) {
        toast.error(error?.response?.data?.message || "Upload failed");
        setIsBusy(false);
        return;
      }
    }

    update.mutate(payload, {
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
      <form onSubmit={submitAction}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="input">
              <label>Sub Content Title</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Sub Content Title"
                  value={userDetail.title}
                  required
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Duration (minutes)</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Duration"
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
              <p>Course Media Type</p>
              <p className="fs-400 italic">
                Leave the media empty to keep the current file.
              </p>
              <div className="flex gap-x-5 lg:gap-x-12 mt-3">
                {medias.map((mediaItem, i) => (
                  <div className="flex items-center gap-x-4" key={i}>
                    <input
                      type="radio"
                      name={mediaItem.name}
                      value={mediaItem.value}
                      checked={userDetail.mediaType === mediaItem.value}
                      onChange={() =>
                        handleMediaChange(mediaItem.value, mediaItem.accepts)
                      }
                      className="w-6 h-6"
                    />
                    <label className="block">{mediaItem.naming}</label>
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
                    className={`text-white relative z-0 !syne px-6 py-2 my-6 rounded-lg ${
                      mediaType === "" ? "bg-gray-300" : "bg-gray-900"
                    }`}
                  >
                    Click To Upload
                  </p>
                ) : (
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1708094709/GuardMaster/539-5398854_files-png-image-file-types-of-office-files_tjgdso.png"
                    alt="media"
                    className="w-44"
                  />
                )}
                <input
                  type="file"
                  accept={mediaType}
                  disabled={mediaType === ""}
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
                    alt="preview"
                    className="w-44"
                  />
                )}
                <input
                  type="file"
                  accept={mediaType}
                  disabled={mediaType === ""}
                  onChange={(e) => handleChange("previewUrl", e.target.files[0])}
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

export default EditSubContent;
