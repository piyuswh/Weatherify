import React, { useState ,useEffect} from 'react'
import Main from './Main'
import Home from'./Home'
import '../Stylesheets/nav.css'
import logo from '../Images/weatherify.png'


export default function Navbar(){
  function getWeatherClass() {
  if (!weather.weather) return "default";  // fallback

  const condition = weather.weather[0].main.toLowerCase();

  switch (condition) {
    case "clear":
      return "clear";
    case "clouds":
      return "cloudy";
    case "rain":
      return "rainy";
    case "snow":
      return "snowy";
    case "thunderstorm":
      return "stormy";
    case "mist":
    case "fog":
      return "foggy";
    default:
      return "default";
  }
}

      const[weather,setWeather]=useState({})
      const[week,setWeek]=useState({})
      const[city,setCity]=useState('')
      const[city1,setCity1]=useState('')
  let lat=0;
  let lon=0;
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=183e89c3486599bba42be9d4829d7c4e`)
    .then(res=>res.json())
    .then(data=>setWeather(data)
    )
  },[city1])
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city1}&limit=1&appid=183e89c3486599bba42be9d4829d7c4e`)
    .then(res=>res.json())
    .then(data=>{lat=data[0].lat
      lon=data[0].lon  
      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
    })
.then(res=>res.json())
.then(data=>setWeek(data)
)
  },[city1])
  function subHandler(e){
    if(city=="")
      alert("Please Enter a City")
    e.preventDefault()
setCity1(city)
setCity("")

  }
return(
    <>
<div id="nav">
      

        <h1>Weatherify</h1>
        {/* <h1>Welcome To Weatherify</h1> */}
        <div >
          <div id="form">

            <form onSubmit={subHandler}>
              <div id="detail">

            <input type="text" name="" id="" placeholder={"🔎Enter Your City"}onChange={(e)=>setCity(e.target.value)}/>
            <button>Search</button>
              </div>
            </form>
          </div>
        </div>
    
    
    </div>

    {
      weather.cod!='400'&&weather.cod!='404'?<Main week={week} weather1={weather}></Main>:<Home></Home> 
    }
   
    </>
)
}