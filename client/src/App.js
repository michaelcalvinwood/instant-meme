import logo from './logo.svg';
import './App.css';
import InstantMeme from './components/InstantMeme/InstantMeme';
import MenuScreen from './components/MenuScreen/MenuScreen';
import Jokeme from './components/Jokeme/Jokeme';
import CustomMeme from './components/CustomMeme/CustomMeme';
import { Component } from 'react';
import DropzoneComponent from './components/DropZone/DropZone';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    page: 'menuScreen',
  }

  switchPage = (page) => {
    this.setState({
      page: page,
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MenuScreen} />
          <Route path="/instant-meme" component={InstantMeme} />
          <Route path="/jokeme" component={Jokeme} />
          <Route path="/custom-meme" component={CustomMeme} />
        </Switch>
      </BrowserRouter>
    )    
  }
}

export default App;
