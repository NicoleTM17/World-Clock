import { useEffect, useState } from 'react';

// CSS:
import '../styles/Cards.css';


function Cards() {
  const fetchCityData = async (timezone) => {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('A problem occurred while trying to fetch from worldtimeapi:', error);
      return null;
    }
  };

  const formatTime = (datetime, utc_offset, timezone) => {
    const date = new Date(datetime);

    // Check if the utc_offset is valid and not undefined
    if (!utc_offset || typeof utc_offset !== 'string') {
      return 'Invalid UTC offset';
    }

    // Parse the datetime and apply the utc_offset to get the correct local time
    const localTime = new Date(date.getTime() - parseInt(utc_offset) * 1000);

    // Get the formatted time based on the timezone without AM/PM
    const timeOptions = { hour: '2-digit', minute: '2-digit', timeZone: timezone, hour12: false };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(localTime);

    return formattedTime;
  };

  const [clockCards, setClockCards] = useState([]);

  useEffect(() => {
    const fetchDefaultCitiesData = async () => {
      const defaultCities = ['America/Los_Angeles', 'Australia/Sydney', 'Asia/Tokyo'];

      const cityDataPromises = defaultCities.map(async (city) => {
        const data = await fetchCityData(city);
        if (data) {
          return {
            city: city.split('/').pop().replace('_', ' '),
            time: formatTime(data.datetime, data.utc_offset, city),
            timeDifference: data.utc_offset,
          };
        }
        return null;
      });

      const cityData = await Promise.all(cityDataPromises);
      setClockCards(cityData.filter((data) => data !== null));
    };

    fetchDefaultCitiesData();

    // Refresh the data every minute
    const interval = setInterval(fetchDefaultCitiesData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='cards-wrapper'>
      {clockCards.map((card, index) => (
        <div className='clock-card' key={index}>
          <span className='col-wrap'>
            <div className='location'>{card.city}</div>
            <div className='time-diff'>
              {card.timeDifference} {card.timeDifference.includes('-') ? 'behind' : 'ahead'}
            </div>
          </span>
          <div className='time'>{card.time}</div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
