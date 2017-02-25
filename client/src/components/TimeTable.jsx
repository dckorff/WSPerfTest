import React from 'react';

export default class TimeTable extends React.Component {

	render(){
		return (
			<table className="table-condensed">
				<thead>
					<tr>
						<th>Client to Server (ms)</th>
						<th>Server to Client (ms)</th>
						<th>Round Trip (ms)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.messages.map( (message, index) => { 
						return (
							<tr key={index} >
								<td>{message.serverSendTime - message.clientSendTime}</td>
								<td>{message.clientRecievedTime - message.serverSendTime}</td>
								<td>{message.clientRecievedTime - message.serverSendTime}</td>													
							</tr> 
						)})
					}
				</tbody>
			</table>
		);
	}

}