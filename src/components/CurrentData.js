//useState allows you to apply React state to function components
//useEffect allows you to perform side effects like data fetching
import { useEffect, useState } from 'react';



// CSS:
import '../styles/CurrentData.css';

function CurrentData() {

  const today = new Date();
  const currentDay = today.getDay();

  let day;

  switch (currentDay) {
    case 0:
      day = 'Sun';
      break;
    case 1:
      day = 'Mon';
      break;
    case 2:
      day = 'Tues';
      break;
    case 3:
      day = 'Weds';
      break;
    case 4:
      day = 'Thurs';
      break;
    case 5:
      day = 'Fri';
      break;
    case 6:
      day = 'Sat';
      break;
    case 7:
      day = 'Sun';
      break;
    default:
      day = '';
  };



  // Fetch current date, time, and location

  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {

      fetch('http://worldtimeapi.org/api/ip')
      .then(response => response.json())
      .then(data => {
        const { timezone, datetime } = data;

        // Location
        const locationName = timezone.split('/')[1];
        setLocation(locationName);

        // Date and time
        const DateTime = new Date(datetime);
        const currentTime = DateTime.toLocaleTimeString("it-IT");
        const currentDate = DateTime.toLocaleDateString("en-GB");
        setTime(currentTime);
        setDate(currentDate);


      })
      .catch(error => {
        console.error('A problem occured whilst trying to fetch from worldtimeapi', error);
      });
    }, 1000);

    return() => {
      clearInterval(interval);
    };
  }, []);




  return(
    <div className="current-data">
      <h1 className="current-time">{time}</h1>
      <h1 className="current-location">{location}</h1>
      <h2 className="current-date">{day} {date}</h2>
    </div>
  );
};

export default CurrentData;
