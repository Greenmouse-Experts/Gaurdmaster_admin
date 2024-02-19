import React from 'react'

const RenderMedia = ({type, url}) => {
  return (
    <div className='w-full'>
        {
            type === "image"? <div className='w-full'>
                <img src={url} alt="tutorial-image" className='w-full' />
            </div> : type === "video"? <div></div> : ""
        }
    </div>
  )
}

export default RenderMedia