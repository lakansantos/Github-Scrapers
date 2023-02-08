
import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import {FiExternalLink} from 'react-icons/fi'
import nouserfound from './img/nouserfound.png'


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
      <div className="flex w-full h-1/2 flex flex-col bg-white/90 sm:w-3/4">
        <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
        <h1 className='h-[50%] flex justify-center items-center text-2xl px-4'>Scrape!</h1>
      </div>
    )
  }

  if(!data.login){
    return(
      <div className="flex w-full h-3/4 flex flex-col bg-white/90 sm:w-3/4 ">
      <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
      <div className="results h-fit flex justify-center items-center flex-col">
        <h1 className='text-4xl text-red-400 mt-4'>User not found!</h1>
        <img src={nouserfound} alt="Not found" />
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
    return data?  (
      <div className="flex w-full h-full flex flex-col bg-white/90 sm:w-3/4 sm:h-3/4 sm:max-xl:h-full ">
        <div>
          <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
        </div>

        <div className='flex flex-row items-center justify-center mt-12 h-1/2 sm:md:flex-col sm:max-md:hit-fit sm:h-fit md:h-fit'>
          <div className='flex flex-col mt-28 sm:mt-0 sm:pt-0 sm:flex-row items-center justify-center h-[75%] sm:h-full w-full sm:w-3/4 '>
            <div className="img-container h-full flex justify-center bg-sky-400 w-50 max-sm:w-full">
              <img src={data.avatar_url} alt="avatar" className='w-full h-full sm:w-72 sm:object-fixed sm:max-md:w-full'/>
            </div>
      
            <div className="content-container pl-4 pt-4 pb-4 sm:pb-0 text-left w-full  h-fit sm:h-full sm:w-3/6 bg-white border border-solid border-sky-500 sm:max-md:w-full">
              <h1 className='name text-2xl sm:text-4xl text-left'>{data.name}</h1>
              <div className='h-fit text-left mt-4'>
                <p><span>Bio:</span> {ifEmpty(data.bio)}</p>
                <p><span>Number of repositories:</span> {data.public_repos}</p>
                <p><span>Followers:</span> {data.followers}</p>
                <p><span>Following:</span> {data.following}</p>
                <p><span>Location:</span> {ifEmpty(data.location)}</p>
                <p><span>Company:</span> {ifEmpty(data.company)}</p>
              </div>
              <a href={`https://github.com/${data.login}`} target="_blank">
                <button className='bg-sky-500 w-fit p-1 mb-4 gap-2 text-white flex items-center justify-center mt-4'>Visit<FiExternalLink/></button>
              </a>
            </div>              
          </div>
        </div>
      </div>
    ) : (
          <div className="flex w-3/4 h-3/4 flex flex-col bg-white/90">
            <div>
              <Search handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={inputValue => setInputValue(inputValue)}/>
            </div>

            <SkeletonTemplate />
          </div>
    )
  }



}



export default App
