import { useMemo, useState } from 'react'

import GoogleMap_ from '../../../../src/components/googleMap/GoogleMap_'

function Map({ mapData }) {
  const [mapType, setMapType] = useState(true)
  const center = useMemo(() => ({ lat: 24.983367, lng: 51.170926 }), [])

  const mapOption = mapType ? google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE

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
