import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { createSubContent } from '../../../../services/api/programsApi';
import { uploadImage } from '../../../../services/api/routineApi';
import { toast } from 'react-toastify';

const CreateAssesment = ({id, courseId, refetch, close}) => {
      const [isBusy, setIsBusy] = useState(false);
      const [inputDetail, setInputDetail] = useState({
        title: '',
        course: courseId,
        courseContent: id,
        duration: 0,
        media: '',
        mediaType: 'assessment'
      });
      const handleChange = (name, value) => {
        setInputDetail({ ...inputDetail, [name]: value });
      };
      const create = useMutation({
        mutationFn: createSubContent,
        mutationKey: ["addContent"],
      });
      const submitAction = async(e) => {
        e.preventDefault()
        setIsBusy(true)
        const fd = new FormData()
        fd.append('image', inputDetail.media)
        await uploadImage(fd)
          .then((data) => {
            setInputDetail({ ...inputDetail, previewUrl: data.image });
            const payload = {
              ...inputDetail,
              duration: Number(inputDetail.duration),
              media: data.image
            }
            create.mutate(payload, {
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
          })
          .catch(() => { })
      }
  return (
    <div className="px-4">
      <form action="" onSubmit={submitAction}>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="input">
              <label>Assessment Title</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Assessment Title"
                  value={inputDetail.title}
                  required
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label>Assessment Duration (minutes)</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Assessment Duration"
                  value={inputDetail.duration}
                  required
                  onChange={(e) => handleChange("duration", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-6">
              <p>Assessment Media Cover</p>
              <div className="mt-3">
              <input
                  type="file"
                  accept='image/*'
                  onChange={(e) => handleChange("media", e.target.files[0])}
                  className="w-full border p-4 rounded-lg border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
            {isBusy ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateAssesment