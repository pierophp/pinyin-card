import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LanguageIcon from '@material-ui/icons/Language';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React from 'react';

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
        onBlur={e => {
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
    </div>
  );
};

export default German;
