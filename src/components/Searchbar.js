
// CSS:
import '../styles/Searchbar.css';

function Searchbar() {

  return(
    <div className='searchbar'>

      <form className='search-bar'>
        <input
          className='search'
          type='text'
          placeholder='Enter a city...'
        />
        <button
        className='submit-btn'
        type='submit'
        >Search
        </button>
      </form>
      <p className='results'>No results.</p>
    </div>
  );
}


export default Searchbar;
