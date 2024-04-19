import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTestimonials } from '../../services/api/routineApi'
import TestimonialList from '../components/testimonials/testimonialList'
import useAuth from '../../hooks/useAuth'

const TestimonialsPage = () => {
    const [page, setPage] = useState(1)
    const {role} = useAuth()
    const route = role === "admin"? `/testimonials` : `/testimonials/published`
    const {data, isLoading, refetch} = useQuery({
        queryFn: () => getTestimonials(route, page),
        queryKey: ['fetch-testimonials', page]
    })
    const handleNext = () => {
        if(page * 10 > data?.count){
          toast.info('This is the last page')
        }else{
          setPage((old) => old + 1)
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      const handlePrev = () => {
        if(page > 1){
          setPage((old) => old - 1)
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }else{
          toast.info('This is the first page')
        }
      }
  return (
    <div>
         <div className="adminman">
        <div className="admin_head">
          <h2>All Testimonials</h2>
        </div>
        <div className="card_table">
          <TestimonialList data={data} isLoading={isLoading} refetch={refetch}/>
        </div>
        {!isLoading && !!data?.data?.length && (
        <div className="mt-6 flex justify-end">
          <div className="flex gap-x-4 items-center">
            <p className="fw-600">Page {page}</p>
            <div className="flex gap-x-2 items-center">
              <div
                onClick={handlePrev}
                className={`px-2 py-1 rounded ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Prev
              </div>
              <div
                onClick={handleNext}
                className={`px-2 py-1 rounded ${
                  page * 10 >= data?.count
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default TestimonialsPage