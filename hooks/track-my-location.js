import { useEffect, useState } from "react"

const TrackMyLocation = () => {

    const [latLong, setLatLong] = useState('')
    const [locationErrorMsg, setLocationErrorMsg] = useState('')
    const [isTrackLocationLocating, setIsTrackLocationLocating] = useState('false')

    function success(position) {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setLatLong(`${latitude},${longitude}`)
        setLocationErrorMsg('')
        setIsTrackLocationLocating('false')
    }

    function error(e) {
        setLocationErrorMsg(`Error: Unable to access your Geolocation, Permission denied!`)
        setIsTrackLocationLocating('false')
    }

    function trackMyCurrentLocationHandler() {
        setIsTrackLocationLocating('true')
        try {
            if (!navigator.geolocation) {
                setIsTrackLocationLocating('false')
                setLocationErrorMsg(`Browser donesn\'t  support for Geolocation!`)
            } else {
                navigator.geolocation.getCurrentPosition(success, error)
            }
        } catch (error) {
            setIsTrackLocationLocating('false')
            setLocationErrorMsg('somting went wrong!!! please try again')
        }

    }

    return {
        trackMyCurrentLocationHandler,
        locationErrorMsg,
        latLong,
        isTrackLocationLocating
    }

}

export default TrackMyLocation