import React, { Component } from "react";
import image from '../images/react-js.svg';
import styles from './App.module.css';


export default class App extends Component {
  render() {
    return <div >
      <div className={styles.main}>
        <h2>  Welcome to React Boilerplate App </h2>
      
        <img  src={image} alt="Logo" className={styles.img}></img>
        </div>
      
       </div>;
  }
}
