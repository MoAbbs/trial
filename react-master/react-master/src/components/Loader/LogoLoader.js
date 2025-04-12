import React, { Component } from 'react';

class LogoLoader extends Component {
  render(){
    return(
      <div className="logo-loading">
          <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
          </div>
          <img src={`${process.env.REACT_APP_API_URl}/images/100.png`} alt="logo"/>
      </div>
      );
  }
};
export default LogoLoader;