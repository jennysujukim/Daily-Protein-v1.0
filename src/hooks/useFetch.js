import { useState, useEffect } from "react"

export const useFetch = (url, isFetch) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        // use AbortController to track signal and request to be aborted if necessary
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try {
                // fetch data
                const response = await fetch(url, { signal: controller.signal })

                // throw error if the response is failed
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                // receive parsed json data
                const data = await response.json()

                setIsPending(false)
                setData(data)
                setError(null)

            } catch (error) {
                if(error.name === "AbortError"){
                    setError("the fetch was aborted.")
                } else {
                    setIsPending(false)
                    setError("Could not fetch the data.")
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }

    }, [url])

    return { data, isPending, error }

}