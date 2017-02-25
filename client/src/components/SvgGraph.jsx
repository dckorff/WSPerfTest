import React from 'react';

export default class SvgGraph extends React.Component {

	render(){
		return (
			<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
				<polyline fill="none" stroke="black" points={this.props.svgPoints}/>
			</svg>
		);
	}

}