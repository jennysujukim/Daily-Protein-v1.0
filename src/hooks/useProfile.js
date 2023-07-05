import { 
    useState, 
    useEffect } from 'react';
import { 
    getDocs, 
    collection,
    onSnapshot, 
    query, 
    updateDoc, 
    where,
    addDoc } from 'firebase/firestore';
import { useAuthContext } from "./useAuthContext";
import { db } from '../firebase/config';



// ------ READ PROFILE DATABASE ------- //

export const useProfile = () => {

    const [ profile, setProfile ] = useState(null)
    const [ error, setError ] = useState(null)

    // use user's uid from AuthContext
    const { user } = useAuthContext()

useEffect(() => {

    // declare variable for 'profiles' collection database in Firestore
    let ref = collection(db, 'profiles')

    // declare query for checking 'uid' field in database
    const q = query(ref, where("uid", "==", user.uid))

    // Read real-time data
    const unsub = onSnapshot(q, (snapshot) => {
        // retrieve data if snapshot has something
        if(!snapshot.empty){
            snapshot.forEach((doc) => {
                setProfile({...doc.data(), id: doc.id})
                setError(null)
            })
        } else {
            setError('Profile does not exist.')
        }
    }, (error) => {
        setError('Could not fetch the profiles data.')
    })

    return () => unsub()

}, [user.uid])

return { profile, error }

} 



// ------ CREATE PROFILE DATABASE ------- //

export const useCreateProfile = () => { 

    const [ createError, setCreateError ] = useState(null)
    const [ age, setAge ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ goal, setGoal ] = useState('')
    const [ dailyIntake, setDailyIntake ] = useState('')

    const { user } = useAuthContext()

    useEffect(() => {

        // create add function
        const addDocument = async () => {
            try {
                // declare variable for 'profiles' database in Firestore
                const ref = collection(db, 'profiles')

                // add data
                await addDoc(ref, {
                    age: age,
                    gender: gender,
                    height: height, 
                    weight: weight,
                    activity: activity,
                    goal: goal,
                    dailyIntake: dailyIntake,
                    uid: user.uid
                })

            } catch (error) {
                setCreateError('Error adding document:', error)
            }
        }

        if(age !== "" && gender !== "" && height !== "" && weight !== "" && activity !== "" && goal !== "" && dailyIntake !== ""){
            addDocument()
        }

    }, [ age, gender, height, weight, activity, goal, dailyIntake, user])

    return { setAge, setGender, setHeight, setWeight, setActivity, setGoal, setDailyIntake, createError }
}




// ------ UPDATE PROFILE DATABASE ------- //

export const useUpdateProfile = () => {

    const [ updateError, setUpdateError ] = useState(null)
    const [ age, setAge ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ goal, setGoal ] = useState('')

    const { user } = useAuthContext()

    useEffect(() => {

        // create updateDocument async function
        const updateDocument = async () => {

            try {
                // declare variable for 'profiles' collection database in Firestore
                const ref = collection(db, 'profiles')

                // declare query for check 'uid' field in database
                const q = query(ref, where('uid', '==', user.uid))

                // read database that matches 'uid' in advance before proceed function
                const querySnapshot = await getDocs(q)

                // if retrieved database is not empty, run below
                if (!querySnapshot.empty) {
                    // declare variable to ensure referring initial/single document (prevent to retrieve duplicated/multiple documents)
                    const docRef = querySnapshot.docs[0].ref
                    // update data
                    await updateDoc(docRef, {
                        age: age,
                        gender: gender,
                        height: height,
                        weight: weight,
                        activity: activity,
                        goal: goal
                    })
                    setUpdateError(null)
                } else {
                    console.log('Profile does not exist.')
                    setUpdateError('Profile does not exist.')
                }
            } catch (error) {
                setUpdateError('Error updating document:', error)
            }

        }

        // ensuring all input fields are filled
        if(age !== '' && gender !== '' && height !== '' && weight !== '' && activity !== '' && goal !== ''){
            updateDocument()
        }

    }, [ age, gender, height, weight, activity, goal, user ])


    return { setAge, setGender, setHeight, setWeight, setActivity, setGoal, updateError }
}
