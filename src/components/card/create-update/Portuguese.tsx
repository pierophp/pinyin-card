import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LanguageIcon from '@material-ui/icons/Language';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React from 'react';

const Portuguese = (props: any) => {
  const { classes, handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();
  const nameInputRef = React.createRef<any>();
  return (
    <div>
      <TextField
        name="namePt"
        label="Nome"
        autoComplete="off"
        onChange={handleChange}
        onBlur={e => {
          handleBlurChange(e);
          handleForvo('Pt');
        }}
        value={data.namePt}
        className={classes.input}
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
        className={classes.input}
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
