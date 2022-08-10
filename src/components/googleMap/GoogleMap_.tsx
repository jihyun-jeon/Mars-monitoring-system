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

// interface googleMapType {
//   mapData: { lat: number; lng: number; name: string; active: boolean; error: boolean }[]
//   mapType?: boolean
//   center: { lat: number; lng: number }
//   mapOption: any
//   onShow?: {
//     lat: number
//     lng: number
//     name: string
//     active: boolean
//     error: boolean
//   } | null
//   markerClick?: any
//   mapContainerStyle: {}
// }

const GoogleMap_ = ({
  mapData,
  mapType,
  center,
  mapOption,
  onShow,
  markerClick,
  mapContainerStyle,
}: any) => {
  let overlayStyle: any = {
    position: 'relative',
    background: 'black',
    opacity: '0.6',
    borderRadius: '10px',
    padding: '20px',
    fontSize: '1rem',
    color: 'white',
  }

  if (onShow && onShow.equipmentType === 'welding machine') {
    overlayStyle = { ...overlayStyle, top: '-120px', left: '-85px' }
  }

  if (onShow && onShow.equipmentType === 'Conveyor belt') {
    overlayStyle = { ...overlayStyle, top: '-125px', left: '-70px' }
  }

  if (onShow && onShow.equipmentType === 'Scissors lift') {
    overlayStyle = { ...overlayStyle, top: '-130px', left: '-65px' }
  }

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
      {/* 
      {mapData.map((_, idx) => {
        const status = Object.keys(mapData[idx])[0]
        return (
          <MarkerClusterer key={idx}>
            {(clusterer) => (
              <>
                {mapData[idx][status].map((el) => (
                  <MarkerRender
                    key={el.id}
                    el={el}
                    clusterer={clusterer}
                    markerClick={markerClick}
                    active={status}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        )
      })} */}

      {mapType && (
        <GroundOverlay
          url="/public/imgs/LSPPlotPlanMain.png"
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
          position={{ lat: onShow.latitude, lng: onShow.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="arrow_box" style={overlayStyle}>
            <h1>{onShow.equipmentType}</h1>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  )
}

export default GoogleMap_
