import React from 'react'

const PaymentDetails = ({data}) => {
  return (
    <div>
         {data?.map((item) => (
        <div className="flex gap-x-2 pb-2 border-b mb-2" key={item.id}>
          <div className="w-20 h-20 shrink-0">
            <img
              src={item.course.coverImage}
              alt="course"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="fw-500">{item.course.title}</p>
            <p className="fw-600 text-lg">{`$${item.course.price}.00`}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PaymentDetails