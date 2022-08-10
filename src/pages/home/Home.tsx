import { useLoadScript } from '@react-google-maps/api'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Map from './components/Map'
interface ForcastData {
  city: string
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

// interface HomeDataType {
//   count: {
//     equipmentActive: {
//       Total: number
//       True: number
//       False: number
//     }
//     equipmentCommunication: {
//       Total: number
//       True: number
//       False: number
//     }
//     equipmentChane: {
//       Total: number
//       True: number
//       False: number
//     }
//     devices: {
//       Total: number
//       LowBattery: {
//         count: number
//       }
//       matched: number
//       unMatched: number
//       strong: number
//       normal: number
//       weak: number
//     }
//   }
//   status: {
//     powerOn: [
//       {
//         id: number
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 4
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 6
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 20
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//     ]
//     networkOff: [
//       {
//         id: 1
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 2
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 4
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//       {
//         id: 20
//         equipmentType: string
//         equipmentIcon: string
//         latitude: number
//         longitude: number
//       },
//     ]
//     networkError: []
//   }
// }

const Home = () => {
  const [homeData, setHomeData] = useState<any | undefined>()
  const [weatherData, setWeatherData] = useState<ForcastData>()

  let day = ''
  const lat = '37.579617'
  const lng = '126.977041'
  const myKey = import.meta.env.VITE_WEATHER_KEY
  const mapKey = import.meta.env.VITE_GOOGLE_MAP_KEY

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

  useEffect(() => {
    axios('/public/data/homeData.json').then((result) => {
      const resultData = result.data.result

      setHomeData({
        count: resultData.count,
        mapData: resultData.status,
      })
    })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${myKey}&units=metric`,
      )
      .then((result) => {
        setWeatherData({ city: result.data.city.name, list: result.data.list.slice(2) })
      })
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapKey,
  })

  return (
    <div className="grid h-full grid-cols-2 gap-8 bg-bgDefault  px-8 pt-[50px] pb-10">
      <div className="map"> {!isLoaded ? 'Loading...' : <Map mapData={homeData.mapData} />}</div>

      <div className="w-full overflow-x-auto">
        {hourlyWeathers && (
          <div className="mb-7 flex flex-col rounded-xl bg-[lightgray] ">
            <ul className=" flex border-b border-slate-400">
              <li className="flexCenter w-20">
                <img
                  src={`http://openweathermap.org/img/wn/${hourlyWeathers[0].icon}@2x.png`}
                  className="w-16"
                />
              </li>
              <li className="flexCenter w-20 text-2xl">{hourlyWeathers[0].temp}°C</li>
              <li className="flexCenter w-24 text-2xl">{hourlyWeathers[0].main}</li>
              <li className="ml-auto mr-8 flex items-center text-2xl">
                Korea , {weatherData?.city}
              </li>
            </ul>

            <div className="grid w-full auto-cols-[7rem] grid-flow-col grid-cols-[7rem] overflow-x-scroll pb-3 pt-1">
              {hourlyWeathers.map((el, idx) => {
                return (
                  <div key={idx} className={`mr-2 h-full w-full rounded-lg  text-lg`}>
                    <p className={`flexCenter m-3 h-6 rounded-xl ${el.md && 'bg-blue-400'}`}>
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
          {homeData && (
            <div className="row">
              <p className="mb-4 text-2xl font-semibold">Equipment</p>
              <div className="grid grid-cols-3 gap-8">
                {homeData.count.map((data, idx) => {
                  const name = Object.keys(data)[0]
                  console.log(name)
                  return (
                    <div
                      key={idx}
                      className="flex flex-col rounded-xl bg-[#036db7] pt-2 shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]"
                    >
                      <p className="mt-3 ml-4 text-2xl font-bold text-white">
                        {DashBoardData[name]}
                        {DashBoardData[name] === 'BRP' && (
                          <span className="ml-1 text-base">(Battery Replace Period)</span>
                        )}
                      </p>
                      <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                        {data[name].map((el, idx) => {
                          const title = Object.keys(el)[0]
                          const value = el[title] >= 0 ? el[title] : el[title].count
                          return (
                            <p key={idx}>
                              <span className="inline-block w-3/4">{title}</span>
                              <span className="inline-block w-1/4">{`${value}`}</span>
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex flex-col justify-around gap-8">
          {homeData && (
            <div className="row">
              <p className="mb-4 text-2xl font-semibold">Equipment</p>

              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                  <p className="mt-3 ml-4 text-2xl font-semibold text-white">Active</p>
                  <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                    <p>
                      <span className="inline-block w-3/4">active</span>
                      <span className="inline-block w-1/4">{homeData.active.False}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4"> inactive</span>
                      <span className="inline-block w-1/4">{homeData.active.True}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4"> Total</span>
                      <span className="inline-block w-1/4">{homeData.active.Total}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                  <p className="mt-3 ml-4 text-2xl font-semibold text-white">Online</p>
                  <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                    <p>
                      <span className="inline-block w-3/4">on</span>
                      <span className="inline-block w-1/4">{homeData.online.False}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4">off</span>
                      <span className="inline-block w-1/4">{homeData.online.True}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4">Total</span>
                      <span className="inline-block w-1/4">{homeData.online.Total}</span>
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
                      <span className="inline-block w-1/4">{homeData.brp.False}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4">expired</span>
                      <span className="inline-block w-1/4">{homeData.brp.True}</span>
                    </p>
                    <p>
                      <span className="inline-block w-3/4">Total</span>
                      <span className="inline-block w-1/4">{homeData.brp.Total}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <p className="my-4 text-2xl font-semibold">Device</p>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                    <p className="mt-3 ml-4 text-2xl font-semibold text-white">Match</p>
                    <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                      <p>
                        <span className="inline-block w-3/4">Matched</span>
                        <span className="inline-block w-1/4">{homeData.devices.matched}</span>
                      </p>
                      <p>
                        <span className="inline-block w-3/4">Unmatched</span>
                        <span className="inline-block w-1/4">{homeData.devices.unMatched}</span>
                      </p>
                      <p>
                        <span className="inline-block w-3/4">Total</span>
                        <span className="inline-block w-1/4">{homeData.devices.Total}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                    <p className="mt-3 ml-4 text-2xl font-semibold text-white">Battery</p>
                    <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                      <p>
                        <span className="inline-block w-3/4"> Low battery</span>
                        <span className="inline-block w-1/4">
                          {homeData.devices.LowBattery.count}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col rounded-xl bg-[#036db7] shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]">
                    <p className="mt-3 ml-4 text-2xl font-semibold text-white">RSSI</p>
                    <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                      <p>
                        <span className="inline-block w-3/4"> Strong</span>
                        <span className="inline-block w-1/4"> {homeData.devices.strong}</span>
                      </p>
                      <p>
                        <span className="inline-block w-3/4"> Normal</span>
                        <span className="inline-block w-1/4">{homeData.devices.normal}</span>
                      </p>
                      <p>
                        <span className="inline-block w-3/4"> Week</span>
                        <span className="inline-block w-1/4">{homeData.devices.weak}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default Home

const DashBoardData = {
  equipmentActive: 'Active',
  equipmentCommunication: 'Online',
  equipmentChane: 'BRP',
  Match: 'Match',
  Battery: 'Battery',
  RSSI: 'RSSI',
}
