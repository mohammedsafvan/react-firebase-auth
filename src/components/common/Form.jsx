import { React } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import BasicButton from "./Button";

export default function BasicTextField({
  title,
  setPassword,
  setEmail,
  handleAction,
}) {
  return (
    <div>
      <div className="header-container">
        <h3>{title} Form</h3>
      </div>
      <Box
        component={"form"}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          variant="outlined"
          label="Enter the Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          variant="outlined"
          label="Enter the Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <BasicButton title={title} handleAction={handleAction} />
    </div>
  );
}
