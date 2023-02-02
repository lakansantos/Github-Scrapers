
import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import {FiExternalLink} from 'react-icons/fi'



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

        <div className='flex flex-row items-center justify-center mt-12 h-1/2   w-full'>
          <div className='flex items-center justify-center h-fit w-3/4 h-full'>
            <div className="img-container h-full w-50 flex justify-center bg-sky-400">
              <img src={data.avatar_url} alt="avatar" className='w-72 object-fixed'/>
            </div>
      
            <div className="content-container pl-4 pt-4 text-left w-3/6 bg-gray-200">
              <h1 className='name text-4xl'>{data.name}</h1>
              <div className='h-fit text-left mt-4'>
                <p><span>Bio:</span> {ifEmpty(data.bio)}</p>
                <p><span>Number of repositories:</span> {data.public_repos}</p>
                <p><span>Followers:</span> {data.followers}</p>
                <p><span>Following:</span> {data.following}</p>
                <p><span>Location:</span> {ifEmpty(data.location)}</p>
                <p><span>Company:</span> {ifEmpty(data.company)}</p>
              </div>
              <a href={`https://github.com/${data.login}`} target="_blank">
                <button className='bg-sky-500 w-fit p-1  gap-2 text-white flex items-center justify-center mt-4'>Visit<FiExternalLink/></button>
              </a>
            </div>              
          </div>
        </div>
      </div>
    )
  }



}



export default App
