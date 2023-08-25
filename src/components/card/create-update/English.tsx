import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import axios from "axios";
import React from "react";
import config from "../../../config";

const English = (props: any) => {
  const { setPartialData, handleChange, handleBlurChange, handleForvo, data } =
    props;

  const audioRef = React.createRef<any>();

  const handleIpa = async () => {
    if (data.extraEn.pronunciation) {
      return;
    }

    if (!data.nameEn) {
      return;
    }

    const response = (
      await axios.get(`${config.apiUrl}/wiktionary/ipa/en/${data.nameEn}`)
    ).data;

    setPartialData({ "extraEn.pronunciation": response.ipa });
  };

  return (
    <div>
      <TextField
        name="nameEn"
        label="Nome"
        autoComplete="off"
        autoFocus
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("En");
          handleIpa();
        }}
        value={data.nameEn}
        InputProps={{ inputProps: { tabIndex: 1000 } }}
      />

      <TextField
        name="audioEn"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioEn}
        InputProps={{ tabIndex: 1 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameEn}/#en_usa`}
        target="_blank"
        disabled={data.nameEn ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioEn} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioEn ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://en.wikipedia.org/wiki/${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
      >
        <LanguageIcon />
      </IconButton>

      <br />

      <TextField
        name="extraEn.pronunciation"
        label="Pronúncia"
        autoComplete="off"
        onChange={handleChange}
        value={data.extraEn.pronunciation}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://en.wiktionary.org/wiki/${data.nameEn.toLowerCase()}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
      >
        <LanguageIcon />
      </IconButton>
    </div>
  );
};

export default English;
