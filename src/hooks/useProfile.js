import { 
    useState, 
    useEffect } from 'react';
import { 
    getDocs, 
    collection,
    onSnapshot, 
    query, 
    updateDoc, 
    where } from 'firebase/firestore';
import { useAuthContext } from "./useAuthContext";
import { db } from '../firebase/config';



// ------ READ PROFILE DATABASE ------- //

export const useProfile = () => {

    const [ profile, setProfile ] = useState(null)
    const [ error, setError ] = useState(null)

    // use AuthContext to check user
    const { user } = useAuthContext()

useEffect(() => {

    // declare variable for 'profiles' collection database in Firestore
    let ref = collection(db, 'profiles')

    // declare query for check 'uid' field in database
    const q = query(ref, where("uid", "==", user.uid))

    // Read real-time data
        // - snapshot: real-time data when the function is executed
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



// ------ UPDATE PROFILE DATABASE ------- //

export const useUpdateProfile = () => {

    const [ error, setError ] = useState(null)
    const [ age, setAge ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ activity, setActivity ] = useState('')
    const [ goal, setGoal ] = useState('')

    // use AuthContext to check user
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
                    setError(null)
                } else {
                    console.log('Profile does not exist.')
                    setError('Profile does not exist.')
                }
            } catch (error) {
                setError('Error updating document:', error)
            }

        }

        // ensuring all input fields are filled
        if(age !== '' && gender !== '' && height !== '' && weight !== '' && activity !== '' && goal !== ''){
            updateDocument()
        } else {
            setError('All input fields should be filled.')
        }

    }, [ age, gender, height, weight, activity, goal, user ])


    return { setAge, setGender, setHeight, setWeight, setActivity, setGoal, error }
}