import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import axios from 'axios';

// https://sunrise-sunset.org/api

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      searchTerm: '',
      weather: [],
      userLat: '',
      userLng: '',
    }
  }

  getSunTimes = ()=> {
    const {userLat, userLng} = this.state;

    if(userLat && userLng) {
      console.log('Suntime call made');
      let d = new Date();
      // let myTimeStamp = d.getTime();
      let offsetHours = d.getTimezoneOffset()/60;
      let url = `https://api.sunrise-sunset.org/json?lat=${String(userLat)}&lng=${String(userLng)}`;
      fetch(url)
        .then(res => {
          if(!res.ok) {
            throw Error('Problem');
          }
          return res.json();
        })
        .then(data => {
          console.log('Sun data: ', data);
          console.log('UTC Sunset Time: ', data.results.sunset);
          let year = new Date().getFullYear();
          let month = new Date().getMonth();
          let day = new Date().getDate();
          //sunset comes back as e.g. "1:49:06 PM"; this splits on : or empty space
          let time = data.results.sunset.split(/:| /); //[1,49,06,PM]
          let hours = time[0];
          let minutes = time[1];
          let secs = time[2];
          // let utcDate = new Date(year,month,day,hours,minutes,secs);
          let localSunTime = new Date(year,month,day,hours - offsetHours,minutes,secs);
          // console.log('UTC date: ', utcDate);
          // console.log('UTC getTime: ', utcDate.getTime());
          console.log('local sunset: ', localSunTime);
          // console.log('UTC - offset: ', data.results.sunset - offsetMins);
          // console.log('2nd offset, in hours: ', (utcDate - myTimeStamp)/360000);
        })
        .catch(err => console.log('Error: ', err));
    }
  }

  // getWeather = () => {
  //   console.log('hit getWeather');
  //   const {searchTerm} = this.state;
  //   let weatherUrl = `https://www.metaweather.com/api/location/search/?query=${searchTerm}`;
  //   // fetch(weatherUrl, {
  //   //   mode: 'cors',
  //   //   type: 'jsonp',
  //   //   headers: {
  //   //     "Access-Control-Allow-Origin":"*",
  //   //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS", 
  //   //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  //   //   },
  //   // })
  //   axios.get(weatherUrl)
  //     .then(res => {
  //       if(!res.ok) {
  //         throw Error('Weather error');
  //       }
  //       console.log('res: ', res);
  //       return res.json();
  //     })
  //     .then(data => console.log('weather data: ', data))
  //     .catch(err => console.log('Error: ', err));
  // }

  componentDidMount() {
    if('geolocation' in navigator) {
      // console.log('exists');
      // navigator.geolocation.getCurrentPosition(position => {
      //   this.setState({userLoc: position});
      // })
      navigator.geolocation.getCurrentPosition(position => {
        // console.log('typeof user lat: ', typeof position.coords.latitude);
        this.setState(()=> ({
            userLat: position.coords.latitude,
            userLng: position.coords.longitude
          }), ()=> {
            this.getSunTimes();
          });
      })    
    }
  }
  

  handleChange = e => {
    // console.log('handleChange evt: ', e);
    // console.log('handleChange evt value: ', e.target.value);
    this.setState({searchTerm: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('Hit submit');
    //make api call
    // let url = `ferer${this.state.searchTerm}`;
    // let data = fetch(url)
    //   .then(res => {
    //     if(!res.ok) {
    //       throw Error('Problem');
    //     }
    //     return res.json();
    //   })
    //   .then(data => console.log('returned data: ', data))
    //   .catch(err => console.log('Err: ', err));

    //add data to state
    //reset searchTerm
    // this.setState({
    //   weather: data,
    //   searchTerm: '',
    // });
    // this.getWeather();
    this.setState({searchTerm: ''});
  }

  render() {
    const {searchTerm} = this.state;
    let userSearch = searchTerm && <p>You searched for {searchTerm}</p>

    return (
     <div>
       <SearchBar 
          searchTerm={searchTerm}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
       />

      {userSearch}

     </div>
    );
  }
}

export default App;
