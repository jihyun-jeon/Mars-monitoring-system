import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  GroundOverlay,
  OverlayView,
} from '@react-google-maps/api'
// import { Clusterer } from '@react-google-maps/marker-clusterer'
import './Map.css'
import { useState } from 'react'

import mapStyle from './GoogleMapStyles'

const GoogleMap_ = ({ mapData, mapType, center, mapOption, mapContainerStyle }: any) => {
  // 1.오버레이 show
  const [onShow, setOnShow] = useState<{
    latitude: number
    longitude: number
    equipmentType: string
  } | null>(null)

  // 2.오버래이 위치를 조절해줌
  const overlayStyle = {
    position: 'absolute',
    bottom: '60px',
    left: '-90px',
    background: 'black',
    opacity: '0.6',
    borderRadius: '10px',
    padding: '20px 50px',
    fontSize: '1rem',
    color: 'white',
  }

  // 장비별 각각의 마커에 따로 스타일 줄 때
  // if (onShow && onShow.equipmentType === 'welding machine') {
  //   overlayStyle = { ...overlayStyle, top: '-120px', left: '-85px' }
  // }

  // if (onShow && onShow.equipmentType === 'Conveyor belt') {
  //   overlayStyle = { ...overlayStyle, top: '-125px', left: '-70px' }
  // }

  // if (onShow && onShow.equipmentType === 'Scissors lift') {
  //   overlayStyle = { ...overlayStyle, top: '-130px', left: '-65px' }
  // }

  // 3.마커 하나씩만 뜨도록 해주는 함수
  const markerClick = (lat, lng, equipType) => {
    if (lat === onShow?.latitude && lng === onShow?.longitude) {
      setOnShow(null)
      return
    }
    setOnShow({ latitude: lat, longitude: lng, equipmentType: equipType })
  }

  return (
    // [1] 지도 렌더
    <GoogleMap
      zoom={17}
      center={center}
      mapContainerStyle={mapContainerStyle}
      options={{
        styles: mapStyle,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: mapOption,
      }}
    >
      {/* [2] 마커렌더 */}
      {mapData.map((mapDataObj, idx) => {
        const equipDataArr: any = Object.values(mapDataObj)[0]
        const status = Object.keys(mapDataObj)[0]

        {
          /* [{},{},{}]을 map 돌면서 장비 하나하나 마커 찍는 것임 */
        }
        return (
          <MarkerClusterer key={idx}>
            {(clusterer) =>
              equipDataArr.map((el, idx) => (
                <div key={el.equipment[0].equipmentId} style={{ position: 'relative' }}>
                  <Marker
                    clusterer={clusterer}
                    position={{ lat: +el.latitude, lng: +el.longitude }}
                    icon={{
                      url: `/public/imgs/equips_color/${el.equipment[0].equipmentType}_${
                        status === 'powerOn' ? 'green' : status === 'networkOff' ? 'gray' : 'red'
                      }.svg`,
                      scaledSize: new google.maps.Size(60, 60),
                    }}
                    onClick={() => {
                      markerClick(+el.latitude, +el.longitude, el.equipment[0].equipmentType)
                    }}
                  />
                </div>
              ))
            }
          </MarkerClusterer>
        )
      })}

      {/* [3] 오버레이 렌더 */}
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

      {/* [4] 도면 배경이미지 렌더 */}
      {mapType && (
        <GroundOverlay
          url="/public/imgs/drawing.jpg"
          bounds={{
            north: 24.987664,
            south: 24.97817,
            east: 51.176849,
            west: 51.164618,
          }}
          opacity={0.4}
        />
      )}
    </GoogleMap>
  )
}

export default GoogleMap_
