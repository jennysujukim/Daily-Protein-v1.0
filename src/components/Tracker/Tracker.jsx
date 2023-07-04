import { useTracker } from '../../hooks/useTracker'
import { useDelete } from '../../hooks/useDelete'

// styles
import styles from './Tracker.module.scss'

// components
import HandleLink from '../HandleLink'
import Button from '../Button'
import Error from '../Error'


export default function Tracker() {

    // Fetch intakes data from Firebase
    const { intakes, error } = useTracker()

    // Delete data on 'intakes' database
    const { setDocId, deleteError } = useDelete()

    const handleClick = (docId) => {
        setDocId(docId)
    }

  return ( 
    <div className={styles.container}>

        <div className={styles.heading}>
            <h3>Track Protein</h3>
            <HandleLink dest="/add">
                <Button text="Add Food"></Button>
            </HandleLink>
        </div>

        <div className={styles.listContainer}>
            {error && <Error message={error} />}
            {intakes && intakes.length === 0 && 
                <Error message={"There's no items to show so far! Add Food to track your daily protein intakes."}/>
            }
            {intakes && 
            intakes.map((intake, index) => (
                <div 
                key={index}
                className={styles.list}>
                    <p className={styles.title}>{intake.name}</p>
                    <p className={styles.protein}>Protein {intake.protein} g</p>
                    <div>
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 -960 960 960"
                        onClick={() => handleClick(intake.id)}>
                            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
                        </svg>
                    </div>
                    {deleteError && <Error message={deleteError}/> }
                </div>
            ))}
        </div>

    </div>
  )
}
