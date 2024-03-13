import React from 'react'
import { getBlogPost } from '../../services/api/blogApi';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa6';
import BlogList from '../components/blog/BlogList';

export const BlogPost = () => {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["getBlogPosts"],
        queryFn: getBlogPost,
      });
    
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
              <BlogList data={data} isLoading={isLoading} refetch={refetch}/>
            </div>
          </div>
        </>
      );
}
