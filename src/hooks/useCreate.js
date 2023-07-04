import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const useCreate = () => {

    const [ name, setName ] = useState('')
    const [ protein, setProtein ] = useState('')
    const { user } = useAuthContext()

    const createdAt = serverTimestamp()

    useEffect(() => {

        const addDocument = async () => {
            try {
                const ref = collection(db, 'intakes')

                await addDoc(ref, {
                    name: name,
                    protein: protein,
                    createdAt: createdAt,
                    uid: user.uid
                })

                console.log('Document added sccueessfully')
            } catch (error) {
                console.error('Error adding document:', error)
            }
        }

        if(name !== '' && protein !== ''){
            addDocument()
        }

    }, [user, name, protein, createdAt])

    return { setName, setProtein, createdAt }

}