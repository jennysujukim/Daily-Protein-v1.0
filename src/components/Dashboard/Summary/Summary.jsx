import { useEffect, useState } from 'react'
import { useTracker } from '../../../hooks/useTracker'
import { useProfile } from '../../../hooks/useProfile'


// styles
import styles from './Summary.module.scss'

// components
import Error from '../../Error'


export default function Summary() {

    // use intakes data from Firebase 
        // - in order to sum up total intakes
    const { error, intakes } = useTracker()

    const [ totalProtein, setTotalProtein ] = useState([])
    const [ remaining, setRemaining ] = useState('')
    const [ bar, setBar ] = useState('')

    const { profile } = useProfile()
 
    // calculate total protein intakes
    useEffect(() => {

        const getProteins = () => {
            const proteins = intakes.map((intake) => intake.protein)

            let sum = 0

            for(let i=0; i < proteins.length; i += 1){
                sum += parseInt(proteins[i])
            }

            setTotalProtein(sum)

            if(profile) {
                const remainingProtein = profile.dailyIntake - sum
                setRemaining(remainingProtein)
    
                const barPercent = 100 / profile.dailyIntake * sum
    
                setBar(barPercent)
            }
        }

        if(intakes){ getProteins() }

    }, [intakes, profile])

  return (
    <div className={styles.container}> 
        <div className={styles.heading}>
            <h4>Summary</h4>
        </div>
        {error ? <Error message={error}/> :
        <div className={styles.today}>
            <div className={styles.titleContainer}>
                <h6>Today's Protein Intake</h6>
                { profile ? <p>{totalProtein} / {profile.dailyIntake}g</p> :
                    <p>{totalProtein} / unset g</p>
                }
            </div>
            <div className={styles.proteinCalc}>
                <span>{remaining} g remaining</span>
                <div className={styles.barContainer}>
                    <div 
                    className={styles.bar}
                    style={ {width: `${bar}%`} }></div>
                </div>
            </div>
        </div>
        }
    </div>

  )
}
