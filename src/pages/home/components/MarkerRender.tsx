import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { Marker } from '@react-google-maps/api'
import { Clusterer } from '@react-google-maps/marker-clusterer'

interface MarkerPropType {
  el: { lat: number; lng: number; name: string; active: boolean; error: boolean }
  clusterer?: Clusterer | MarkerClusterer
  markerClick: (el: any) => void
}

const MarkerRender = ({ el, clusterer, markerClick }: MarkerPropType) => {
  return (
    <div>
      <Marker
        clusterer={clusterer}
        position={{ lat: el.lat, lng: el.lng }}
        icon={{
          url: `/public/assets/${el.name}_${
            el.active === true ? (el.error ? 'red' : 'blue') : 'gray'
          }.svg`,
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
