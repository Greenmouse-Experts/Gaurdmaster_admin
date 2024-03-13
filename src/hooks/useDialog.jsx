import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const useDialog = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state) => setModal(state);
  const closeModal = () => setModal(false)

  const Dialog = ({ title, children, size, type }) => {
    return (
        <>
          <Modal blockScrollOnMount={false} isCentered motionPreset='slideInBottom' isOpen={showModal} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent className="pb-4">
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                    {children}
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
