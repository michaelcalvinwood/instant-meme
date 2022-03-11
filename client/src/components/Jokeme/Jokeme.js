import React, { Component } from 'react';
import './Jokeme.scss';
import axios from 'axios';
import meme from "../../assets/images/transparent-meme-sized.png"
import background from "../../assets/images/meme-background-sized.jpg";
import censoredBanana from "../../assets/images/censored-banana-sized.jpg";
import Header from '../Header/Header';


class Jokeme extends Component {
    constructor() {
        super();
        this.page = 1;
        this.categories = JSON.parse(localStorage.getItem('jokeCategories')) || [];
        if (!this.categories.length) {
            this.interval = setInterval(this.uploadCategories, 500);
        }
        this.nsfwCategories = ['asians', 'sex', 'dirty-jokes', 'latinos'];
    }

    state = {
        meme: meme,
        defaultMemes: JSON.parse(localStorage.getItem('defaultMemes')) || null,
        categories: JSON.parse(localStorage.getItem('jokeCategories')) || null,
        selectedCategory: 'any',
        nsfw: false,
    }

    randomNumber = max => {
        return Math.floor(Math.random() * max);
    }

    setMeme = (meme) => {
        this.setState({
            meme: meme,
        });

    }

    sortedUniqueArray = array => {
        const tmpArray = array.sort();
        let newArray = [];
        let curValue = null;
        for (let i = 0; i < tmpArray.length; ++i) {
            if (tmpArray[i] !== curValue && tmpArray[i] !== 'asians') newArray.push(tmpArray[i]);
            curValue = tmpArray[i];
        }

        return newArray;
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
            .then(response => {
                console.log(response.data);
                this.setMeme(response.data.url);
            })
            .catch(error => {
                console.log(error)
            })
    }

    getCategories(start = 1) {
        const request = {
            url: "https://api.jokes.one/joke/categories/search",
            method: 'get',
            headers: {
                "Accept": "application/json",
                'X-JokesOne-Api-Secret': "enhsxyKbfvDs3NM4GUK7sAeF",
            },
            params: {
                query: "",
                start: start
            }

        }
        axios(request)
            .then(response => {
                const categories = response.data.contents.categories;
                let filteredCategories = [];
                if (categories !== null) {
                    filteredCategories = categories.map(category => category.name);
                    if (filteredCategories !== null) {
                        filteredCategories.forEach(category => {
                            console.log('getCategories category', category);
                            this.categories.push(category);
                        });
                    }
                }
                console.log("categories", this.categories);
            })
            .catch(error => {
                console.log('getCategories error', error);
            });
    }

    handleForm = (e) => {
        e.preventDefault();
        const selectedCategory = e.target.categories.value;


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

                const isNsfw = this.nsfwCategories.find(category => category === selectedCategory);
                if (isNsfw) {
                    this.setState({
                        selectedCategory: selectedCategory,
                        nsfw: true
                    });
                } else {
                    this.setState({
                        selectedCategory: selectedCategory,
                        nsfw: false
                    });
                }

                this.getInstantMeme(top, joke, this.state.defaultMemes[selected], "16");

            })
            .catch(error => {
                console.log(error)
            });

    }

    uploadCategories = () => {
        console.log("uploadCategories", this.page);
        if (this.page < 55) {
            this.getCategories(this.page++);
        } else {
            clearInterval(this.interval);
            this.categories = this.sortedUniqueArray(this.categories);
            localStorage.setItem('jokeCategories', JSON.stringify(this.categories));
            this.setState({
                categories: this.categories,
            })

        }
    }

    turnOffNsfw = () => {
        this.setState({
            nsfw: false
        })
    }

    componentDidMount() {

    }

    render() {
        if (!this.state.defaultMemes) {
            this.getImages();
            return;
        }

        /*
         <select>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          */

        return (
            <>
                <Header />
                <div className="jokeme">
                    <img className="jokeme__background" src={background} />
                    <div className="instant__container">
                        <form className='jokeme__form' onSubmit={this.handleForm}>
                            {/* <label className="switch">
                            <input name="nsfw" type="checkbox" />
                            <span className="slider round"></span>
                        </label> */}
                            <select className='jokeme__select' name='categories'>
                                <option value={"any"}>{"Any"}</option>
                                {
                                    this.state.categories.map((category) => {
                                        return <option value={category}>{category}</option>
                                    })
                                }
                            </select>
                            <button className='jokeme__button'>Jokeme</button>
                        </form>
                        {this.state.nsfw ?
                            <img className="jokeme__meme" src={censoredBanana} onClick={this.turnOffNsfw} /> :
                            <img className="jokeme__meme" src={this.state.meme} />}
                    </div>
                </div>
            </>
        )
    }
}

export default Jokeme