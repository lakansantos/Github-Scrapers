
import { useState } from 'react'
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
    return(
      <div className="flex w-3/4 h-3/4 flex flex-col bg-white" >
        <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
      </div>
    )
  }

  if(!data.login){
    return(
      <div className="flex w-3/4 h-3/4 flex flex-col bg-white" >
      <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
      <div className="results">
        <h1>Data does not match</h1>
      </div>
    </div>
    )
  }

  if(data){
    return (
      <div className="flex w-3/4 h-3/4 flex flex-col bg-white">
        <div>
          <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
        </div>

        <div className='flex flex-row items-center justify-center mt-12'>
          <div className="img-container">
            <img src={data.avatar_url} alt="avatar" className='w-72 h-72 object-contain'/>
          </div>

          <div className="contents">
            
            <ul className='border-solid border-2 border-black'>
              <li><h1>Name: {data.name}</h1></li>
              <li>Bio: {data.bio}</li>
              <li>Number of repositories: {data.public_repos}</li>
              <li>Followers: {data.followers}</li>
              <li>Following: {data.following}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }



}



export default App
