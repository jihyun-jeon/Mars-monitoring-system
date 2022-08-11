// import { MarkerClusterer } from '@googlemaps/markerclusterer'
// import { Clusterer } from '@react-google-maps/marker-clusterer'

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

// const markerClick = (lat, lng) => {
//   if (lat === onShow?.latitude && lng === onShow?.longitude) {
//     setOnShow(null)
//     return
//   }
//   setOnShow(el)
// }

// const MarkerRender = ({ el, id, lat, lng, active, clusterer }: any) => {
// return (
// <div>
// <Marker
//   key={id}
//   clusterer={clusterer}
//   position={{ lat: +lat, lng: +lng }}
//   icon={{
//     url: `/public/imgs/equips_color/AerialEquip_24_red.svg`,
//     scaledSize: new google.maps.Size(50, 50),
//   }}
//   // icon={{
//   //   url: `/public/assets/${el.equipmentType}_${
//   //     active === 'powerOn' ? 'blue' : active === 'networkOff' ? 'gray' : 'red'
//   //   }.svg`,
//   //   url: `/public/assets/${el.name}_${
//   //     el.active === true ? (el.error ? 'red' : 'blue') : 'gray'
//   //   }.svg`,
//   //   scaledSize: new google.maps.Size(50, 50),
//   // }}
//   onClick={() => {
//     markerClick(lat, lng)
//   }}
// />
// </div>
// )
// }

// export default MarkerRender
