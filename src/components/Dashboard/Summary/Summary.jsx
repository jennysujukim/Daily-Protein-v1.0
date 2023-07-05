import { useEffect, useState } from 'react'
import { useTracker } from '../../../hooks/useTracker'


// styles
import styles from './Summary.module.scss'

// components
import Error from '../../Error'

export default function Summary({ proteinIntake }) {

    // use intakes data from Firebase 
        // - in order to sum up total intakes
    const { error, intakes } = useTracker()

    const [ totalProtein, setTotalProtein ] = useState([])
    const [ remaining, setRemaining ] = useState('')
    const [ bar, setBar ] = useState('')


 
    // calculate total protein intakes
    useEffect(() => {

        const getProteins = () => {
            const proteins = intakes.map((intake) => intake.protein)

            let sum = 0

            for(let i=0; i < proteins.length; i += 1){
                sum += parseInt(proteins[i])
            }

            setTotalProtein(sum)

            const remainingProtein = parseInt(proteinIntake) - sum
            setRemaining(remainingProtein)

            const barPercent = 100 / parseInt(proteinIntake) * sum

            setBar(barPercent)
        }

        if(intakes){ getProteins() }

    }, [intakes, proteinIntake])

  return (
    <div className={styles.container}> 
        <div className={styles.heading}>
            <h4>Summary</h4>
        </div>
        {error ? <Error message={error}/> :
        <div className={styles.today}>
            <div className={styles.titleContainer}>
                <h6>Today's Protein Intake</h6>
                <p>{totalProtein} / {proteinIntake}g</p>
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
