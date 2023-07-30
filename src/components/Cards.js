import { useEffect, useState } from 'react';

// CSS:
import '../styles/Cards.css';


function Cards( {clockCards: initialClockCards}) {
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

  const [defaultClockCards, setDefaultClockCards] = useState([]);

  useEffect(() => {
    const fetchDefaultCitiesData = async () => {
      const defaultCities = ['America/Los_Angeles', 'Australia/Sydney', 'Asia/Tokyo'];

      const cityDataPromises = defaultCities.map(async (timezone) => {
        const data = await fetchCityData(timezone);
        if (data) {
          return {
            city: timezone.split('/').pop().replace('_', ' '),
            time: formatTime(data.datetime, data.utc_offset, timezone),
            timeDifference: data.utc_offset,
          };
        }
        return null;
      });

      const cityData = await Promise.all(cityDataPromises);
      setDefaultClockCards(cityData.filter((data) => data !== null));
    };

    fetchDefaultCitiesData();

    // Refresh the data every minute
    const interval = setInterval(fetchDefaultCitiesData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // NEW CLOCK CARDS WHEN CITY SEARCHED
  // currently set interval has not been applied

  const [newClockCards, setNewClockCards] = useState(initialClockCards);

  useEffect(() => {
    setNewClockCards(initialClockCards);
  }, [initialClockCards]);


  // Delete event for both default and new cards

  function handleClickDefault(index) {
    setDefaultClockCards(prevCards => {
      // Create a copy of the previous array to avoid direct modification of state
      const updatedCards = [...prevCards];
      // Remove the clock-card at the specified index
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  function handleClickNew(index) {
    setNewClockCards(prevCards => {
      const updatedNewCards = [...prevCards];
      updatedNewCards.splice(index, 1);
      return updatedNewCards;
    });
  };

  return (
    <div className='cards-wrapper'>

    {defaultClockCards.map((card, index) => (
      <div className='clock-card' key={index}>

        <span className='col-wrap'>
          <div className='location'>{card.city}</div>
          <div className='time-diff'>
            {card.timeDifference} UTC {card.timeDifference.includes('-') ? 'behind' : 'ahead'}
          </div>
        </span>
        <div onClick={() => handleClickDefault(index)} className='delete'>X</div>
        <div className='time'>{card.time}</div>
      </div>
    ))}

    {newClockCards.map((card, index) => (
      <div className='clock-card' key={index}>
        <span className='col-wrap'>
          <div className='location'>{card.city}</div>
          <div className='time-diff'>
            {card.timeDifference} UTC {card.timeDifference.includes('-') ? 'behind' : 'ahead'}
          </div>
        </span>
        <div onClick={() => handleClickNew(index)} className='delete'>X</div>
        <div className='time'>{card.time}</div>
      </div>
    ))}
  </div>
  );
}

export default Cards;
