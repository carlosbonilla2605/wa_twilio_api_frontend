import React from 'react';
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.send_url =  'http://127.0.0.1:5000/send';
    this.get_msgs_url = 'http://127.0.0.1:5000/getmsgs';
    this.send_msg = [];
    this.sendMessage = this.sendMessage.bind(this)
  }
  componentDidMount(){
    fetch(this.get_msgs_url)
    .then(res => res.json())
    .then((data) => {
        this.setState({ messages: data })
    })
    .catch(console.log)
  }

  sendMessage(input_text){
	this.send_msg = {senderId: "Charlie", text: input_text};
	this.setState(
      {
        messages: [...this.state.messages, this.send_msg]
      })

      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.send_url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(
        this.send_msg
      ));
      xhr.onload = function() {
        var data = JSON.parse(this.responseText);
        console.log(data);
      }

  }

  render (){
    return (
      <div className="app">
        <Title />
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage ={this.sendMessage}/>
      </div>
    )
  }

}

class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <li key={message.id} className="message">
              <div>
                {message.senderId}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          )
        })}
        </ul>
    )
  }
}

class SendMessageForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="send-message-form">
      <input
        onChange = {this.handleChange}
        value={this.state.message}
        placeholder="Type your message and hit ENTER"
        type="text" />
      </form>
    )
  }

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e)
  {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })

  }

}

function Title () {
    return <p class="title">Chat for Whatsapp Business</p>
  }

export default App;
