import React from "react";
// material
import { Card, Table, Paper, TableHead, styled, TableRow, TableBody, TableCell, Container, tableCellClasses, TableContainer } from "@mui/material";
// components
import Label from "../components/Label";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const dateFormat = (lunch_date) => {
  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const date = new Date(lunch_date);
  return date.toLocaleDateString("ja-JP", options);
};

function MatchEntryList({ matchEntry }) {
  const DisplayData = matchEntry.map((info, i) => {
    const status = info.partner_mail ? "済" : "未";
    return (
      <TableRow key={i}>
        <StyledTableCell align="center" sx="font-weight: bold;">
          {dateFormat(info.lunch_date)}
        </StyledTableCell>
        <StyledTableCell align="center">{info.partner_name}</StyledTableCell>
        <StyledTableCell align="center">{info.partner_dept}</StyledTableCell>
        <StyledTableCell align="center">
          <Label variant="ghost" color={"success"} color={(status === "済" && "success") || "error"}>
            {status}
          </Label>
        </StyledTableCell>
      </TableRow>
    );
  });

  return (
    <Container sx="margin-bottom: 10%;padding-right: 0px;padding-left: 0px;">
      <Card sx={"margin-top: 5%"}>
        <Table>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">希望日</StyledTableCell>
                  <StyledTableCell align="center">名前</StyledTableCell>
                  <StyledTableCell align="center">部署</StyledTableCell>
                  <StyledTableCell align="center">結果</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{DisplayData}</TableBody>
            </Table>
          </TableContainer>
        </Table>
      </Card>
    </Container>
  );
}
export default MatchEntryList;
