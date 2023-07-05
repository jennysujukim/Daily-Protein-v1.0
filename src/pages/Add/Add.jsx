import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

// styles
import styles from './Add.module.scss'

// components
import Button from '../../components/Button'
import FoodList from './FoodList/FoodList'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

export default function Add() {

  const [ searchValue, setSearchValue ] = useState('')
  const [ foods, setFoods ] = useState([])
  const [ isSubmitted, setIsSubmitted ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault() 
    setIsSubmitted(true)
  }

  // endpoint uri of Edadam API
  const url = `${process.env.REACT_APP_API_URL}&ingr=${searchValue}`

  // fetch API
  const { data, isPending, error } = useFetch(url)

  // set to fetch data only when form is submitted
  if(isSubmitted){
    setFoods(data.hints)
    setIsSubmitted(false)
  }

  return (
    <div className="wrapper">
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
          { isSubmitted && error && <Error message={error} /> }
          { isSubmitted && isPending && <Loader /> }
          { data && <FoodList lists={foods} /> }
        </div>
    </div>
  )
}
