import React from 'react'
import ReactPlayer from 'react-player/lazy'

const RenderMedia = ({ type, url }) => {
  return (
    <div className='w-full'>
      {
        type === "image" ? <div className='w-full'>
          <img src={url} alt="tutorial-image" className='w-full' />
        </div> : type === "video" ? <div className='relative -top-10'>
          <ReactPlayer url={url} width={'100%'} controls />
        </div> : ""
      }
    </div>
  )
}

export default RenderMedia