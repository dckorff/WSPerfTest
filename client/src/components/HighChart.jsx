import React from 'react';
import Highcharts from 'highcharts/highstock';

export default class HighChart extends React.Component{

	componentDidMount() {

		let series = [];

		let data = [];
		for(let i = 0; i < 100; i++){
			data.push([(new Date()).getTime()+i, 1]);
		}

		for(let iData in this.props.data){
			series.push({
				name: iData,
				data: data
			})
		}

		Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

		this.chart = Highcharts.stockChart(
			this.refs.chart, 
			{
        title: {
          text: ''
        },
        rangeSelector: {
            // buttons: [{
            //     count: 1,
            //     type: 'minute',
            //     text: '1M'
            // }, {
            //     count: 5,
            //     type: 'minute',
            //     text: '5M'
            // }, {
            //     type: 'all',
            //     text: 'All'
            // }],
            inputEnabled: false,
            selected: 0
        },
        // yAxis: {        
        //     plotLines: [{
        //         value: 0,
        //         width: 1,
        //         color: '#808080'
        //     }]
        // },        
        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'middle',
        //     borderWidth: 0
        // },
        series
      }
		);

		// var me = this;
		// setInterval(
		// 	function(){
		// 		for(let iData in me.props.data){

		// 			let thisSeries = false;
					
		// 			me.chart.series.forEach(series => {if(series.name == iData){thisSeries = series}});
		// 			console.log('thisSeries');
		// 			console.log(thisSeries);
		// 			console.log(me.props.data[iData]);
		// 			if(!thisSeries){return;}
		// 			thisSeries.addPoint(
		// 				[(new Date()).getTime(), me.props.data[iData]] || 0, true, true
		// 			);
					
		// 		}
		// 	},
		// 	100
		// );

	}

	componentWillReceiveProps(nextProps) {
		// console.log("componentWillReceiveProps")
		// console.log(nextProps);
		for(let iData in nextProps.data){

			let thisSeries = false;
			
			this.chart.series.forEach(series => {if(series.name == iData){thisSeries = series}});
			// console.log('thisSeries');
			// console.log(thisSeries);
			// console.log(nextProps.data[iData]);
			thisSeries.addPoint(
				[(new Date()).getTime(), nextProps.data[iData]] || 0, true, true
			);
			
		}		
	}

	render() {
		return (
			<span ref="chart"></span>
		);
	}

}