import React from 'react';
import d3 from 'd3';

export default class Chart extends React.Component{

	componentDidMount() {

		//https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935

		var vis = d3.select("#visualisation"),
	    WIDTH = 1000,
	    HEIGHT = 500,
	    MARGINS = {
	        top: 20,
	        right: 20,
	        bottom: 20,
	        left: 50
	    };
	}

	render() {
		return (
			<span id="visualisation" ref="chart"></span>
		);
	}

}