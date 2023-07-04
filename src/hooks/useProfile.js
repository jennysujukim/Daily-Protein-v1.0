import { useState, useEffect } from 'react'
import { useAuthContext } from "./useAuthContext"
import { db } from '../firebase/config'
import { getDocs, collection, onSnapshot, query, updateDoc, where } from 'firebase/firestore'


// Get Profile data 
export const useProfile = () => {

    const [ profile, setProfile ] = useState(null)
    const [ error, setError ] = useState(null)

    const { user } = useAuthContext()

useEffect(() => {

    let ref = collection(db, 'profiles')

    const q = query(ref, where("uid", "==", user.uid))

    const unsub = onSnapshot(q, (snapshot) => {
        if(!snapshot.empty){
            snapshot.forEach((doc) => {
                setProfile({...doc.data(), id: doc.id})
                setError(null)
            })
        } else {
            setError('Profile does not exist.')
        }
    }, (error) => {
        console.log(error)
        setError('Could not fetch the data.')
    })

    return () => unsub()

}, [user.uid])

return { profile, error }

} 


// Update Profile Setting
export const useUpdateProfile = () => {

    const [ age, setAge ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ goal, setGoal ] = useState('')

    const { user } = useAuthContext()

    useEffect(() => {
        const updateDocument = async () => {
            try {
                const ref = collection(db, 'profiles')
                const q = query(ref, where('uid', '==', user.uid))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref
                    await updateDoc(docRef, {
                        age: age,
                        gender: gender,
                        height: height,
                        weight: weight,
                        activity: activity,
                        goal: goal
                    })
                    console.log('Document updated successfully')
                } else {
                    console.log('Profile does not exist.')
                }
            } catch (error) {
                console.error('Error updating document:', error)
            }
        }

        if(age !== '' && gender !== '' && height !== '' && weight !== '' && activity !== '' && goal !== ''){
            updateDocument()
        } else {
            console.log('input field should be all filled')
        }

    }, [ age, gender, height, weight, activity, goal, user ])


    return { setAge, setGender, setHeight, setWeight, setActivity, setGoal }
}