"use client"
import { useEffect, useState } from "react"
import Prayer from "./components/Prayer"

export default function Home() {
  // because api need english word and the page is arabic
  const [currentCity, setcurrentCity] = useState("احمر العين")
  // to talk with api
  const [currentCityAPI, setcurrentCityAPI] = useState("Ahmar El Ain")

  const [apiData, setapiData] = useState(null)
  const [timing,settiming] = useState(null)
  const MONTHS = ["جانفي","فيفري","مارس","افريل","ماي","جوان","جويلية","اوت","سمبتمبر","اكتوبر","نوفمبر","ديسمبر"]
  const [month,setmonth] = useState(null)




  useEffect(() => {
    fetch(`http://api.aladhan.com/v1/timingsByCity?city=${currentCityAPI}&country=Algeria&method=2`)
    .then((res) => res.json())
    .then((res) => setapiData(res))

  }, [currentCityAPI])


  useEffect(() => {
    if (apiData != null) {
      console.log(apiData)
      settiming(apiData.data.timings)
    }
  }, [apiData])


  // changeing city state
  const changeCity = (city) => {
    setcurrentCity(city)
    city == "احمر العين" ? setcurrentCityAPI("Ahmar El Ain") : setcurrentCityAPI("Amizour")
  }
  return (
    <>
      <div className="container px-4 border-b-white border-b pb-5">

        <div className="  flex gap-y-5 justify-evenly sm:flex-row flex-col text-center sm:text-right text-white mt-8 font-bold ">
          <div className="flex flex-col gap-2 text-2xl sm::text-4xl">
            <p>نوفمبر 28 2023 | 6:03</p>
            <p>{currentCity}</p>
          </div>
          <div className="flex flex-col gap-2 text-2xl sm::text-4xl">
            <p>متبقي حتى صلاة العشاء</p>
            <p>49 : 20 : 0</p>
          </div>
        </div>
      </div>
      <div className="container px-4 my-10">
        <div className="flex gap-14 flex-wrap flex-col lg:flex-row lg:justify-center w-[80%] lg:w-full mx-auto">
          {timing != undefined ? 
          <>
            <Prayer prayerTime={timing.Fajr}/> 
            <Prayer prayerTime={timing.Dhuhr}/> 
            <Prayer prayerTime={timing.Asr}/> 
            <Prayer prayerTime={timing.Maghrib}/> 
            <Prayer prayerTime={timing.Isha}/> 
          </>
          : <></>}
          
        </div>
      </div>
      <div className="container flex justify-center ">
        <div className="relative cursor-pointer mb-8">
          <select name="" id="" className="focus:outline-none border-2 border-white bg-transparent text-white   w-60  h-12" onChange={(e) => { changeCity(e.currentTarget.selectedOptions[0].textContent) }}>

            <option value="" className="text-black cursor-pointer" selected={currentCity == "الرياض"}>احمر العين</option>
            <option value="" className="text-black cursor-pointer" selected={currentCity == "مكة المكرمة"}>اميزور</option>
          </select>
          <span className="absolute h-8 bg-[#242424] px-2 -top-4 left-5 text-white  font-bold text-xl">
            المدينة
          </span>

        </div>
      </div >

    </>
  )
}
