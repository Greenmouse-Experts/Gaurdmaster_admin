import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getCourses } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import AddCourse from "../components/programs/AddCourse";
import CoursesList from "../components/programs/CourseList";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ThemeProvider from "../components/programs/ThemeProvider";

const PAGE_SIZE = 10;

const defaultFilters = {
  search: "",
  title: "",
  price: "",
  orderBy: "createdDate",
  sortOrder: "DESC",
};

const Courses = () => {
  const { role } = useAuth();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);
  const [debouncedFilters, setDebouncedFilters] = useState(defaultFilters);
  const route = role === "admin" ? "courses" : "courses/instructor";

  // Debounce the filters so we don't fire a request on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getCourses", page, debouncedFilters, route],
    queryFn: () =>
      getCourses({ page, pageSize: PAGE_SIZE, ...debouncedFilters }, route),
    placeholderData: keepPreviousData,
  });
  const { Modal, setShowModal } = useModal();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((old) => ({ ...old, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleNext = () => {
    if (page * PAGE_SIZE > data?.count) {
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
          <h2>All Courses</h2>
          <div
            to="/adduser"
            className="cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            Add New Course
          </div>
        </div>
        <ThemeProvider className="flex flex-wrap items-end gap-3 mb-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text ">Search</span>
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search courses"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              placeholder="Filter by title"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Filter by price"
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Order By</span>
            </div>
            <select
              name="orderBy"
              value={filters.orderBy}
              onChange={handleFilterChange}
              className="select select-bordered select-sm w-full max-w-xs"
            >
              <option value="createdDate">Created Date</option>
              <option value="title">Title</option>
              <option value="price">Price</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sort Order</span>
            </div>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="select select-bordered select-sm w-full max-w-xs"
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className="btn btn-outline btn-sm self-end"
          >
            Reset
          </button>
        </ThemeProvider>
        <div className="card_table">
          <CoursesList
            data={data?.data}
            isLoading={isLoading}
            refetch={refetch}
            next={handleNext}
            prev={handlePrev}
            page={page}
            count={data?.count}
          />
        </div>
      </div>
      <Modal title={"Add New Course"} size={"lg"} type={"withCancel"}>
        <AddCourse close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default Courses;
