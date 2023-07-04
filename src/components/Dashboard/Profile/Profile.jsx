import { useProfile } from '../../../hooks/useProfile'

// styles
import styles from './Profile.module.scss'

// components
import HandleLink from '../../HandleLink'
import Loader from '../../Loader'


export default function Profile() {

    const { profile, error } = useProfile()

    // Show below if there's error fetching data(eg. when profile does not exist)
    if(error){ 
        return (
        <div className={styles.error}>
            {error}
            <HandleLink dest={'/onboard'}>
                Click to Set Profile
            </HandleLink>
        </div>
        )
    }

    // Show below if profile data is successfully fetched
  return (
    <div className={styles.container}>
        {!profile ? <Loader /> :
        <>
            <div className={styles.heading}>
                <h4>Profile</h4>
                <HandleLink dest="/account/setting">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M546-80H414q-11 0-19.5-7T384-105l-16-101q-19-7-40-19t-37-25l-93 43q-11 5-22 1.5T159-220L93-337q-6-10-3-21t12-18l86-63q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521l-86-63q-9-7-12-18t3-21l66-117q6-11 17-14.5t22 1.5l93 43q16-13 37-25t40-18l16-102q2-11 10.5-18t19.5-7h132q11 0 19.5 7t10.5 18l16 101q19 7 40.5 18.5T669-710l93-43q11-5 22-1.5t17 14.5l66 116q6 10 3.5 21.5T858-584l-86 61q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l86 62q9 7 12 18t-3 21l-66 117q-6 11-17 14.5t-22-1.5l-93-43q-16 13-36.5 25.5T592-206l-16 101q-2 11-10.5 18T546-80Zm-66-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z"/>
                    </svg>
                </HandleLink>
            </div>
            <div className={styles.details}>
                <div className={styles.info_container}>
                    <div>
                        <span>Age</span>
                        <p>{profile.age}</p>
                    </div>
                    <div>
                        <span>Gender</span>
                        <p>{profile.gender}</p>
                    </div>
                    <div>
                        <span>Height</span>
                        <p>{profile.height}cm</p>
                    </div>
                    <div>
                        <span>Weight</span>
                        <p>{profile.weight}kg</p>
                    </div>
                    <div>
                        <span>Activity</span>
                        <p>{profile.activity}</p>
                    </div>
                    <div>
                        <span>Goal</span>
                        <p>{profile.goal}</p>
                    </div>
                </div>
            </div>
        </>
        }
    </div>
  )
}
