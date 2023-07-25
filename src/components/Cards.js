import { useEffect, useState } from 'react';

// CSS:
import '../styles/Cards.css';

function Cards() {
  // fetch specific location, time, and time difference with current location
  // utc offset, timezone, time
  // https://worldtimeapi.org/api/timezone/America/Los_Angeles
  // https://worldtimeapi.org/api/timezone/Australia/Sydney
  // https://worldtimeapi.org/api/timezone/Asia/Tokyo

  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [timeDifference, setTimeDifference] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {

      let cities = ['America/Los_Angeles', 'Australia/Sydney', 'Asia/Tokyo'];
      // let result = cities.replace("_", " ");
      fetch('https://worldtimeapi.org/api/timezone/${city}')




    }, 1000);

    return() => {
      clearInterval(interval);
    };
  },[]);





  return(
    <div className='cards-wrapper'>

      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>{cities.replace('_', '')}</div>
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
