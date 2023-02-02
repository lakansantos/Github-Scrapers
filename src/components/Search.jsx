
const Search = ({handleSubmit, inputValue, setInputValue}) => {
    return(
        <div className="mt-10 flex flex-col items-center">
            <h1 className="text-5xl font-bold text-sky-400">GitHub Users Scraper</h1>
            <form onSubmit={handleSubmit} className='mt-5 w-1/2 '>
                <div>
                    <input type="text" placeholder="Search a user" value={inputValue} onChange={e => setInputValue(e.target.value)} 
                    className="border-solid border-2 border-gray w-1/2 p-1 focus:outline-sky-400 p-1"/>
                    <button type="submit" className='bg-sky-400 p-1.5 text-white ml-0.5'>Search</button>
                </div>
        </form>
        </div>
    )
}


export default Search