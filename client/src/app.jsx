import React from 'react';
import {render} from 'react-dom';

import Connection from './connection.js';
import MessagesList from './components/MessagesList.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: '', messages: []}

		this.connection = new Connection();

		this.connection.socket.on('chat message recieved', (message) => {
			console.log('chat message recieved')
			console.log(message);
			let messages = this.state.messages;
			messages.push(message);
			console.log('messages')
			console.log(messages)
			//this.setState({messages: this.state.messages.push(message)}, function(){console.log(this.state.messages)})
			this.setState({messages: messages})
		});

	}

	onChangeText(event){
		this.setState({value: event.target.value});
	}

	clickButton(){
    this.connection.socket.emit('chat message', this.state.value);
    this.setState({value: ''});
	}

  render () {
    return (
			<div>
				<input type="text" value={this.state.value} onChange={this.onChangeText.bind(this)} ></input>
				<button onClick={this.clickButton.bind(this)}>button!</button>

				<MessagesList messages={this.state.messages} />

			</div>
		);
  }
}

render(<App/>, document.getElementById('app'));