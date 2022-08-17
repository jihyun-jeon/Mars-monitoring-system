import { useLoadScript } from '@react-google-maps/api'
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { FcOk, FcHighPriority } from 'react-icons/fc'

import AppContext from '../../AppContext'
import { SERVER_ADDRESS } from '../../config'
import useStore from '../../useStore'
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

const Home = () => {
  const [homeData, setHomeData] = useState<any | undefined>()
  const [mapData, setMapData] = useState<(any | never)[]>([])
  const [weatherData, setWeatherData] = useState<ForcastData>()

  const appContext = useContext(AppContext)
  const { usersInfo } = useStore()

  const hasToken = useRef<string | null>()
  hasToken.current = usersInfo._userToken

  useEffect(() => {
    if (hasToken.current) {
      appContext.setToastIcon([<FcOk key="1" className="text-2xl" />])
      appContext.setToastMessage(['Login success'])
      hasToken.current = null
    }
  }, [])

  const myKey = import.meta.env.VITE_WEATHER_KEY
  const mapKey = import.meta.env.VITE_GOOGLE_MAP_KEY

  let day = ''
  const lat = '24.983367' // 날씨 , 지도상 중심위치
  const lng = '51.170926' // 날씨 , 지도상 중심위치

  const hourlyWeathers = weatherData?.list.map((obj) => {
    const date = new Date(obj.dt_txt)
    const md = `${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    const mdValue = day === md ? '' : md
    if (day !== mdValue) {
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

  // < 데쉬보드 get요청>
  useEffect(() => {
    axios(`${SERVER_ADDRESS}equipment`).then((result) => {
      setHomeData(result.data.result.count[0])
    })
  }, [])

  // // < 데쉬보드 mockdata GET -test용 >
  // useEffect(() => {
  //   axios('/public/data/homeUpdate.json').then((result) => {
  //     setHomeData(result.data.result.count[0])
  //   })
  // }, [])

  // // < 지도 mockdata GET - 지도는 mock data활용 >
  useEffect(() => {
    axios('/public/data/mapData.json').then((result) => {
      setMapData([
        { powerOn: result.data.result.powerOn },
        { networkError: result.data.result.networkError },
        { networkOff: result.data.result.networkOff },
      ])
    })
  }, [])

  // < 날씨 api >
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${myKey}&units=metric`,
      )
      .then((result) => {
        setWeatherData({
          city: result.data.city.name,
          list: result.data.list.slice(2),
        })
      })
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapKey,
  })

  return (
    <>
      <div className="grid h-full grid-cols-2 gap-8 bg-bgDefault  px-8 pt-[50px] pb-10">
        <div className="map"> {!isLoaded ? 'Loading...' : <Map mapData={mapData} />}</div>
        {/* // 버그 */}
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
                  Catarrh , {weatherData?.city}
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
                  {DashBoardData.slice(0, 3).map((data, idx) => {
                    const key = Object.keys(data)[0]
                    const title = data[key]
                    return (
                      <div
                        key={idx}
                        className="flex flex-col rounded-xl bg-[#036db7] pt-2 shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]"
                      >
                        <p className="mt-3 ml-4 text-2xl font-bold text-white">
                          {title}
                          {title === 'BRP' && (
                            <span className="ml-1 text-base">(Battery Replace Period)</span>
                          )}
                        </p>
                        <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                          {homeData[key].map((el, idx) => {
                            const title = Object.keys(el)[0]
                            const upperTitle = title.charAt(0).toUpperCase() + title.slice(1)
                            const value = el[title] >= 0 ? el[title] : el[title].count
                            return (
                              <p key={idx}>
                                <span className="inline-block w-3/4">{upperTitle}</span>
                                <span className="inline-block w-1/4">{`${value}`}</span>
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <p className="mb-4 mt-7 text-2xl font-semibold">Device</p>

                <div className="grid grid-cols-3 gap-8">
                  {DashBoardData.slice(3).map((data, idx) => {
                    const key = Object.keys(data)[0]
                    const title = data[key]
                    return (
                      <div
                        key={idx}
                        className="flex flex-col rounded-xl bg-[#036db7] pt-2 shadow-[1px_1px_5px_0_rgba(0,0,0,0.25)]"
                      >
                        <p className="mt-3 ml-4 text-2xl font-bold text-white">
                          {title}
                          {title === 'BRP' && (
                            <span className="ml-1 text-base">(Battery Replace Period)</span>
                          )}
                        </p>
                        <div className="flex flex-col gap-2 py-10 px-8 text-[1.3rem] text-white">
                          {homeData[key].map((el, idx) => {
                            const title = Object.keys(el)[0]
                            const upperTitle = title.charAt(0).toUpperCase() + title.slice(1)
                            const value = el[title] >= 0 ? el[title] : el[title].count
                            return (
                              <p key={idx}>
                                <span className="inline-block w-3/4">{upperTitle}</span>
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
        </div>
      </div>
    </>
  )
}

export default Home

const DashBoardData = [
  { equipmentActive: 'Active' },
  { equipmentOnline: 'Online' },
  { batteryReplacePeriod: 'BRP' },
  { deviceMatch: 'Match' },
  { deviceBattery: 'Battery' },
  { RSSI: 'RSSI' },
]
