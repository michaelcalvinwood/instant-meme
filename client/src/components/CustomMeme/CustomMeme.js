import React, { Component } from 'react';
import axios from 'axios';
// import meme from "../../assets/images/meme.jpg"
import meme from "../../assets/images/transparent-meme-sized.png"
import './CustomMeme.scss';
import background from "../../assets/images/meme-background-sized.jpg";
import imageList from "../../assets/data/imageList.json";
// import star from "../../assets/images/star.svg"
import Header from '../Header/Header';
import starLight from "../../assets/images/star-light.svg"
import starSolid from "../../assets/images/star-solid.svg"

export class customMeme extends Component {

  state = {
    meme: meme,
    defaultMemes: JSON.parse(localStorage.getItem('defaultMemes')) || null,
    imageName: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  }

  randomNumber = max => {
    return Math.floor(Math.random() * max);
  }

  setMeme = (meme) => {
    this.setState({
      meme: meme,
    });

  }

  getcustomMeme = (top, bottom, meme, fontSize = '40', font = 'Impact') => {
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
      .then(response => {
        console.log(response.data);
        this.setMeme(response.data.url);
      })
      .catch(error => {

      })
  }

  handleForm = (e) => {
    e.preventDefault();
    const top = e.target.topText.value;
    const bottom = e.target.bottomText.value;

    if (this.state.imageName === null) return;

    this.getcustomMeme(top, bottom, this.state.imageName);
  }

  selectedTitle = name => {
    console.log('selectedTitle name meme', name, meme);

    if (name === '--') {
      this.setState({
        meme: meme,
        imageName: null
      })
    } else {  
        // this.setState({
        //   meme: `https://mywerld.com/images/` + name + '.jpg',
        //   imageName: name
        // })

        this.setState({
          meme: `${process.env.REACT_APP_BASE_URL}/stock/${name}.jpg`,
          imageName: name
        })
    }
  }

  clickedStar = name => {
    // is it already a favorite?

    const test = this.state.favorites.find(favorite => favorite === name);

    if (test) {
      let favorites = this.state.favorites.filter(favorite => favorite !== name);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.setState({
        favorites: favorites,
      })
    } else {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(name);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.setState({
        favorites: favorites,
      })
    }
  }

  render() {
    if (!this.state.defaultMemes) {
      this.getImages();
      return;
    }


    return (
      <>
        <Header />
        <div className="custom">
          <img className="custom__background" src={background} />
          <div className="custom__container">
            <div className="custom__flex-container">
              <form className="custom__form" onSubmit={this.handleForm}>
                <label>
                  <p className='custom__top-text'>Top Text</p>
                  <input className="custom__input" type="text" name="topText"></input>
                </label>
                <label>
                  <p className='custom__bottom-text'>Bottom Text</p>
                  <input className='custom__input' type="text" name="bottomText"></input>
                </label>
                <select className='custom__select' name="the-favorite" onChange={(e) => {this.selectedTitle(e.target.value)}}>
                  <option value='--'>--</option>
                  {this.state.favorites.map((favorite)=>{
                    return <option value={favorite}>{favorite}</option>
                  })}
                </select>

                <button className="custom__meme-button">CustomMeme</button>
              </form>
              <div className="custom__meme-container">
                <img className="custom__meme" src={this.state.meme} />
              </div>
            </div>
            <div className="custom__image-list">
              {imageList
                .sort()
                .map(imageName => {
                  let test = this.state.favorites.find(favorite => favorite === imageName);
                  let isFavorite = false;
                  if (test) isFavorite = true;
                  let star = {};
                  isFavorite ? 
                    star = starSolid : 
                    star = starLight;
                  return (
                    <div key={imageName} className="custom__image-name" onClick={() => this.selectedTitle(imageName)}>
                      <img className="custom__star" src={star} onClick={() => {this.clickedStar(imageName)}}/>
                      <p className="custom__image-title">{imageName}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default customMeme