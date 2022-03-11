import React, { Component } from 'react';
import axios from 'axios';
import meme from "../../assets/images/meme.jpg"
import './InstantMeme.scss';

export class InstantMeme extends Component {

    state = {
        meme: meme,
        defaultMemes: JSON.parse(localStorage.getItem('defaultMemes')) || null
    }

    randomNumber = max => {
        return Math.floor(Math.random() * max);
    }

    setMeme = (meme) => {
        this.setState ({
            meme: meme,
        });
        
    }

    getInstantMeme = (top, bottom, meme, fontSize = '40', font = 'Impact') => {
        const request = {
            url: 'http://localhost:8080/meme',
            method: 'post',
            data: {
                top: top,
                bottom: bottom,
                meme: meme,
                fontSize: fontSize,
                font: font,
            }
        }

        axios(request)
        .then (response => {
            console.log (response.data);
            this.setMeme(response.data.url);
        })
        .catch (error => {

        })
    }
    
    handleForm = (e) => {
      e.preventDefault();
      const top = e.target.topText.value;
      const bottom = e.target.bottomText.value;
      const selected = this.randomNumber(this.state.defaultMemes.length);

      this.getInstantMeme(top, bottom, this.state.defaultMemes[selected]);
    }

  render() {
      if (!this.state.defaultMemes) {
          this.getImages();
          return;
      }

    return (
      <div>
          <p>{this.state.defaultMemes.length}</p>
          <form onSubmit={this.handleForm}>
              <label>
                  <p>Top Text</p>
                  <input type="text" name="topText"></input>
              </label>
              <label>
                  <p>Bottom Text</p>
                  <input type="text" name="bottomText"></input>
              </label>
              <button>InstantMeme</button>
          </form>
          <img src={this.state.meme}/>
      </div>
    )
  }
}

export default InstantMeme