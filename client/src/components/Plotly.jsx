var Plotly = require('plotly.js');

export default class PlotlyChart extends React.Component{

	constructor(props) {
		super(props);
		this.y = 1;
		this.state = { data: [] }
	}

	componentDidMount() {

		this.poltly = new Plotly(this.refs.chart, this.state.data);

	}

	componentWillReceiveProps(nextProps) {
		let newData = this.state.data;

		newData.x.push( nextProps.clientToServerAvg );
		newData.y.push( this.y++ );

		this.setState({ data: newData });
	}

	render(){
		return (<div ref="chart"></div>)
	}

}