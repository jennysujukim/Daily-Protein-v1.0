import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { db } from '../firebase/config'
import { 
    collection, 
    addDoc,
    serverTimestamp } from 'firebase/firestore'

export const useCreate = () => {

    const [ error, setError ] = useState(null)
    const [ name, setName ] = useState('')
    const [ protein, setProtein ] = useState('')

    const { user } = useAuthContext()

    useEffect(() => {

        // create add function
        const addDocument = async () => {
            try {
                const ref = collection(db, 'intakes')

                await addDoc(ref, {
                    name: name,
                    protein: protein,
                    createdAt: serverTimestamp(),
                    uid: user.uid
                })

            } catch (error) {
                setError('Error adding document:', error)
                console.log(error)
            }
        }

        if(name !== '' && protein !== ''){
            addDocument()
        }

    }, [user, name, protein])

    return { setName, setProtein, error }

}