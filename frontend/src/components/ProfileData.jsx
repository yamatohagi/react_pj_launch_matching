import React from "react";
// material
import { Card, Button, Box, Typography } from "@mui/material";
/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData = ({ member, handleEditButton }) => {
  return member ? (
    <Card sx={"margin-bottom: 20%;margin-top: 6%;padding: 20px 6%;"}>
      <Box sx={{ py: 5 }}>
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" noWrap>
            会員ID　:　 {member.id}
          </Typography>
        </Box>
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" noWrap>
            名前　 :　 {member.name}
          </Typography>
        </Box>
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" noWrap>
            事業部　:　 {member.dept}
          </Typography>
        </Box>
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" noWrap>
            メール　:　 {member.mail}
          </Typography>
        </Box>
        <br />
        <br />
        <Button sx="margin-bottom: 10%;"
        id="submit-button" variant="contained" color="primary" size="large" onClick={handleEditButton()}>
          編集
        </Button>
      </Box>
    </Card>
  ) : null
};
