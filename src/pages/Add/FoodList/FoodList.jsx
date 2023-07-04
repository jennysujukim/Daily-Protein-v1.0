import { useCreate } from '../../../hooks/useCreate'

// styles
import styles from './FoodList.module.scss'

export default function FoodList({ lists }) {

    const { setName, setProtein } = useCreate()

    if (lists.length === 0) {
        return <div>No results to load...</div>
    }

    const handleClick = (name, protein) => {
        setName(name)
        setProtein(protein)
    }

    return (
        <div className={styles.container}>
            {lists.map((list, index) => (
                <div 
                    key={index}
                    className={styles.results}>
                    <div className={styles.title}>
                        <span>{list.food.label}</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 -960 960 960"
                            onClick={() => handleClick(list.food.label, list.food.nutrients.PROCNT.toFixed(0))}>
                            <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/>
                        </svg>
                    </div>
                    <div className={styles.nutritions}>
                        <div>
                            <span>Calories:</span>
                            <p>{list.food.nutrients.ENERC_KCAL.toFixed(0)} kcal</p>
                        </div>
                        <div>
                            <span>Protein:</span>
                            <p>{list.food.nutrients.PROCNT.toFixed(0)} g</p>
                        </div>
                        <div>
                            <span>Carbs:</span>
                            <p>{list.food.nutrients.CHOCDF.toFixed(0)} g</p>
                        </div>
                        <div>
                            <span>Fat:</span>
                            <p>{list.food.nutrients.FAT.toFixed(0)} g</p>
                        </div>
                    </div>
                    <p className={styles.calc}>This takes <span>4%</span> of your daily intake.</p>
                </div>
            ))}
        </div>
    )
}
