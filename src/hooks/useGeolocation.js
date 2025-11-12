import { useState, useEffect } from 'react'

export const useGeolocation = (options = {}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError(new Error('Geolocation is not supported'))
            setLoading(false)
            return
        }

        const onSuccess = (position) => {
            setData({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                accuracy: position.coords.accuracy
            })
            setLoading(false)
            setError(null)
        }

        const onError = (error) => {
            setError(error)
            setLoading(false)
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
    }, [options])

    return { loading, error, data }
}