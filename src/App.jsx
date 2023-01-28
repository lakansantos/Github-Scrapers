
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading]  = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState('none')
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/users/${inputValue}`)
    .then(response => response.json())
    .then(users => setData(users))
    .catch(err => setError(err))
    console.log(data)
  }
  
  
  return (
  <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search a user" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
      <button type="submit">Search</button>
    </form>
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
