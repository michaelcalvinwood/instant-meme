import React, { Component } from 'react';
import './Jokeme.scss';
import axios from 'axios';
import meme from "../../assets/images/meme.jpg"


class Jokeme extends Component {
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
            url: 'http://localhost:8080/jokeme',
            method: 'get',
            params: {
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
      const top = "top";
      const selected = this.randomNumber(this.state.defaultMemes.length);

      const request = {
          url: "https://api.jokes.one/joke/random",
          method: "get",
          headers: {
              "X-JokesOne-Api-Secret": "enhsxyKbfvDs3NM4GUK7sAeF",
              "accept": "application/json",
              "content-type": "application/json"
          }
      }

      axios(request)
      .then(response => {
          const joke = response.data.contents.jokes[0].text;
          this.getInstantMeme(top, joke, this.state.defaultMemes[selected], "16");
      })
      .catch(error => {

      })
    
    }

  render() {
      if (!this.state.defaultMemes) {
          this.getImages();
          return;
      }

    return (
      <div className="jokeme">
          <p>{this.state.defaultMemes.length}</p>
          <form onSubmit={this.handleForm}>
              <label>
                  <p>Top Text</p>
                  <input type="text" name="topText"></input>
              </label>
              <button>InstantMeme</button>
          </form>
          <img className="jokeme__meme" src={this.state.meme}/>
      </div>
    )
  }
}

export default Jokeme