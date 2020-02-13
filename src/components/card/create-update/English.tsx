import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LanguageIcon from '@material-ui/icons/Language';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React from 'react';

const English = (props: any) => {
  const { classes, handleChange, handleBlurChange, handleForvo, data } = props;

  const audioRef = React.createRef<any>();

  return (
    <div>
      <TextField
        name="nameEn"
        label="Nome"
        autoComplete="off"
        autoFocus
        onChange={handleChange}
        onBlur={e => {
          handleBlurChange(e);
          handleForvo('En');
        }}
        value={data.nameEn}
        className={classes.input}
        InputProps={{ inputProps: { tabIndex: 1000 } }}
      />

      <TextField
        name="audioEn"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioEn}
        className={classes.input}
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
        name="extraEn.ipa"
        label="IPA"
        autoComplete="off"
        autoFocus
        onChange={handleChange}
        onBlur={e => {
          handleBlurChange(e);
        }}
        value={data.extraEn.ipa}
        className={classes.input}
      />
    </div>
  );
};

export default English;
