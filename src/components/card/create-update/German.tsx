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

const German = (props: any) => {
  const { handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="nameDe"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("De");
        }}
        value={data.nameDe}
        InputProps={{ inputProps: { tabIndex: 1004 } }}
        inputRef={nameInputRef}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=de&text=${data.nameEn}`}
        target="_blank"
        disabled={data.nameEn ? false : true}
        onClick={() => {
          nameInputRef.current.focus();
        }}
      >
        <GTranslateIcon />
      </IconButton>

      <TextField
        name="audioDe"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioDe}
        InputProps={{ tabIndex: 2 }}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameDe}/#de`}
        target="_blank"
        disabled={data.nameDe ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioDe} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioDe ? false : true}
        onClick={() => audioRef.current.play()}
      >
        <PlayCircleOutlineIcon />
      </IconButton>

      <IconButton
        color="primary"
        component="a"
        href={`https://de.wikipedia.org/wiki/${data.nameDe}`}
        target="_blank"
        disabled={data.nameDe ? false : true}
      >
        <LanguageIcon />
      </IconButton>

      <FormControl>
        <InputLabel id="german-gender-label">Gênero</InputLabel>
        <Select
          labelId="german-gender-label"
          id="german-gender"
          value={data.extraDe?.gender || ""}
          name="extraDe.gender"
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

export default German;
