const Search = ({ searchTerm, setSearchTerm }) => {

    return (
        <div className='flex items-center py-4 px-6 w-[80%] gap-4 mt-8 bg-light-100/8 rounded-xl text-white'>
            <img src='../assets/search.png' alt="" className="w-[20px] h-[20px]" />
            <input className="appearance-none outline-none w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="Search through 30k+ movies online"/>
            
        </div>
    )
}

export default Search