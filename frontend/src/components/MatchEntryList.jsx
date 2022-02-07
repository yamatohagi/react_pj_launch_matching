import React from 'react'
function MatchEntryList({matchEntry}){
	const DisplayData=matchEntry.map(
		(info, i)=>{
			return(
				<tr key={i}>
					<td>{info.id}</td>
					<td>{info.expected_date}</td>
					<td>{info.partner_member_id}</td>
				</tr>
			)
		}
	)

	return(
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
					<th>Id</th>
					<th>希望日</th>
					<th>相手ID</th>
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
