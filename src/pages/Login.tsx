import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import getUser from '../helpers/get.user';
import useStyles from './Configuration.css.js';

const Login = () => {
  const classes = useStyles();

  const [data, setData] = React.useState({
    username: '',
    password: '',
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
    const username = 'YWRtaW4=';
    const password = 'QGRtaW4=';

    if (data.username !== atob(username)) {
      return;
    }

    if (data.password !== atob(password)) {
      return;
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        username: 'admin',
        admin: true,
      })
    );

    window.location.hash = '/';
  };

  return (
    <div className={classes.container}>
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Login:
        </Typography>
        <div>{user.username && `Logged as ${user.username}`}</div>
        <div>
          <FormControl className={classes.formControl}>
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
