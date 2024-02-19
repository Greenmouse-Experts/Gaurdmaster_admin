import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { viewSingleSubContent } from '../../../../services/api/programsApi'
import RenderMedia from './RenderMedia'
import Picker from '../../../../Components/Loaders/Picker'

const ViewSubcontent = ({id}) => {
    const {data, isLoading} = useQuery({
        queryFn: () => viewSingleSubContent(id),
        queryKey: ['singleContentSub']
    })
  return (
    <>
        <div className='min-h-[300px]'>
        {isLoading && (
          <div className="place-center py-12">
            <Picker size={1.2} />
          </div>
        )}
        {
            data && !isLoading && (
                <div className='grid lg:grid-cols-2 gap-4'>
                    <div className='w-full'>
                        <p className='capitalize fw-600 text-xl mb-3'>{data?.mediaType} Content</p>
                        <RenderMedia url={data?.media} type={data?.mediaType}/>
                    </div><div>
                        <p className='text-lg lg:text-2xl fw-600'>{data?.title}</p>
                        <div className='mt-5 grid gap-3'>
                            <p>Duration: {data.duration} min(s)</p>
                            <p>Date Added: 23 Febuary 2024</p>
                            <p>Order: Lesson {data.order}</p>
                            <p>Content: {data.courseContent.title}</p>
                            <p>Preview URL: <a href={data.previewUrl} target="_blank" rel="noopener noreferrer">Click to view</a></p>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    </>
  )
}

export default ViewSubcontent