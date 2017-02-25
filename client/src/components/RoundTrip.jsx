import React from 'react';

//import Chart from './Chart.jsx';
import HighChart from './HighChart.jsx';
//import Plotly from './Plotly.jsx';
import TimeTable from './TimeTable.jsx';
import DataTable from './DataTable.jsx';

export default class RoundTrip extends React.Component {

	constructor(props) {
		
		super(props);
		
		this.state = {
				textInterval: 100, 
				interval: 100,
				messages: [],
				messagesSize: 10,
				clientSendTimeAvg: 0,
				serverSendTimeAvg: 0,
				clientRecievedTimeAvg: 0,
				tableDimension: 10,
				tableDigits: 1,
				currentMessage: {data: []},
				points: [],
				svgPoints: ''
			};
		
		this._intervalId = false;

	}

	componentDidMount() {
		this.props.connection.socket.on("ROUND_TRIP_TO_CLIENT", (message) => this.messageRecieved.call(this, message));
	}

	messageRecieved(message){

		// console.log("message");
		// console.log(message);
		
		message.clientSendTime = Date.parse(message.clientSendTime);
		message.serverSendTime = Date.parse(message.serverSendTime);
		message.clientRecievedTime = new Date().getTime();

		let messages = this.state.messages;

		if(messages.length < this.state.messagesSize){
			messages.push(message);	
		}
		else{
			messages.shift();
			messages.push(message);
		}

		let clientToServerSum = 0;
		let serverToClientSum = 0;
		let clientToClientSum = 0;
		
		messages.forEach(message => {
			
			message.clientToServer = message.serverSendTime - message.clientSendTime;
			clientToServerSum += message.clientToServer;

			message.serverToClient = message.clientRecievedTime - message.serverSendTime;
			serverToClientSum += message.serverToClient;

			message.clientToClient = message.clientRecievedTime - message.clientSendTime;
			clientToClientSum += message.clientToClient;
		});

		let clientToServerAvg = clientToServerSum / messages.length;
		let serverToClientAvg = serverToClientSum / messages.length;
		let clientToClientAvg = clientToClientSum / messages.length;


		// points.x.shift();
		// points.y.shift();

		// points.x.push(1);
		// points.y.push(clientToClientAvg);

		// let strPoints = points.x.reduce( (x, cur='') => { cur+=  }) 
		// points.shift();
		// points.push({})
		let points = this.state.points;

		if (points.length >= 100){
			points.shift();
		}
		points.push(clientToClientAvg)

		// let svgPoints = points.reduce( (point, curr='', index) => { 
		// 	console.log("-----------")
		// 	console.log(curr)
		// 	console.log(index)
		// 	console.log(point)
		// 	console.log(`${index},${point} `)
		// 	return curr ? `${index},${point}` :  
		// } )

		let svgPoints = '';
		points.forEach( (point, index) => {
			svgPoints += `${index*5},${point*10} `;
		});

		//console.log(svgPoints);

		this.setState(
			{
				currentMessage: message,
				messages,
				clientToServerAvg,
				serverToClientAvg,
				clientToClientAvg,
				points,
				svgPoints
			}
		);
		
	}



	// componentWillUpdate(nextProps, nextState) {

	// }

	// onChangeInterval(event){
	// 	this.setState({textInterval: event.target.value});
	// }

	onClickApplyInterval(){
		
		let interval = parseInt(this.state.textInterval);

		this.setState({interval});
		
		clearInterval(this._intervalId);
		
		let me = this;

		//this.data = this.initData();

		this._intervalId = setInterval(
				()=>{
					//console.log("do something!")

					let message = {
						//data: me.data,
						data: me.initData(),
						clientSendTime: new Date(),
						connectionId: me.props.connection.socket.id
					}

					me.props.connection.socket.emit("ROUND_TRIP_TO_SERVER", message);

				},
				interval
			);
	}

	updateData(){

	}

	initData(){

		let size = this.state.tableDimension;

		let data = [];
		
		for(let iRow = 0; iRow < size; iRow++){
			let row = [];
			for(let iColumn = 0; iColumn < size; iColumn++){			
				row.push( Math.floor(Math.random() * Math.pow(10, this.state.tableDigits) ));
				//row.push( Math.random() )
			}
			data.push(row);
		}

		return data;

	}

	onClickStop(){
		clearInterval(this._intervalId);
	}

	render(){
		return (
			<div>
				RoundTrip
				<div>
					<label>Interval (ms)</label><input type="text" value={this.state.textInterval} onChange={event => this.setState({textInterval: event.target.value})} />
					<button onClick={this.onClickApplyInterval.bind(this)}>Apply Interval</button>
					<button onClick={this.onClickStop.bind(this)}>Stop</button>
				</div>
				<div>
					<label>Table Dimentions:</label> <input type="text" value={this.state.tableDimension} onChange={event => this.setState({tableDimension: event.target.value})} />
				</div>
				<div>
					<label>Table Digits</label> <input type="text" value={this.state.tableDigits} onChange={event => this.setState({tableDigits: event.target.value})} />
				</div>
				<div>
					<table>
						<tbody>
							<tr><td>Client To Server Average</td><td>{this.state.clientToServerAvg}</td></tr>
							<tr><td>Server To Client Average</td><td>{this.state.serverToClientAvg}</td></tr>
							<tr><td>Client To Client (round trip) Average</td><td>{this.state.clientToClientAvg}</td></tr>
						</tbody>
					</table>
					<div style={{display:'inline-block', verticalAlign: 'top'}}>
						
						<TimeTable messages={this.state.messages} />

						<DataTable currentMessage={this.state.currentMessage} />
						
					</div>
					<div style={{display:'inline-block'}}>
						{/*
						<Chart data={ {clientToServerAvg: this.state.clientToServerAvg} } />
						<HighChart data={ {clientToServerAvg: this.state.clientToServerAvg} } />
						<PlotlyChart data={ {clientToServerAvg: this.state.clientToServerAvg} } />
						*/}

						<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
							<polyline fill="none" stroke="black" points={this.state.svgPoints}/>
						</svg>
						
					</div>
				</div>
			</div>
		);
	}


}