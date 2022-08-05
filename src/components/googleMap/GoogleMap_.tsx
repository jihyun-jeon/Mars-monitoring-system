import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  GroundOverlay,
  OverlayView,
} from '@react-google-maps/api'
import './Map.css'

import mapStyle from './GoogleMapStyles'
import MarkerRender from './MarkerRender'

interface googleMapType {
  mapData: { lat: number; lng: number; name: string; active: boolean; error: boolean }[]
  mapType?: boolean
  center: { lat: number; lng: number }
  mapOption: any
  onShow?: {
    lat: number
    lng: number
    name: string
    active: boolean
    error: boolean
  } | null
  markerClick?: any
  mapContainerStyle: {}
}

const GoogleMap_ = ({
  mapData,
  mapType,
  center,
  mapOption,
  onShow,
  markerClick,
  mapContainerStyle,
}: googleMapType) => {
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={mapContainerStyle}
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
  )
}

export default GoogleMap_
