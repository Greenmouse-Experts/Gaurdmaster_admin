import { useState, useEffect, useCallback } from "react";
import { Portal } from "react-portal";
import { FaTimes } from "react-icons/fa";

// Map the old @material-tailwind dialog sizes onto tailwind max-widths.
const sizeMap = {
  xs: "max-w-md",
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
};

const useModal = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = useCallback((state) => setModal(state), []);

  const Modal = ({ title, children, size, type }) => {
    // Close on ESC while open.
    useEffect(() => {
      if (!showModal) return;
      const onKeyDown = (e) => {
        if (e.key === "Escape") setShowModal(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal]);

    if (!showModal) return null;

    return (
      <Portal>
        {/* Full-viewport overlay (Portal -> body, so `fixed` = viewport,
            unaffected by any transformed ancestor). Flex centres the box. */}
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${
              sizeMap[size] || sizeMap.md
            } max-h-[90vh] overflow-y-auto rounded-lg bg-white py-5 shadow-2xl outline-none`}
          >
            <div className="px-4 pb-2">
              {type === "withCancel" ? (
                <div className="flex items-center justify-between w-full border-b px-2 pb-2">
                  <p className="text-xl">{title}</p>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
              ) : (
                <p className="text-center w-full">{title}</p>
              )}
            </div>
            <div className="px-4">{children}</div>
          </div>
        </div>
      </Portal>
    );
  };

  return { Modal, showModal, setShowModal };
};

export default useModal;
