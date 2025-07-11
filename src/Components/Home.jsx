import React from 'react'
import '../Stylesheets/Home.css'
import logo from '../Images/weatherify.png'
export default function Home(){
    return(
        <>
        <div id='home'>
            <div id='img'> 
                <img src={logo} alt="" width={"70%"}/> 
                </div>
            <div id="info">'

          <h1>Weatherify is a sleek and modern weather forecasting web app designed to deliver real-time weather updates and 7-day forecasts for any city around the world. 

Simply enter your city, and get instant temperature, weather conditions, and a weekly outlook powered by reliable weather data sources. 
            </h1>              
            </div>





        </div>

        
        </>
    )
}