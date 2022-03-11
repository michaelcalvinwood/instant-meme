import logo from './logo.svg';
import './App.css';
import InstantMeme from './components/InstantMeme/InstantMeme';
import MenuScreen from './components/MenuScreen/MenuScreen';
import Jokeme from './components/Jokeme/Jokeme';
import CustomMeme from './components/CustomMeme/CustomMeme';
import { Component } from 'react';

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
    switch (this.state.page) {
      case 'menuScreen':
        return (
          <div className="App">
            <MenuScreen switchPage={this.switchPage}/>
          </div>
        );
      case 'instantMeme': {
        return (
          <div className="App">
            <InstantMeme switchPage={this.switchPage}/>
          </div>
        );
      }
      case 'jokeme': {
        return (
          <div className="App">
            <Jokeme switchPage={this.switchPage}/>
          </div>
        );
      }
      case 'customMeme': {
        return (
          <div className="App">
            <CustomMeme switchPage={this.switchPage}/>
          </div>
        );
      }
    }
    
  }
}

export default App;
