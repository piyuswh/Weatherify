import React,{useState,useEffect} from 'react'
import '../Stylesheets/Main.css'
import cloudyVideo from '../videos/cloudy.mp4';
import clear from '../videos/clear.mp4'
import rain from '../videos/rain.mp4'
import clouds from '../videos/clouds.mp4'
import img from '../Images/cloud.png'
import rains from '../Images/rain.png'
import sun from '../Images/sun.png'
import badal from '../Images/clouds.png'
let now=new Date()
export default function Main(props) {
  function getBackground(weatherMain) {
    switch (weatherMain) {
      case "Clear":
        return clear;
      case "Clouds":
        return clouds;
      case "Rain":
      case "Drizzle":
        return rain;
      default:
        return null;
    }
  }
  function getImg(weatherMain) {
    switch (weatherMain) {
      case "Clear":
        return sun;
      case "Clouds":
        return badal;
      case "Rain":
      case "Drizzle":
        return rains;
      default:
        return null;
    }
  }






    
    const { week, weather1 } = props
    const[time,setTime]=useState()
    const[date,setDate]=useState()

    console.log(week, weather1);

  useEffect(() => {
    if (weather1?.timezone !== undefined) {

      const time=new Date().toLocaleDateString()
      setDate(time)
      
      const localDate = new Date();
      const utcTime = localDate.getTime() + localDate.getTimezoneOffset() * 60000;

      const cityTime = new Date(utcTime + weather1.timezone * 1000);

    
      setTime(cityTime.toLocaleTimeString("en-IN", {
        hour12: true
      }));
    }
  }, [weather1]);



    return (
        <>
            <div id='body'>
<video className="video"   src={getBackground(weather1?.weather?.[0]?.main) || ""} autoPlay muted loop/>

                <div id='container'>

                    <div id='main'>
                       
                            <div id="city">
                            <div id='weather'>
                                <img  src={getImg(weather1?.weather?.[0]?.main) || ""} height={`80%`}alt="" />
                                </div>
                                <h1>City:{weather1.name?`           ${weather1.name}`:"N/A"}</h1>
                                <h1>Date:{`    ${date}`}</h1>
                                <h1>Time:{`    ${time}`}</h1>
                            </div>
                        <div id="info">
                            <h1 id='temp'>
                                Weather: {weather1.weather?.[0]?.main ? `    ${weather1.weather[0].main}` : 'N/A'}
                            </h1><br />
                            <h1>Temperature: {weather1.main?.temp ? `    ${(weather1.main.temp - 273.15).toFixed(2)}°C` : "Loading..."}</h1>
                            <h1>Humidity:{weather1.main?.humidity ? `    ${weather1.main.humidity}%` : "Loading"}</h1>
                            <h1>Wind Speed:{weather1.wind?.speed ? `   ${weather1.wind.speed}` : 'N/a'}</h1>
<h1 id="desc">
  Description: {weather1.weather?.[0]?.description   ? `${weather1.weather[0].description.charAt(0).toUpperCase()}${weather1.weather[0].description.slice(1)}`    : 'N/A'}
</h1>
                            <h1>Visibility:{weather1.visibility?`${weather1.visibility}`:'n/a'}</h1>
                            
                        </div>

                    </div><br />
                    <div id='main1'>
                        {week.daily?.time?.map((date, index) => (
                            <div key={index} className="item">
                                <h2>{date}</h2>
                                <h3>Max: {week.daily.temperature_2m_max[index]}°C</h3>
                                <h3>Min: {week.daily.temperature_2m_min[index]}°C</h3>
                            </div>
                        ))}




                    </div>
                </div>
                        
            </div>
        </>
    )
}