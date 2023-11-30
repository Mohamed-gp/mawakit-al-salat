"use client"
import { useEffect, useState } from "react"
import Prayer from "./components/Prayer"

export default function Home() {
  // because api need english word and the page is arabic
  const cities = [
  {arName:"العفرون"
  ,enName:"El Affroun"},
  {arName:"اميزور"
  ,enName:"Amizour"},
  {arName:"حجوط"
  ,enName:"Hadjout"}
];
  const [currentCity, setcurrentCity] = useState(cities[0])
  // to talk with api

  const [apiData, setapiData] = useState(null)
  const [timing, settiming] = useState(null)
  const MONTHS = ["جانفي", "فيفري", "مارس", "افريل", "ماي", "جوان", "جويلية", "اوت", "سمبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"]
  const [date, setdate] = useState(null)
  const PRAYERSNAMES = [["الفجر","Fajr","https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"],["الظهر","Dhuhr","https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"],["العصر","Asr","https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"],["المغرب","Maghrib","https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"],["العشاء","Isha","https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"]]





  useEffect(() => {
    fetch(`http://api.aladhan.com/v1/timingsByCity?city=${currentCity.enName}&country=Algeria&method=2`)
      .then((res) => res.json())
      .then((res) => setapiData(res))

  }, [currentCity.enName])


  useEffect(() => {
    if (apiData != null) {
      console.log(apiData)
      setdate(apiData.data.date.gregorian)
      settiming(apiData.data.timings)
    }
  }, [apiData])


  // changeing city state
  const changeCity = (e) => {
    const selectedCity = cities.find(city => city.arName == e)
    setcurrentCity(selectedCity)
  }
  return (
    <>
      <div className="container px-4 border-b-white border-b pb-5">

        <div className="  flex gap-y-5 justify-evenly sm:flex-row flex-col text-center sm:text-right text-white mt-8 font-bold ">
          <div className="flex flex-col gap-2 text-2xl sm::text-4xl">
            {date != undefined ?
              <p>{date.day} {MONTHS[date.month.number - 1]}  {date.year} | {new Date().getHours()}:{new Date().getMinutes()}</p>
              : <></>}

            <p>{currentCity.arName}</p>
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
            {PRAYERSNAMES.map((prayerName) => {
              return(<Prayer prayerTime={timing[prayerName[1]]} prayerName={prayerName[0]} photoURL={prayerName[2]}/>)
            }) }
            </>
            : <></>}

        </div>
      </div>
      <div className="container flex justify-center ">
        <div className="relative cursor-pointer mb-8">
          <select name="" id="" onChange={(e) => {changeCity(e.currentTarget.selectedOptions[0].textContent)}} className="focus:outline-none border-2 border-white bg-transparent text-white   w-60  h-12" >
            {cities.map(city => {
              return(
                <option value="" className="text-black cursor-pointer"  defaultValue={currentCity == city.arName}>{city.arName}</option>
              )
            })}
          </select>
          <span className="absolute h-8 bg-[#242424] px-2 -top-4 left-5 text-white  font-bold text-xl">
            المدينة
          </span>

        </div>
      </div >

    </>
  )
}
