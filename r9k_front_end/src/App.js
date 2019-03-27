import React, { Component } from 'react';
import { fetchData } from './util/Utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = { sentence: this.state.text };
    fetchData(
      "http://localhost:5000/insert_sentence",
      "PUT",
      data
    ).then((response) => {
      console.log(response)
    });
  };

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
        <div>
          <textarea
            className="outputTextarea"
            readOnly
            rows="10"
            value="Welcome to r9k-chat.">
          </textarea>
        </div>
        <form>
          <textarea
            className="inputTextarea"
            rows="2"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}>

          </textarea>
          <div>
            <input type="submit" onClick={e => this.handleSubmit(e)} ></input>
          </div>
        </form>

      </div>
    );
  }
}

export default App;
