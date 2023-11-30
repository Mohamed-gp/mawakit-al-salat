import React from 'react'

const Prayer = ({prayerTime,prayerName,photoURL}) => {
  return (
    <div className="lg:w-[15%] w-[60%] mx-auto  bg-white pb-7 rounded-xl overflow-hidden">
            <div className="img  w-full bg-bottom bg-no-repeat " >
              <img src={`${photoURL}`} alt="" className="max-h-56 w-full" />
            </div>
            <div className="p-6 text-xl ">

              <p className="text-black font-bold mb-2">{prayerName}</p>
              <p className="text-4xl">{prayerTime}</p>
            </div>
          </div>
  )
}

export default Prayer