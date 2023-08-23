import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useMemo } from "react";
import getConfiguration from "../helpers/get.configuration";
import getLanguages from "../helpers/get.languages";
import Snackbar from "@mui/material/Snackbar";
import { filterVoices } from "../helpers/filter.voices";
import orderBy from "lodash/orderBy";
// @ts-ignore
import EasySpeech from "easy-speech";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { IconButton } from "@mui/material";

const languages = getLanguages();

const Configuration = () => {
  const [data, setData] = React.useState(getConfiguration());
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleChange = (e: any): void => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name!] = value;

    setData(dataCopy);
  };

  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 }).then(() => {
      setVoices(orderBy(EasySpeech.voices(), ["name"]));
    });
  }, []);

  const save = useCallback(async () => {
    localStorage.setItem("configuration", JSON.stringify(data));

    if (localStorage.getItem("configuration")) {
      setSnackbarOpen(true);
    }
  }, [data]);

  const filteredVoices = filterVoices(voices, data.learningLanguage);

  const testMessage = useMemo(() => {
    return (
      languages.find((lang) => lang.code === data.learningLanguage)
        ?.testMessage ?? "This is a test message"
    );
  }, [data.learningLanguage]);

  const play = useCallback(async () => {
    EasySpeech.speak({
      text: testMessage,
      voice: filteredVoices.find((voice) => voice.name === data.voice),
    });
  }, [data, filteredVoices, testMessage]);

  return (
    <div className="p-3">
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Configuração:
        </Typography>
        <div>
          <FormControl className="w-64">
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
        <div>
          <FormControl className="w-64">
            <InputLabel id="voice-label">Voz preferencial</InputLabel>
            <Select
              labelId="voice-label"
              id="voice"
              value={data.voice}
              name="voice"
              onChange={handleChange}
            >
              {filteredVoices.map((voice) => (
                <MenuItem key={voice.name} value={voice.name}>
                  {voice.name}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText></FormHelperText>
          </FormControl>

          <IconButton onClick={() => play()}>
            <PlayCircleOutlineIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>

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
