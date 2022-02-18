import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function MatchEntryList({ matchEntry }) {
  const DisplayData = matchEntry.map((info, i) => {
    return (

        <StyledTableRow key={i}>
          <StyledTableCell component="th" scope="row">
            {info.lunch_date}
          </StyledTableCell>
          <StyledTableCell align="right">{info.partner_name}</StyledTableCell>
          <StyledTableCell align="right">{info.partner_dept}</StyledTableCell>
        </StyledTableRow>

    );
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>希望日</StyledTableCell>
              <StyledTableCell>名前</StyledTableCell>
              <StyledTableCell>部署</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{DisplayData}</TableBody>
        </Table>
      </TableContainer>
      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th>希望日</th>
            <th>名前</th>
            <th>部署</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table> */}
    </>
  );
}

export default MatchEntryList;
