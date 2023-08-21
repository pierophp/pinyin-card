import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React from "react";
import getConfiguration from "../helpers/get.configuration";
import getLanguages from "../helpers/get.languages";
import useStyles from "./Configuration.css";
import Snackbar from "@material-ui/core/Snackbar";
import { filterVoices } from "../helpers/filter.voices";

const languages = getLanguages();

const Configuration = () => {
  const classes = useStyles();

  const [data, setData] = React.useState(getConfiguration());

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const save = async () => {
    localStorage.setItem("configuration", JSON.stringify(data));

    if (localStorage.getItem("configuration")) {
      setSnackbarOpen(true);
    }
  };

  const voices = window.speechSynthesis.getVoices();

  const filteredVoices = filterVoices(voices, data.learningLanguage);

  return (
    <div className={classes.container}>
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Configuração:
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="learning-language-label">
              Idioma que estou aprendendo
            </InputLabel>
            <Select
              labelId="learning-language-label"
              id="learning-language"
              value={data.learningLanguage}
              name="learningLanguage"
              onChange={handleChange}
            >
              {languages.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                  {language.namePt}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
        </div>

        <pre>
          {JSON.stringify(
            filteredVoices.map((voice) => {
              return {
                default: voice.default,
                lang: voice.lang,
                localService: voice.localService,
                name: voice.name,
                voiceURI: voice.voiceURI,
              };
            }),
            null,
            2
          )}
        </pre>

        <div>
          <br />
          <Button variant="contained" onClick={save}>
            Salvar
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
