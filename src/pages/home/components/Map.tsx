import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  GroundOverlay,
  OverlayView,
} from '@react-google-maps/api'
import './Map.css'
import { useMemo, useState } from 'react'

import mapStyle from './GoogleMapStyles'
import MarkerRender from './MarkerRender'

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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '6px',
          display: 'flex',
          height: '20px',
          zIndex: 1,
        }}
      >
        <button
          type="button"
          style={{
            width: '74px',
            height: '40px',
            fontWeight: '500',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            backgroundColor: `${mapType ? '#036db7' : 'lightgray'}`,
            color: `${mapType ? 'white' : 'black'}`,

            fontSize: '16px',
          }}
          onClick={() => setMapType(true)}
        >
          Map
        </button>
        <div
          style={{
            height: '30px',
            margin: '5px 0',
            backgroundColor: 'white',
            borderRight: '1px solid gray',
          }}
        ></div>
        <button
          type="button"
          style={{
            width: '74px',
            height: '40px',
            fontWeight: '500',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            fontSize: '16px',
            backgroundColor: `${mapType ? 'lightgray' : '#036db7'}`,
            color: `${mapType ? 'black' : 'white'}`,
          }}
          onClick={() => setMapType(false)}
        >
          Satellite
        </button>
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        options={{
          styles: mapStyle,
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: mapOption,
        }}
      >
        <Marker position={center} />

        <MarkerClusterer>
          {(clusterer) => (
            <>
              {mapData.map((el, idx) => (
                <MarkerRender key={idx} el={el} clusterer={clusterer} markerClick={markerClick} />
              ))}
            </>
          )}
        </MarkerClusterer>

        {mapType && (
          <GroundOverlay
            url="/public/imgs/drawing.jpg"
            bounds={{
              north: 33.494916,
              south: 33.246541,
              east: 126.897931,
              west: 126.401018,
            }}
            opacity={1}
          />
        )}

        {onShow && (
          <OverlayView
            position={{ lat: onShow.lat, lng: onShow.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="arrow_box"
              style={{
                position: 'relative',
                top: '-110px',
                left: '-35px',
                background: 'black',
                opacity: '0.6',
                borderRadius: '10px',
                padding: '20px',
                fontSize: '1rem',
                color: 'white',
              }}
            >
              <h1>{onShow.name}</h1>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  )
}

export default Map
