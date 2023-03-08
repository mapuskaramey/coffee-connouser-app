import { useState } from "react"


const TrackLocation = () => {

    const [latLong, setLatLong] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    
    const success = (position) => {
        let latitude= position.coords.latitude
        let longitude= position.coords.longitude
        setLatLong(`${latitude}, ${longitude}`)
        setErrorMsg('')
    }

    const error = () => {
        setErrorMsg(`opss! sorry we are failed to locate your location`)
    }

    const handleTrackLocation = () => {
        if(!navigator.geolocation) {
            setErrorMsg(`Browser donesn\'t  supported for Geolocation, Please try with next browser!`)
        } else {
            setErrorMsg('locating...')
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }
    

    return {
        latLong,
        errorMsg,
        handleTrackLocation
    }

}

export default TrackLocation