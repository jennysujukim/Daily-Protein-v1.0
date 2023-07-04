import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    useProfile, 
    useUpdateProfile } from '../../hooks/useProfile'

// styles
import styles from './Setting.module.scss'

// components
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import HandleLink from '../../components/HandleLink'
import Error from '../../components/Error'

export default function Setting() {

    const [age, setAgeState] = useState('');
    const [gender, setGenderState] = useState('');
    const [height, setHeightState] = useState('');
    const [weight, setWeightState] = useState('');
    const [activity, setActivityState] = useState('');
    const [goal, setGoalState] = useState('');

    // useProfile to fetch saved profile data from Firebase
    const { profile, error } = useProfile()


    // set the initial input values as saved data from Firebase
    useEffect(() => {
        if (profile) {
            setAgeState(profile.age)
            setGenderState(profile.gender)
            setHeightState(profile.height)
            setWeightState(profile.weight)
            setActivityState(profile.activity)
            setGoalState(profile.goal)
        }
    },[profile])

    // update profile data to Firebase
    const { setAge, setGender, setHeight, setWeight, setActivity, setGoal, updateError } = useUpdateProfile()

    const navigate = useNavigate()

    // update profile data when user submits form
    const handleSubmit = (e) => {
        e.preventDefault()

        setAge(age)
        setGender(gender)
        setHeight(height)
        setWeight(weight)
        setActivity(activity)
        setGoal(goal) 

        navigate('/')
    }

  return (
    <div className="wrapper">
        <h3 className={styles.heading}>Profile Setting</h3>
        {error && <Error message={error}/>}
        {!profile ? <Loader /> : 
        <form 
        className={styles.form}
        onSubmit={handleSubmit}>
            <label>
                <span>Age</span>
                <input 
                type="number"
                onChange={(e) => setAgeState(e.target.value)}
                value={age} />
            </label>
            <label>
                <span>Gender</span>
                <select 
                value={gender}
                onChange={(e) => setGenderState(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            </label>
            <label>
                <span>Height / cm</span>
                <input
                type="number"
                onChange={(e) => setHeightState(e.target.value)}
                value={height} />
            </label>
            <label>
                <span>Weight / kg</span>
                <input 
                type="number"
                onChange={(e) => setWeightState(e.target.value)}
                value={weight} />
            </label>
            <label>
                <span>Activity</span>
                <select
                value={activity}
                onChange={(e) => setActivityState(e.target.value)}>
                    <option value="Highly Active">Highly Active</option>
                    <option value="Active">Active</option>
                    <option value="Average">Average</option>
                    <option value="Low Active">Low Active</option>
                    <option value="No Active">No Active</option>
                </select>
            </label>
            <label>
                <span>Goal</span>
                <select 
                value={goal}
                onChange={(e) => setGoalState(e.target.value)}>
                    <option value="Gain weight">Gain weight</option>
                    <option value="Maintain weight">Maintain weight</option>
                    <option value="Loose weight">Loose weight</option>
                </select>
            </label>
            {updateError && <Error message={updateError}/>}
            <Button text="Update"></Button>
        </form>
        }
        <HandleLink dest={'/'}>
            <button className={styles.back}>Go Back</button>
        </HandleLink>
    </div>
  )
}
