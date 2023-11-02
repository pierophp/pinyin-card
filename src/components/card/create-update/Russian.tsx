import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Russian = (props: any) => {
  const { handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="nameRu"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("Ru");
        }}
        value={data.nameRu}
        InputProps={{ inputProps: { tabIndex: 1004 } }}
        inputRef={nameInputRef}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=ru&text=${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
        onClick={() => {
          nameInputRef.current.focus();
        }}
      >
        <GTranslateIcon />
      </IconButton>

      <TextField
        name="audioRu"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioRu}
        InputProps={{ tabIndex: 2 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameRu}/#ru`}
        target="_blank"
        disabled={data.nameRu ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioRu} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioRu ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://ru.wikipedia.org/wiki/${data.nameRu}`}
        target="_blank"
        disabled={data.nameRu ? false : true}
      >
        <LanguageIcon />
      </IconButton>

      <FormControl>
        <InputLabel id="russian-gender-label">Gênero</InputLabel>
        <Select
          labelId="russian-gender-label"
          id="russian-gender"
          value={data.extraRu?.gender || ""}
          name="extrRu.gender"
          onChange={handleChange}
        >
          <MenuItem value="m">Masculino</MenuItem>
          <MenuItem value="f">Feminino</MenuItem>
          <MenuItem value="n">Neutro</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </div>
  );
};

export default Russian;
