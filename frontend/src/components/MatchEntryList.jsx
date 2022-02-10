import React from 'react'
function MatchEntryList({matchEntry}){
	const DisplayData=matchEntry.map(
		(info, i)=>{
		
			return(
				<tr key={i}>
					<td>{info.lunch_date}</td>
					<td>{info.partner_name}</td>
					<td>{info.partner_dept}</td>
				</tr>
			)
		}
	)

	return(
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
					<th>希望日</th>
					<th>名前</th>
					<th>部署</th>
					</tr>
				</thead>
				<tbody>
				
					
					{DisplayData}
					
				</tbody>
			</table>
			
		</div>
	)
}

export default MatchEntryList;
