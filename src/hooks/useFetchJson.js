import { useState, useEffect, useCallback } from 'react'
import { useOnlineStatus } from './useOnlineStatus.js'

export const useFetchJson = (fetchFn, deps = []) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const isOnline = useOnlineStatus()

    const fetchData = useCallback(async () => {
        if (!isOnline) {
            setError(new Error('No internet connection'))
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const result = await fetchFn()
            setData(result)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [fetchFn, isOnline, ...deps])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { loading, error, data, refetch: fetchData }
}