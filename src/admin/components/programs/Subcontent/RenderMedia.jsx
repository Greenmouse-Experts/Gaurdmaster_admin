import React from "react";
import ReactPlayer from "react-player/lazy";

const RenderMedia = ({ type, url }) => {
  return (
    <div className="w-full">
      {type === "image" || type === "assessment" ? (
        <div className="w-full">
          <img src={url} alt="tutorial-image" className="w-full" />
        </div>
      ) : type === "video" ? (
        <div className="relative -top-10">
          <ReactPlayer url={url} width={"100%"} height={250} controls />
        </div>
      ) : type === "audio" ? (
        <ReactPlayer
          url={url}
          light="https://res.cloudinary.com/greenmouse-tech/image/upload/v1713435463/GuardMaster/audio-file-types_mqpnwr.jpg"
          width={"100%"}
          controls
          height={220}
          style={{ background: "#111827" }}
        />
      ) : type === "document" ? (
        <div className="border">
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1713439463/GuardMaster/doc-img_xhu8zb.jpg"
            alt="file-image"
            className="w-full h-[250px] object-cover"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RenderMedia;
