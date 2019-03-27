import React, { Component } from 'react';
import { fetchData } from './util/Utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  fetchAllUsedWords = async () => {
    const used_words = await fetchData(
      "http://localhost:5000/used_words",
      'GET'
    ).then((data) => {
      const text = data.text
      this.setState({ used_words: text })
      console.log(data);
    });
  };

  async componentDidMount() {
    this.fetchAllUsedWords();
  }


  render() {
    return (
      <div className="App">
        {this.state.used_words &&
          <div>
            <p>used_words:</p>
            <p>{this.state.used_words}</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
