
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
      console.log(data)
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
  const ifEmpty = (detail) => {
    if(detail === '' || detail === null) {
      return 'Not specified'
    } else {
      return detail
    }
  }





  if(data){
    return (
      <div className="flex w-3/4 h-3/4 flex flex-col bg-white">
        <div>
          <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
        </div>

        <div className='flex flex-row items-center justify-center mt-12 h-fit'>
          <div className="img-container">
            <img src={data.avatar_url} alt="avatar" className='w-72 h-72 object-contain'/>
          </div>

          <div className="content-container text-left ml-4">
            <h1><span>Name:</span> {data.name}</h1>
            <div className='h-fit text-left'>
              <p><span>Bio:</span> {ifEmpty(data.bio)}</p>
              <p><span>Number of repositories:</span> {data.public_repos}</p>
              <p><span>Followers:</span> {data.followers}</p>
              <p><span>Following:</span> {data.following}</p>
              <p><span>Location:</span> {ifEmpty(data.location)}</p>
              <p><span>Company:</span> {ifEmpty(data.company)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }



}



export default App
