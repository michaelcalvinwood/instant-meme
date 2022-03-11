import React, { Component } from 'react';
import './MenuScreen.scss';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

export class MenuScreen extends Component {

  render() {
    return (
      <>
        <Header />
        <section className='menu'>
            <div className="menu__button-container">
              <Link to="/instant-meme">
                  <button className="menu__button" >InstantMeme</button>
              </Link>
              <Link to="/jokeme">
                  <button className="menu__button" >Jokeme</button>
              </Link>
              <Link to="custom-meme">
                  <button className="menu__button" >Custom Meme</button>
              </Link>
            </div>
            

        </section>
        </>
    )
  }
}

export default MenuScreen