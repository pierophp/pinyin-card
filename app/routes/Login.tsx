import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import getUser from "../helpers/get.user";

const Login = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const user = getUser();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const handleLogin = async () => {
    const username = "YWRtaW4=";
    const password = "QGRtaW4=";

    if (data.username !== atob(username)) {
      console.log("Wrong username");
      return;
    }

    if (data.password !== atob(password)) {
      console.log("Wrong password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "admin",
        admin: true,
      })
    );

    window.location.hash = "/";
  };

  return (
    <div className="p-3">
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Login:
        </Typography>
        <div>{user.username && `Logged as ${user.username}`}</div>
        <div>
          <FormControl className="w-64">
            <TextField
              name="username"
              label="Username"
              autoComplete="off"
              onChange={handleChange}
              value={data.username}
            />

            <TextField
              name="password"
              label="Password"
              autoComplete="off"
              onChange={handleChange}
              value={data.password}
              type="password"
            />
          </FormControl>
        </div>

        <div>
          <br />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Dados gravados com sucesso!"
      ></Snackbar>
    </div>
  );
};

export default Login;
