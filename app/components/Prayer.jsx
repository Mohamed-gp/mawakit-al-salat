import React from 'react'

const Prayer = ({prayerTime}) => {
  return (
    <div className="lg:w-[15%] w-[60%] mx-auto  bg-white pb-7 rounded-xl overflow-hidden">
            <div className="img  w-full bg-bottom bg-no-repeat " >
              <img src="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921" alt="" className="max-h-56 w-full" />
            </div>
            <div className="p-6 text-xl ">

              <p className="text-black font-bold mb-2">الفجر</p>
              <p className="text-4xl">{prayerTime}</p>
            </div>
          </div>
  )
}

export default Prayer