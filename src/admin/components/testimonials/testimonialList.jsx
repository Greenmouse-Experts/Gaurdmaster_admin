import React, { useState } from "react";
import Picker from "../../../Components/Loaders/Picker";
import ProfileAvatar from "../../../Components/ProfileAvatar";
import { RiDeleteBinLine } from "react-icons/ri";
import useDialog from "../../../hooks/useDialog";
import ReusableModal from "../../../Components/ReusableModal";
import { deleteTestimonial, updateTestimonial } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const TestimonialList = ({ data, isLoading, refetch }) => {
  const {role} = useAuth()
  const { Dialog: Update, setShowModal: ShowUpdate } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();
  const [selected, setSelected] = useState({ id: "", type: "" });
  const [selectedId, setSelectedId] = useState('')
  const openRetract = (item) => {
    setSelected({ id: item, type: "retract" });
    ShowUpdate(true);
  };
  const openPublish = (item) => {
    setSelected({ id: item, type: "publish" });
    ShowUpdate(true);
  };
  const openDelete = (item) => {
    setSelectedId(item);
    ShowDelete(true)

  }
  const updateTest = async () => {
    const payload = {
      isPublished: selected.type === "publish" ? true : false,
    };
    await updateTestimonial(selected.id, payload)
      .then((res) => {
        toast.success(res.message);
        refetch();
        ShowUpdate(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const deleteTest = async () => {
    await deleteTestimonial(selectedId)
    .then((res) => {
      toast.success(res.message);
      refetch();
      ShowDelete(false);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  }
  return (
    <div>
      {isLoading && (
        <div className="place-center py-36">
          <Picker size={1.7} />
        </div>
      )}
      <div className="grid gap-y-5">
        {!isLoading &&
          data &&
          data?.data?.map((item) => (
            <div className="lg:flex border-b-2 pb-5">
              <div className="lg:w-9/12">
                <div className="flex gap-x-3 items-center">
                  <div className="">
                    <ProfileAvatar
                      url={item.user.picture}
                      fname={item.user.firstName}
                      lname={item.user.lastName}
                      size={40}
                      font={13}
                    />
                  </div>
                  <div className="">
                    <p className="fw-500 !p-0">{`${item.user.firstName} ${item.user.lastName}`}</p>
                    <p className="fs-500 !p-0">{item.user.email}</p>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="!p-0">{item.testimony}</p>
                </div>
              </div>
              {role === "admin" && <div className="lg:w-3/12">
                <div className="lg:flex justify-end">
                  {item.isPublished ? (
                    <div className="flex items-center gap-x-2">
                      <span className="bg-green-600 w-4 h-4 circle"></span>{" "}
                      <span className="fw-500 text-green-600">Published</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <span className="bg-orange-600 w-4 h-4 circle"></span>{" "}
                      <span className="fw-500 text-orange-600">Draft</span>
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-x-3 lg:justify-end">
                    {item.isPublished ? (
                      <span className="fw-500 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg cursor-pointer" onClick={() => openRetract(item.id)}>
                        Retract
                      </span>
                    ) : (
                      <span className="fw-500 text-green-600 bg-green-50 px-2 py-1 rounded-lg cursor-pointer" onClick={() => openPublish(item.id)}>
                        Publish
                      </span>
                    )}
                    <RiDeleteBinLine className="text-xl text-red-600 cursor-pointer" onClick={() => openDelete(item.id)}/>
                  </div>
                </div>
              </div>}
            </div>
          ))}
      </div>
      <Update title={""} size={"sm"}>
        <ReusableModal
          title={
            "Are you sure you want to update the status of this testimonial"
          }
          closeModal={() => ShowUpdate(false)}
          cancelTitle={"No, Close"}
          actionTitle={"Yes, Update"}
          action={updateTest}
        />
      </Update>
      <Delete title={""} size={"sm"}>
        <ReusableModal
          title={
            "Are you sure you want to delete this testimonial"
          }
          closeModal={() => ShowDelete(false)}
          cancelTitle={"No, Close"}
          actionTitle={"Yes, Delete"}
          action={deleteTest}
        />
      </Delete>
    </div>
  );
};

export default TestimonialList;
