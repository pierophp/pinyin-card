import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import getConfiguration from '../helpers/get.configuration';
import getLanguages from '../helpers/get.languages';
import useStyles from './Configuration.css.js';
import Snackbar from '@material-ui/core/Snackbar';

const languages = getLanguages();

const Configuration = props => {
  const classes = useStyles();

  const [data, setData] = React.useState(getConfiguration());

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const save = async () => {
    const parsedConfiguration = JSON.stringify(data);

    localStorage.setItem('configuration', parsedConfiguration);

    if (localStorage.getItem('configuration') === parsedConfiguration) {
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={classes.container}>
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Configuration:
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="learning-language-label">
              Learning Language
            </InputLabel>
            <Select
              labelId="learning-language-label"
              id="learning-language"
              value={data.learningLanguage}
              name="learningLanguage"
              onChange={handleChange}
            >
              {languages.map(language => (
                <MenuItem key={language.code} value={language.code}>
                  {language.nameEn}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
        </div>

        <div>
          <br />
          <Button variant="contained" onClick={save}>
            Save
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

export default Configuration;
