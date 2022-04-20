import React, { Component } from 'react';
import axios from 'axios';
import meme from "../../assets/images/transparent-meme-sized.png"
import './InstantMeme.scss';
import background from "../../assets/images/meme-background-sized.jpg";
import Header from '../Header/Header';
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
        this.setState({
            meme: meme,
        });

    }

    getInstantMeme = (top, bottom, meme, fontSize = '20', font = 'Impact') => {
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
        const selected = this.randomNumber(this.state.defaultMemes.length);

        this.getInstantMeme(top, bottom, this.state.defaultMemes[selected]);
    }

    reset = e => {
        e.preventDefault();
        console.log(e.target);
        // e.target.reset();
    }

    render() {
        if (!this.state.defaultMemes) {
            this.getImages();
            return;
        }

        return (
            <>
            <Header />
                <div className="instant">
                    <img className="instant__background" src={background} />
                    <div className="instant__container">
                        <form className="instant__form" onSubmit={this.handleForm}>
                            <label>
                                <p>Top Text</p>
                                <input className="instant__input" type="text" name="topText"></input>
                            </label>
                            <label>
                                <p>Bottom Text</p>
                                <input className='instant__input' type="text" name="bottomText"></input>
                            </label>
                            <button className="instant__meme-button">InstantMeme</button>             

                        </form>
                        <img className="instant__meme" src={this.state.meme} />

                    </div>
                </div>
            </>
        )
    }
}

export default InstantMeme