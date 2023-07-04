import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

// styles
import styles from './Add.module.scss'

// components
import Button from '../../components/Button'
import FoodList from './FoodList/FoodList'

export default function Add() {

  const [ searchValue, setSearchValue ] = useState('')
  const [ foods, setFoods ] = useState([])

  const url = `${process.env.REACT_APP_API_URL}&ingr=${searchValue}`

  const { data, isPending, error } = useFetch(url)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFoods(data.hints)
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Search Food</h2>
        <p>Search food you want to record on your today's intake.</p>
      </div>
      <form 
        className={styles.form}
        onSubmit={handleSubmit}>
        <input 
          type="text"
          onChange={(e) => setSearchValue(e.target.value)} />
        <Button text="Search"></Button>
      </form>
        <div className={styles.results_container}>
          { error && <p>{error}</p> }
          { isPending && <p>{isPending}</p> }
          { data && <FoodList lists={foods} /> }
        </div>
    </div>
  )
}
