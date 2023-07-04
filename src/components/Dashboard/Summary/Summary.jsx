import { useEffect, useState } from 'react'
import { useTracker } from '../../../hooks/useTracker'

// styles
import styles from './Summary.module.scss'

export default function Summary() {

    // const days = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ]

    const { intakes } = useTracker()

    const [ totalProtein, setTotalProtein ] = useState([])
    const [ remaining, setRemaining ] = useState('')
    const [ bar, setBar ] = useState('')
 
    useEffect(() => {

        const getProteins = () => {
            const proteins = intakes.map((intake) => intake.protein)

            let sum = 0

            for(let i=0; i < proteins.length; i += 1){
                sum += parseInt(proteins[i])
            }

            setTotalProtein(sum)

            // change 40 to the calculated target intakes from onboard
            const remainingProtein = 40 - sum
            setRemaining(remainingProtein)

            const barPercent = 100 / 40 * sum

            setBar(barPercent)
        }

        if(intakes){
            getProteins()
        }

    }, [intakes])

  return (
    <div className={styles.container}> 
        <div className={styles.heading}>
            <h4>Summary</h4>
        </div>
        <div className={styles.content_container}>
            <div className={styles.today}>
                <div className={styles.title_container}>
                    <h6>Today's Protein Intake</h6>
                    <p>{totalProtein} / 40g</p>
                </div>
                <div className={styles.proteinCalc}>
                    <span>{remaining} g remaining</span>
                    <div className={styles.bar_container}>
                        <div 
                        className={styles.bar}
                        style={ {width: `${bar}%`} }></div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.record}>
                <div className={styles.title_container}>
                    <h6>See Your Record</h6>
                </div>
                <div className={styles.graph_container}>
                    {days.map((day, index)=> (
                    <div key={index} className={styles.graph}>
                        <div className={styles.bar_container}>
                            <div className={styles.bar}></div>
                        </div>
                        <span>{day}</span>
                    </div>
                    ))}
                </div>
            </div> */}
        </div>
    </div>

  )
}
