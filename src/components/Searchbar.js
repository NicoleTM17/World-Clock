
// CSS:
import '../styles/Searchbar.css';

function Searchbar() {

  function handleClick(event) {
    event.preventDefault();
    console.log('clicked!');
  }

  function handleChange(event) {
    console.log(event.target.value);
  }


  return(
    <div className='searchbar'>

      <form className='search-bar'>
        <input onChange={handleChange}
          className='search'
          type='text'
          placeholder='Enter a city...'
        />
        <button onClick={handleClick}
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
