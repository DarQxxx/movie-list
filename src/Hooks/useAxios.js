import Axios from 'axios'
import { useEffect, useState } from 'react'

export default function useAxios (przedApi, poApi) {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    Axios
    .get(
      `https://api.themoviedb.org/3/movie${przedApi}?api_key=c14c50d17fa9e6d17b2f1d911564ecd4${poApi}`
    )
    .then(res => {
      setApiData(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
      setApiData(null)
    })
  }, [])
  
 

  return [apiData, setApiData]
}

