import React from 'react';

export default class Dataable extends React.Component {

	render(){
		return (
			<table className="table-condensed">				
				<tbody>
					{this.props.currentMessage.data.map( (row, iRow) => { 
						return (
							<tr key={iRow}>
								{
									row.map( (column, iCol) => {return (<td key={iCol}>{column}</td>)}
										)
								}
							</tr>
						)}
					)}
				</tbody>
			</table>
		);
	}

}