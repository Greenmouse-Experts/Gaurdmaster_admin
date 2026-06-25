import { useQuery } from "@tanstack/react-query";
import React from "react";
import useModal from "../../hooks/useModal";
import { FaPlus } from "react-icons/fa6";
import FaqsList from "../components/programs/FaqsList";
import AddFaq from "../components/programs/AddFaq";
import { getFaqs } from "../../services/api/faqsApi";

const Faqs = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getFaqs"],
    queryFn: getFaqs,
  });
  const { Modal, setShowModal } = useModal();

  // The /faqs endpoint may return the array directly or wrapped in { data }.
  const faqs = Array.isArray(data) ? data : data?.data;

  return (
    <>
      <div className="adminman">
        <div className="admin_head">
          <h2>All FAQs</h2>
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus />
            Add New FAQ
          </div>
        </div>
        <div className="card_table">
          <FaqsList data={faqs} refetch={refetch} isLoading={isLoading} />
        </div>
      </div>
      <Modal title={"Add New FAQ"} size={"md"} type={"withCancel"}>
        <AddFaq close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Faqs;
