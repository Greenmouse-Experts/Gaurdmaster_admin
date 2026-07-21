import React, { useState } from 'react'
import { getBlogPost } from '../../services/api/blogApi';
import { useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa6';
import BlogList from '../components/blog/BlogList';
import { toast } from 'react-toastify';

const PAGE_SIZE = 10;

export const BlogPost = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getBlogPosts", page],
        queryFn: () => getBlogPost(page),
        placeholderData: keepPreviousData,
      });

    const handleNext = () => {
      if (page * PAGE_SIZE >= data?.count) {
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
              <h2>All Blog Posts</h2>
              <div className="cursor-pointer" onClick={() => navigate('/blog/add')}>
                <FaPlus />
                Add New Blog
              </div>
            </div>
            <div className="card_table">
              <BlogList
                data={data}
                isLoading={isLoading}
                refetch={refetch}
                next={handleNext}
                prev={handlePrev}
                page={page}
                count={data?.count}
              />
            </div>
          </div>
        </>
      );
}
