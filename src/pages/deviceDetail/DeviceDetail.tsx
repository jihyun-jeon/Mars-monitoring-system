import axios from 'axios'
import { useEffect } from 'react'

const DeviceDetail = () => {
  fetch('http://192.168.0.90:8000/equipment/91?repaired_sort_id=1')
    .then((res) => {
      console.log(res)
    })
    .then((res) => {
      res.then()
    })
    .then((result) => console.log(reuslt))

  //
  const requestUserInfoCheckToServer = async () => {
    try {
      const response = await axios
        .get('http://192.168.0.90:8000/equipment/30?repaired_sort_id=1')
        .then((res) => console.log(res))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    requestUserInfoCheckToServer()
  }, [])

  return <div>Device Detail</div>
}

export default DeviceDetail
