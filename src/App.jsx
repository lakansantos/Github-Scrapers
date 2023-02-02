
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
  }

  if(!data){
    return <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
  }
 

  if(data){
    return (
      <>
        <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
        <div className="results">
          <h1>{data.name}</h1>
          <img src={data.avatar_url} alt="" />
          <ul>
            <li>Bio: {data.bio}</li>
            <li>Number of repositories: {data.public_repos}</li>
            <li>Followers: {data.followers}</li>
            <li>Following: {data.following}</li>
          </ul>
        </div>
      </>
    )
  }


}



export default App
