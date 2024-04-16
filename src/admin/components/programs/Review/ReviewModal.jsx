import React, { useState } from "react";
import ProfileAvatar from "../../../../Components/ProfileAvatar";
import { Rating } from "@material-tailwind/react";
import { RiVolumeMuteLine } from "react-icons/ri";
import { muteCourseReview, unmuteCourseReview } from "../../../../services/api/programsApi";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { MdOutlineVolumeMute } from "react-icons/md";

const ReviewModal = ({ data }) => {
  const [active, setActive] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const muteThisReview = async (id) => {
    setActive(id);
    setIsBusy(true);
    await muteCourseReview(id)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
      })
      .catch(() => {});
  };
  const unmuteThisReview = async (id) => {
    setActive(id);
    setIsBusy(true);
    await unmuteCourseReview(id)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
      })
      .catch(() => {});
  };
  return (
    <div className="grid gap-2 max-h-[500px] overflow-y-auto">
      {data &&
        data?.length &&
        data.map((item) => (
          <div className="border-b pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div>
                  <ProfileAvatar
                    url={item.user.picture}
                    fname={item.user.firstName}
                    lname={item.user.lastName}
                    size={60}
                    font={17}
                  />
                </div>
                <div>
                  <p>{`${item.user.firstName} ${item.user.lastName}`}</p>
                  <div>
                    <Rating value={item.rating} />
                  </div>
                </div>
              </div>
              <div>
               {!item.muted && <div>
                {isBusy && active === item.id ? (
                  <BeatLoader color="black" size={9} />
                ) : (
                  <div
                    className="flex gap-x-2 px-3 cursor-pointer rounded items-center border border-gray-400"
                    onClick={() => muteThisReview(item.id)}
                  >
                    <RiVolumeMuteLine className="text-lg" />
                    <p className="fw-500">Mute</p>
                  </div>
                )}
                </div>}
                {item.muted && <div>
                {isBusy && active === item.id ? (
                  <BeatLoader color="black" size={9} />
                ) : (
                  <div
                    className="flex gap-x-1 cursor-pointer px-3 rounded items-center border border-gray-400"
                    onClick={() => unmuteThisReview(item.id)}
                  >
                    <MdOutlineVolumeMute className="text-2xl" />
                    <p className="fw-500">Unmute</p>
                  </div>
                )}
                </div>}
              </div>
            </div>
            <div className="mt-1">
              <p className="fs-500">{item.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewModal;
