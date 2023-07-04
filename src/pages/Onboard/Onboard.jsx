import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProfile } from '../../hooks/useProfile'

// styles
import styles from './Onboard.module.scss'

// components
import Button from '../../components/Button'
import HandleLink from '../../components/HandleLink'
import Error from '../../components/Error'


export default function Onboard() {

    const [age, setAgeState] = useState('');
    const [gender, setGenderState] = useState('');
    const [height, setHeightState] = useState('');
    const [weight, setWeightState] = useState('');
    const [activity, setActivityState] = useState('');
    const [goal, setGoalState] = useState('');

    // Add data to Firestore when user submits the form
    const { setAge, setGender, setHeight, setWeight, setActivity, setGoal, createError } = useCreateProfile()

    const navigate = useNavigate()

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
        <div className={styles.heading}>
            <h3>Set Details</h3>
            <p>Input your stats to estimate daily protein intake.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
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
                    <option value=""></option>
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
                    <option value=""></option>
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
                    <option value=""></option>
                    <option value="Gain weight">Gain weight</option>
                    <option value="Maintain weight">Maintain weight</option>
                    <option value="Loose weight">Loose weight</option>
                </select>
            </label>
            {createError && <Error message={createError}/>}
            { age !== "" && gender !== "" && height !== "" && weight !== "" && activity !== "" && goal !== "" ? 
                <Button text="Save & Estimate"></Button> :
                <div className={styles.error}>
                    <Error message={"Please fill all input fields to save and estimate."}/>
                </div>
            }
        </form>
        <HandleLink dest={'/'}>
            <button className={styles.skip}>SKIP FOR NOW</button>
        </HandleLink>
    </div>
  )
}
