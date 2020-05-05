import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LanguageIcon from '@material-ui/icons/Language';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const German = (props: any) => {
  const { classes, handleChange, handleBlurChange, handleForvo, data } = props;

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
          handleForvo('De');
        }}
        value={data.nameDe}
        className={classes.input}
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
        className={classes.input}
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

      <FormControl className={classes.formControl}>
        <InputLabel id="german-gender-label">Gênero</InputLabel>
        <Select
          labelId="german-gender-label"
          id="german-gender"
          value={data.extraDe?.gender || ''}
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
