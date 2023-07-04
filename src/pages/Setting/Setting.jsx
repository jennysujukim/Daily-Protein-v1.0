import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile, useUpdateProfile } from '../../hooks/useProfile'

// styles
import styles from './Setting.module.scss'

// components
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import HandleLink from '../../components/HandleLink'

export default function Setting() {

    // Set mutable values
    const [age, setAgeState] = useState('');
    const [gender, setGenderState] = useState('');
    const [height, setHeightState] = useState('');
    const [weight, setWeightState] = useState('');
    const [activity, setActivityState] = useState('');
    const [goal, setGoalState] = useState('');

    // Fetch profile's saved data
    const { profile, error } = useProfile()

    // Update profile's data
    const { setAge, setGender, setHeight, setWeight, setActivity, setGoal } = useUpdateProfile()

    const navigate = useNavigate()

    // Check error 
    if(error){ return <div>{error}</div> }
    // Show loader during fetching
    if (!profile){ return <Loader /> }

    const handleSubmit = (e) => {
        e.preventDefault()

        setAge(age || profile.age)
        setGender(gender || profile.gender)
        setHeight(height || profile.height)
        setWeight(weight || profile.weight)
        setActivity(activity || profile.activity)
        setGoal(goal || profile.goal)

        navigate('/')
    }

  return (
    <div className={styles.container}>
        <h3 className={styles.heading}>Profile Setting</h3>
        <form 
            className={styles.form}
            onSubmit={handleSubmit}>
            <label>
                <span>Age</span>
                <input 
                    type="number"
                    onChange={(e) => setAgeState(e.target.value)}
                    value={age || profile.age} />
            </label>
            <label>
                <span>Gender</span>
                <select 
                    value={gender || profile.gender}
                    onChange={(e) => setGenderState(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <label>
                <span>Height</span>
                <input
                    type="number"
                    onChange={(e) => setHeightState(e.target.value)}
                    value={height || profile.height} />
            </label>
            <label>
                <span>Weight</span>
                <input 
                    type="number"
                    onChange={(e) => setWeightState(e.target.value)}
                    value={weight || profile.weight} />
            </label>
            <label>
                <span>Activity</span>
                <select
                    value={activity || profile.activity}
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
                    value={goal || profile.goal}
                    onChange={(e) => setGoalState(e.target.value)}>
                    <option value="Gain weight">Gain weight</option>
                    <option value="Maintain weight">Maintain weight</option>
                    <option value="Loose weight">Loose weight</option>
                </select>
            </label>
            <Button text="Update"></Button>
        </form>
        <HandleLink dest={'/'}>
            <button className={styles.back}>Go Back</button>
        </HandleLink>
    </div>
  )
}
