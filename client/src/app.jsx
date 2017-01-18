import React from 'react';
import {render} from 'react-dom';

import Connection from './connection.js';
import RoundTrip from './components/RoundTrip.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.connection = new Connection();
	}

  render () {
    return (
			<div>

				<RoundTrip connection={this.connection} />

			</div>
		);
  }
}

render(<App/>, document.getElementById('app'));