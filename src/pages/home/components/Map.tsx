import { useMemo, useState } from 'react'

import GoogleMap_ from '../../../../src/components/googleMap/GoogleMap_'

function Map() {
  const [mapType, setMapType] = useState(true)
  const center = useMemo(() => ({ lat: 33.402374, lng: 126.582381 }), [])

  const mapOption = mapType ? google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE

  const [onShow, setOnShow] = useState<{
    lat: number
    lng: number
    name: string
    active: boolean
    error: boolean
  } | null>(null)

  const markerClick = (el) => {
    if (el.lat === onShow?.lat && el.lng === onShow?.lng) {
      setOnShow(null)
      return
    }
    setOnShow(el)
  }

  return (
    <div className="relative h-full w-full">
      <div className=" flexCenter absolute bottom-[-1px] z-[1] h-fit flex-row">
        <button
          type="button"
          className={`ml-1 h-10 w-[74px] rounded-l-[5px] ${
            mapType ? 'bg-[#036db7]' : 'bg-[lightgray]'
          } ${mapType ? 'text-[white]' : 'text-[black]'} font-medium`}
          onClick={() => setMapType(true)}
        >
          Map
        </button>
        <div className="my-[5px] h-10 border border-[gray] bg-white"></div>
        <button
          type="button"
          className={`h-10 w-[74px] rounded-r-[5px] font-medium ${
            mapType ? 'bg-[lightgray]' : 'bg-[#036db7]'
          } ${mapType ? 'text-[black]' : 'text-[white]'} `}
          onClick={() => setMapType(false)}
        >
          Satellite
        </button>
      </div>

      <GoogleMap_
        mapData={mapData}
        mapType={mapType}
        center={center}
        mapOption={mapOption}
        onShow={onShow}
        markerClick={markerClick}
        mapContainerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}

export default Map

const mapData = [
  { lat: 33.440689, lng: 126.920708, name: 'welding', active: true, error: true },
  { lat: 33.349512, lng: 126.611391, name: 'dump', active: false, error: false },
  { lat: 33.494913, lng: 126.897931, name: 'conveyer', active: true, error: true }, //
  { lat: 33.242565, lng: 126.553494, name: 'crain', active: true, error: false },
  { lat: 33.476915, lng: 126.805685, name: 'welding', active: false, error: false },
  { lat: 33.338557, lng: 126.459511, name: 'dump', active: true, error: true },
  { lat: 33.462374, lng: 126.742381, name: 'conveyer', active: true, error: false },
  { lat: 33.246541, lng: 126.401018, name: 'crain', active: false, error: false }, //
]
