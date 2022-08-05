import { useLoadScript } from '@react-google-maps/api'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Map from './components/Map'
interface ForcastData {
  city: { name: string }
  list: {
    dt: number
    dt_txt: string
    main: {
      temp: number
      temp_max: number
      temp_mix: number
    }
    weather: {
      description: string
      main: string
      icon: string
    }[]
  }[]
}

const Home = () => {
  const lat = '37.579617'
  const lng = '126.977041'
  const myKey = import.meta.env.VITE_WEATHER_KEY
  const [weatherData, setWeatherData] = useState<ForcastData>()

  let day = ''

  const hourlyWeathers = weatherData?.list.map((obj) => {
    const date = new Date(obj.dt_txt)
    const md = `${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    const mdValue = day === md ? '' : md

    if (day !== md) {
      day = md
    }
    return {
      md: mdValue,
      hour: obj.dt_txt.split(' ')[1].slice(0, 2),
      main: obj.weather[0].main,
      icon: obj.weather[0].icon,
      temp: obj.main.temp,
    }
  })

  // useEffect(() => {
  //   axios('https://localhost...../equipment').then((result) => console.log(result))
  // }, [])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${myKey}&units=metric`,
      )
      .then((result) => {
        setWeatherData({ city: result.data.city, list: result.data.list.slice(2) })
      })
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA-14N8FNLXVKB9NeF1eSnYYq8pItkBUaI',
  })

  return (
    <div className="grid h-full grid-cols-2 gap-8 bg-bgDefault  px-8 pt-[50px] pb-10">
      <div className="map"> {!isLoaded ? 'Loading...' : <Map />}</div>

      <div className="w-full overflow-x-auto">
        {hourlyWeathers && (
          <div className="mb-7 flex flex-col rounded-xl bg-slate-300">
            <ul className=" flex border-b border-slate-400">
              <li className="flexCenter w-20">
                <img
                  src={`http://openweathermap.org/img/wn/${hourlyWeathers[0].icon}@2x.png`}
                  className="w-16"
                />
              </li>
              <li className="flexCenter w-20 text-2xl">{hourlyWeathers[0].temp}°C</li>
              <li className="flexCenter w-20 text-2xl">{hourlyWeathers[0].main}</li>
              <li className="ml-auto mr-4 flex items-center text-2xl">Seoul, Seocho-dong</li>
            </ul>

            <div className="grid w-full auto-cols-[7rem] grid-flow-col grid-cols-[7rem] overflow-x-scroll pb-3 pt-1">
              {hourlyWeathers.map((el, idx) => {
                return (
                  <div key={idx} className="mr-2 text-lg">
                    <p className={`flexCenter m-3 h-6 rounded-xl ${el.md && 'bg-blue-300'}`}>
                      {el.md}
                    </p>
                    <p className="flexCenter">
                      {el.hour}
                      {+el.hour < 12 ? 'AM' : 'PM'}
                    </p>
                    <p className="flexCenter">
                      <img
                        src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                        className="w-16"
                      />
                    </p>
                    <p className="flexCenter">{el.temp}°C</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col justify-around gap-8">
          <div className="row">
            <p className="mb-4 text-2xl font-semibold">Equipment</p>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">Active</p>
                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4">active</span>
                    <span className="inline-block w-1/4">50</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4"> inactive</span>
                    <span className="inline-block w-1/4">20</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4"> Total</span>
                    <span className="inline-block w-1/4">70</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">Online</p>
                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4">on</span>
                    <span className="inline-block w-1/4">50</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">off</span>
                    <span className="inline-block w-1/4">20</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">Total</span>
                    <span className="inline-block w-1/4">70</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">
                  BRP<span className="text-base"> (Battery Replace Period)</span>
                </p>

                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4">unexpired</span>
                    <span className="inline-block w-1/4">50</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">expired</span>
                    <span className="inline-block w-1/4">20</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">Total</span>
                    <span className="inline-block w-1/4">70</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <p className="mb-4 text-2xl font-semibold">Device</p>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">Match</p>
                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4">Matched</span>
                    <span className="inline-block w-1/4">50</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">Unmatched</span>
                    <span className="inline-block w-1/4">20</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4">Total</span>
                    <span className="inline-block w-1/4">70</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">Battery</p>
                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4"> Low battery</span>
                    <span className="inline-block w-1/4">10</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                <p className="mt-3 ml-4 text-2xl font-semibold text-white">RSSI</p>
                <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                  <p>
                    <span className="inline-block w-3/4"> Strong</span>
                    <span className="inline-block w-1/4">50</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4"> Normal</span>
                    <span className="inline-block w-1/4">20</span>
                  </p>
                  <p>
                    <span className="inline-block w-3/4"> Week</span>
                    <span className="inline-block w-1/4">70</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
