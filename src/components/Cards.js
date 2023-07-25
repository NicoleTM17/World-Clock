

// CSS:
import '../styles/Cards.css';

function Cards() {

  return(
    <div className='cards-wrapper'>

      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>Los Angeles</div>
          <div className='time-diff'>-10 hrs behind</div>
        </span>

        <div className='time'>6:32</div>

      </div>

      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>Sydney</div>
          <div className='time-diff'>+12 hrs ahead</div>
        </span>

        <div className='time'>12:32</div>

      </div>


      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>Tokyo</div>
          <div className='time-diff'>+9 hrs ahead</div>
        </span>

        <div className='time'>9:32</div>

      </div>


    </div>
  );
};

export default Cards;
