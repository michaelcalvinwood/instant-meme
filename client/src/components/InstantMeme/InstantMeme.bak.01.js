import React, { Component } from 'react';
import axios from 'axios';
import './InstantMeme.scss';
import meme from "../../assets/images/meme.jpg"

export class InstantMeme extends Component {

    state = {
        meme: meme,
        defaultMemes: JSON.parse(localStorage.getItem('defaultMemes')) || null
    }

  getImages = () => {
    let request = 
    {
        method: 'GET',
        url: 'https://ronreiter-meme-generator.p.rapidapi.com/images',
        headers: {
            'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
            'x-rapidapi-key': 'f24c60d820mshb2979420e7a5ac6p149b10jsn4470f1c4ff42'
        }
    };

    axios.request(request)
    .then(function (response) {
        localStorage.setItem('defaultMemes', JSON.stringify(response.data));
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
    }

    randomNumber = max => {
        return Math.floor(Math.random() * max);
    }

    setMeme = (meme) => {
        this.setState ({
            meme: meme,
        });
        
    }

    getInstantMeme = (top, bottom, meme) => {
        console.log("ok", this);

       
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