
const Search = ({handleSubmit, inputValue, setInputValue}) => {
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search a user" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
    )
}


export default Search