import { useEffect, useState } from 'react';

// CSS:
import '../styles/Cards.css';

function Cards() {
  // fetch specific location, time, and time difference with current location
  // utc offset, timezone, time
  // https://worldtimeapi.org/api/timezone/America/Los_Angeles
  // https://worldtimeapi.org/api/timezone/Australia/Sydney
  // https://worldtimeapi.org/api/timezone/Asia/Tokyo
  // .replace('_', '')

  const fetchCityData = async (timezone) => {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('A problem occured whilst trying to fetch from worldtimeapi:', error);
      return null;
    }
  };

  const [losAngeles, setLosAngeles] = useState({
    city: 'Los Angeles',
    time: '',
    timeDifference: '' ,
  });

  let laDifference = '';

  if (losAngeles.timeDifference.includes('-')) {
    laDifference = "behind";
  } else if (losAngeles.timeDifference.includes('+')) {
    laDifference = "ahead";
  } else {
    laDifference = "";
  };


  const [Sydney, setSydney] = useState({
    city: 'Sydney',
    time: '',
    timeDifference: '' ,
  });

  let sydDifference = '';

  if (Sydney.timeDifference.includes('-')) {
    sydDifference = "behind";
  } else if (Sydney.timeDifference.includes('+')) {
    sydDifference = "ahead";
  } else {
    sydDifference = "";
  };

  const [Tokyo, setTokyo] = useState({
    city: 'Tokyo',
    time: '',
    timeDifference: '' ,
  });

  let tokDifference = '';

  if (Tokyo.timeDifference.includes('-')) {
    tokDifference = "behind";
  } else if (Tokyo.timeDifference.includes('+')) {
    tokDifference = "ahead";
  } else {
    tokDifference = "";
  };



  useEffect(() => {
    const fetchCityTime = async () => {

      const formatTime = (datetime, utc_offset, timezone) => {
        const date = new Date(datetime);

        // Check if the utc_offset is valid and not undefined
        if (!utc_offset || typeof utc_offset !== 'string') {
          return 'Invalid UTC offset';
        }

        // Parse the datetime and apply the utc_offset to get the correct local time
        const localTime = new Date(date.getTime() - (parseInt(utc_offset) * 1000));

        // Get the formatted time based on the timezone without AM/PM
        const timeOptions = { hour: '2-digit', minute: '2-digit', timeZone: timezone, hour12: false };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(localTime);

        return formattedTime;
      };

      // LOS ANGELES
      const losAngelesData = await fetchCityData('America/Los_Angeles');
      if (losAngelesData) {
        setLosAngeles({
          city: 'Los Angeles',
          time: formatTime(losAngelesData.datetime, losAngelesData.utc_offset, 'America/Los_Angeles'),
          timeDifference: losAngelesData.utc_offset,
        });
      }


      // SYDNEY
      const sydneyData = await fetchCityData('Australia/Sydney');
      if (sydneyData) {
        setSydney({
          city: 'Sydney',
          time: formatTime(sydneyData.datetime, sydneyData.utc_offset, 'Australia/Sydney'),
          timeDifference: sydneyData.utc_offset,
        });
      }


      // TOKYO
      const tokyoData = await fetchCityData('Asia/Tokyo');
      if (tokyoData) {
        setTokyo({
          city: 'Tokyo',
          time: formatTime(tokyoData.datetime, tokyoData.utc_offset, 'Asia/Tokyo'),
          timeDifference: tokyoData.utc_offset,
        });
      }
    };

    fetchCityTime();
    // Refresh the data every minute
    const interval = setInterval(fetchCityTime, 60000);

    return() => {
      clearInterval(interval);
    };
  },[]);





  return(
    <div className='cards-wrapper'>

      <div className='clock-card'>

      <span className='col-wrap'>
        <div className='location'>{losAngeles.city}</div>
        <div className='time-diff'>{losAngeles.timeDifference} {laDifference}</div>
      </span>

      <div className='time'>{losAngeles.time}</div>

      </div>

      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>{Sydney.city}</div>
          <div className='time-diff'>{Sydney.timeDifference} {sydDifference}</div>
        </span>

        <div className='time'>{Sydney.time}</div>

      </div>


      <div className='clock-card'>

        <span className='col-wrap'>
          <div className='location'>{Tokyo.city}</div>
          <div className='time-diff'>{Tokyo.timeDifference} {tokDifference}</div>
        </span>

        <div className='time'>{Tokyo.time}</div>

      </div>


    </div>
  );
};

export default Cards;
