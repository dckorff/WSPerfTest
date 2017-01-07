import React from 'react';

export default class MessagesList extends React.Component{


	render(){
		return (
			<div>
				#{this.props.messages.length}#
				
				{
					this.props.messages.map( message => { return <div>asdf{message.user + ": " + message.message}</div>} )
				}

			</div>
		);
	}
}