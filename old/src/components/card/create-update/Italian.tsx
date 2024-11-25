import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";

const Italian = (props: any) => {
  const { handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="nameIt"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleForvo("It");
          handleBlurChange(e);
        }}
        value={data.nameIt}
        InputProps={{ inputProps: { tabIndex: 1003 } }}
        inputRef={nameInputRef}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=it&text=${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
        onClick={() => {
          nameInputRef.current.focus();
        }}
      >
        <GTranslateIcon />
      </IconButton>

      <TextField
        name="audioIt"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioIt}
        InputProps={{ tabIndex: 2 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameIt}/#it`}
        target="_blank"
        disabled={data.nameIt ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioIt} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioIt ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://it.wikipedia.org/wiki/${data.nameIt}`}
        target="_blank"
        disabled={data.nameIt ? false : true}
      >
        <LanguageIcon />
      </IconButton>
    </div>
  );
};

export default Italian;
