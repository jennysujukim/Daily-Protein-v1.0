import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export const useOnboard = () => {
    const [ age, setAge ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ goal, setGoal ] = useState('')

    const { user } = useAuthContext()

    useEffect(() => {

        const addDocument = async () => {
            try {
                const ref = collection(db, 'profiles')

                await addDoc(ref, {
                    age: age,
                    gender: gender,
                    height: height, 
                    weight: weight,
                    activity: activity,
                    goal: goal,
                    uid: user.uid
                })

                console.log('Document added successfully')
            } catch (error) {
                console.error('Error adding document:', error)
            }
        }

        if(age !== "" && gender !== "" && height !== "" && weight !== "" && activity !== "" && goal !== ""){
            addDocument()
        } else {
            console.log('input field should be all filled')
        }

    }, [ age, gender, height, weight, activity, goal, user])

    return { setAge, setGender, setHeight, setWeight, setActivity, setGoal }
}