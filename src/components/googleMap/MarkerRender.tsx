import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { Marker } from '@react-google-maps/api'
import { Clusterer } from '@react-google-maps/marker-clusterer'

// interface MarkerPropType {
//   el: {
//     latitude: number
//     longitude: number
//     equipmentType: string
//     active: boolean
//     error: boolean
//   }
//   clusterer?: Clusterer | MarkerClusterer
//   markerClick?: (el: any) => void
// }

const MarkerRender = ({ el, active, clusterer, markerClick }: any) => {
  return (
    <div>
      <Marker
        clusterer={clusterer}
        position={{ lat: el.latitude, lng: el.longitude }}
        icon={{
          // url: `/public/assets/${el.equipmentType}_${
          //   active === 'powerOn' ? 'blue' : active === 'networkOff' ? 'gray' : 'red'
          // }.svg`,
          // url: `/public/assets/${el.name}_${
          //   el.active === true ? (el.error ? 'red' : 'blue') : 'gray'
          // }.svg`,
          // scaledSize: new google.maps.Size(50, 50),
          url: `/public/imgs/equips_color/AerialEquip_24_red.svg`,
          scaledSize: new google.maps.Size(50, 50),
        }}
        onClick={() => {
          markerClick(el)
        }}
      />
    </div>
  )
}

export default MarkerRender
