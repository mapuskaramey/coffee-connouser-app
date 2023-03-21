import { useEffect, useState } from "react"

const TrackMyLocation = () => {

    const [latLong, setLatLong] = useState({})
    const [locationErrorMsg, setLocationErrorMsg] = useState('')
    const [isTrackLocationOn, setIsTrackLocationOn] = useState(false)

        function success(position) 
        {
            const latitude= position.coords.latitude
            const longitude= position.coords.longitude
            setLatLong(`${latitude}, ${longitude}`)
            setIsTrackLocationOn(false)
            setLocationErrorMsg('')
        }
        
        function error(e)
        {
            setLocationErrorMsg(`Error: unable to access your location, Please allow us to fetch Coffee Stores near to you!`)
            setIsTrackLocationOn(false)
        }
        
        function trackMyLocationHandler ()
        {
            setIsTrackLocationOn(true)
            try{
                if(!navigator.geolocation){
                    setLocationErrorMsg( `Browser donesn\'t  supported for Geolocation, Please try with next browser!`)
                }else{
                    navigator.geolocation.getCurrentPosition(success, error)
                }
            }catch(error) {
                setLocationErrorMsg('somting went wrong!!! please try again')
            }
            
        }

    return {
                trackMyLocationHandler,
                latLong,
                locationErrorMsg,
                isTrackLocationOn
            }

}

export default TrackMyLocation