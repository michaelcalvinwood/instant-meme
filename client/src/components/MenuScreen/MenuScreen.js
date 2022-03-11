import React, { Component } from 'react';
import './MenuScreen.scss'

export class MenuScreen extends Component {

  render() {
    return (
      <section className='menu'>
          <div className="menu__button-container">
            <button className="menu__button" onClick={() => {this.props.switchPage('instantMeme')}}>InstantMeme</button>
            <button className="menu__button" onClick={() => {this.props.switchPage('jokeme')}}>Jokeme</button>
            <button className="menu__button" onClick={() => {this.props.switchPage('customMeme')}}>Custom Meme</button>
          </div>
          

      </section>
    )
  }
}

export default MenuScreen