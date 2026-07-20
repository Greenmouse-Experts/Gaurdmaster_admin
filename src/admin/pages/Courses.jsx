import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getCourses } from "../../services/api/programsApi";
import useModal from "../../hooks/useModal";
import AddCourse from "../components/programs/AddCourse";
import CoursesList from "../components/programs/CourseList";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  ThemeProvider,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";

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
        <ThemeProvider>
          <div className="flex flex-wrap items-end gap-4 mb-4 mt-4">
            <div className="w-48">
              <Input
                label="Search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search courses"
                size="md"
              />
            </div>
            <div className="w-48">
              <Input
                label="Title"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Filter by title"
                size="md"
              />
            </div>
            <div className="w-36">
              <Input
                label="Price"
                type="number"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                placeholder="Filter by price"
                size="md"
              />
            </div>
            <div className="w-40">
              <Select
                label="Order By"
                value={filters.orderBy}
                onChange={(val) =>
                  setFilters((old) => ({ ...old, orderBy: val }))
                }
                size="md"
              >
                <Option value="createdDate">Created Date</Option>
                <Option value="title">Title</Option>
                <Option value="price">Price</Option>
              </Select>
            </div>
            <div className="w-40">
              <Select
                label="Sort Order"
                value={filters.sortOrder}
                onChange={(val) =>
                  setFilters((old) => ({ ...old, sortOrder: val }))
                }
                size="md"
              >
                <Option value="DESC">Descending</Option>
                <Option value="ASC">Ascending</Option>
              </Select>
            </div>
            <Button
              type="button"
              variant="outlined"
              size="sm"
              onClick={resetFilters}
              className="self-end"
            >
              Reset
            </Button>
          </div>
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
