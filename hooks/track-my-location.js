import { useState } from "react"

const TrackMyLocation = () => {

    const [latLong, setLatLong] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

        function success(position) 
        {
            const latitude= position.coords.latitude
            const longitude= position.coords.longitude
            console.log(`${latitude}, ${longitude}`)
            setLatLong(`${latitude}, ${longitude}`)
            setErrorMsg('')
        }
        
        function error(e)
        {
            setErrorMsg(`Error: ${e}`)
        }
        
        function trackMyLocationHandler () 
        {
            if(!navigator.geolocation){
                setErrorMsg( `Browser donesn\'t  supported for Geolocation, Please try with next browser!`)
            }else{
                navigator.geolocation.getCurrentPosition(success, error)
            }
        }

    return {
        trackMyLocationHandler,
        latLong,
        errorMsg
    }

}

export default TrackMyLocation