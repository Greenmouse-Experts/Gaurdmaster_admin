import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { createCourseContent } from '../../../../services/api/programsApi';
import { toast } from 'react-toastify';

const AddContent = ({ close, refetch, id }) => {
    const create = useMutation({
        mutationFn: createCourseContent,
        mutationKey: ["addContent"],
      });
      const [isBusy, setIsBusy] = useState(false);
      const [userDetail, setUserDetail] = useState({
        title: "",
        course: id
      });
      const handleChange = (name, value) => {
        setUserDetail({ ...userDetail, [name]: value });
      };
      const submitAction = (e) => {
        e.preventDefault();
        setIsBusy(true);
        create.mutate(userDetail, {
          onSuccess: (data) => {
            toast.success(data.message);
            setIsBusy(false);
            refetch();
            close();
          },
          onError: (error) => {
            toast.error(error.response.data.message);
            setIsBusy(false);
          },
        });
      };
  return (
    <>
        <div>
        <div className="px-4">
        <form action="" onSubmit={submitAction}>
          <div className="input">
            <label>Course Content Title</label>
            <div>
              <input
                type="text"
                placeholder="Enter Program Title"
                value={userDetail.title}
                required
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="btn-primary w-full py-3 fw-500 lg:text-lg">{isBusy? "Submiting..." : "Submit"}</button>
          </div>
        </form>
      </div>
        </div>
    </>
  )
}

export default AddContent