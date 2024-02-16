import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";

const useModal = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state) => setModal(state);

  const Modal = ({ title, children, size, type }) => {
    return (
      <>
        <div>
          <Dialog
            open={showModal}
            size={size || "md"}
            handler={() => setShowModal(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
            className="py-5 border-0 outline-none"
          >
            <div>
              <DialogHeader>
                {type === "withCancel" ? (
                  <div className="flex items-center border-b justify-between w-full px-2">
                    <p className="text-xl">{title}</p>{" "}
                    <FaTimes
                      className="text-gray-500"
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                ) : (
                  <p className="text-center w-full">{title}</p>
                )}
              </DialogHeader>
              <DialogBody>{children}</DialogBody>
            </div>
          </Dialog>
        </div>
      </>
    );
  };

  return { Modal, showModal, setShowModal };
};

export default useModal;
