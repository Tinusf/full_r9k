import React, { Component } from 'react';
import { fetchData } from './util/Utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      chatLogs: "Welcome to r9k-chat."
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = { sentence: this.state.text };
    fetchData(
      "http://flask.tinusf.com/insert_sentence",
      "PUT",
      data
    ).then((response) => {
      this.componentDidMount();
      this.setState({ status: response.text })
      console.log(response);
    });
  };

  fetchAllUsedWords = async () => {
    const used_words = await fetchData(
      "http://flask.tinusf.com/used_words",
      'GET'
    ).then((data) => {
      const text = data.text
      this.setState({ used_words: text })
    });
  };

  fetchChatLog = async () => {
    const used_words = await fetchData(
      "http://flask.tinusf.com/chat_logs",
      'GET'
    ).then((data) => {
      const logs = data.text
      this.setState({ chatLogs: logs })
    });
  };

  async componentDidMount() {
    this.fetchAllUsedWords();
    this.fetchChatLog();
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
            value={this.state.chatLogs}>
          </textarea>
        </div>
        <form>
          <textarea
            className="inputTextarea"
            rows="2"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}>

          </textarea>
          <p>
            {this.state.status}
          </p>
          <div>
            <input type="submit" onClick={e => this.handleSubmit(e)} ></input>
          </div>
        </form>

      </div>
    );
  }
}

export default App;
