
import { useEffect, useState, useCallback } from 'react'
import './App.css'
import Search from './components/Search'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://api.github.com/users/${inputValue}`)
      .then(response => response.json())
      .then(users => setData(users))
      .catch(err => setError(err))
      setLoading(loading)
      console.log(data)
  }

  if(loading){
    return <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
  }

  return (
  <>
    <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
    <div className="results">
      <h1>{data ? data.name : 'No input yet'}</h1>
      <img src={data ? data.avatar_url : ''} alt="" />
      <ul>
        <li>Bio: {data ? data.bio : ''}</li>
        <li>Number of repositories: {data ? data.public_repos: ''}</li>
        <li>Followers: {data ? data.followers : ''}</li>
        <li>Following: {data ? data.following : ''}</li>
      </ul>
    </div>


  </>
  )
}



export default App
