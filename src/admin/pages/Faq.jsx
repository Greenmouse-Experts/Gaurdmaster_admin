import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import { FaPlus } from "react-icons/fa6";
import FaqsList from "../components/programs/FaqsList";
import AddFaq from "../components/programs/AddFaq";
import { getFaqs } from "../../services/api/faqsApi";
import { toast } from "react-toastify";

const PAGE_SIZE = 10;

const Faqs = () => {
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getFaqs", page],
    queryFn: () => getFaqs(page),
    placeholderData: keepPreviousData,
  });
  const { Modal, setShowModal } = useModal();

  const faqs = Array.isArray(data) ? data : data?.data;
  const count = data?.count;

  const handleNext = () => {
    if (page * PAGE_SIZE >= count) {
      toast.info("This is the last page");
    } else {
      setPage((old) => old + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((old) => old - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.info("This is the first page");
    }
  };

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
          <FaqsList
            data={faqs}
            refetch={refetch}
            isLoading={isLoading}
            next={handleNext}
            prev={handlePrev}
            page={page}
            count={count}
          />
        </div>
      </div>
      <Modal title={"Add New FAQ"} size={"md"} type={"withCancel"}>
        <AddFaq close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Faqs;
