import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";

const French = (props: any) => {
  const { handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="nameFr"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("Fr");
        }}
        value={data.nameFr}
        InputProps={{ inputProps: { tabIndex: 1004 } }}
        inputRef={nameInputRef}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=fr&text=${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
        onClick={() => {
          nameInputRef.current.focus();
        }}
      >
        <GTranslateIcon />
      </IconButton>

      <TextField
        name="audioFr"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioFr}
        InputProps={{ tabIndex: 2 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameFr}/#fr`}
        target="_blank"
        disabled={data.nameFr ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioFr} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioFr ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://fr.wikipedia.org/wiki/${data.nameFr}`}
        target="_blank"
        disabled={data.nameFr ? false : true}
      >
        <LanguageIcon />
      </IconButton>
    </div>
  );
};

export default French;
