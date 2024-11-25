import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";

const Portuguese = (props: any) => {
  const { handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="namePt"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("Pt");
        }}
        value={data.namePt}
        InputProps={{ inputProps: { tabIndex: 1001 } }}
        inputRef={nameInputRef}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=pt&text=${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
        onClick={() => {
          audioRef.current.focus();
        }}
      >
        <GTranslateIcon />
      </IconButton>

      <TextField
        name="audioPt"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioPt}
        InputProps={{ tabIndex: 2 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.namePt}/#pt`}
        target="_blank"
        disabled={data.namePt ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioPt} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioPt ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://pt.wikipedia.org/wiki/${data.namePt}`}
        target="_blank"
        disabled={data.namePt ? false : true}
      >
        <LanguageIcon />
      </IconButton>
    </div>
  );
};

export default Portuguese;
