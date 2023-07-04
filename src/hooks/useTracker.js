import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext" 
import { format } from 'date-fns'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'

export const useTracker = () => {

    const [ intakes, setIntakes ] = useState(null)
    const [ error, setError ] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        let ref = collection(db, 'intakes')

        const q = query(ref, where( "uid", "==", user.uid ), orderBy("createdAt") )

        const currentDate = format(new Date(), 'PP')

        const unsub = onSnapshot(q, (snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {

                const data = doc.data()
                const dataDate = format(data.createdAt.toDate(), 'PP')

                if(dataDate === currentDate){
                    results.push({ ...data, id: doc.id })
                }
            })
            setIntakes(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data.')
        }) 

        return () => unsub()

    }, [user.uid])

    return { intakes, error }

}
