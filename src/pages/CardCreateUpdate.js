import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PhotoIcon from '@material-ui/icons/Photo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import axios from 'axios';
import React from 'react';
import config from '../config';
import useStyles from './CardCreateUpdate.css.js';

const CardCreateUpdate = props => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    nameEn: '',
    audioEn: '',
    namePt: '',
    audioPt: '',
    nameCht: '',
    nameChs: '',
    audioCh: '',
    nameIt: '',
    audioIt: '',
    nameFr: '',
    audioFr: '',
    pinyin: '',
    image: '',
  });
  const [category, setCategory] = React.useState({});
  const nameInputPtRef = React.createRef();
  const nameInputChtRef = React.createRef();
  const nameInputChsRef = React.createRef();
  const nameInputItRef = React.createRef();
  const nameInputFrRef = React.createRef();

  const audioEnRef = React.createRef();
  const audioPtRef = React.createRef();
  const audioChRef = React.createRef();
  const audioItRef = React.createRef();
  const audioFrRef = React.createRef();

  const handleChange = e => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const handleForvo = async language => {
    let audioLanguage = language;

    if (['Cht', 'Chs'].includes(language)) {
      audioLanguage = 'Ch';
    }

    const audio = data[`audio${audioLanguage}`];
    const word = data[`name${language}`];

    if (audio) {
      return;
    }

    const response = (
      await axios.get(
        `${
          config.pinyinApiUrl
        }/forvo?word=${word}&language=${audioLanguage.toLowerCase()}`
      )
    ).data;

    if (!response.url) {
      return;
    }

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[`audio${audioLanguage}`] = response.url;

    setData(dataCopy);
  };

  const getPinyin = async () => {
    await handleForvo('Cht');

    const response = (
      await axios.get(
        `${config.pinyinApiUrl}/cards/convert?ideogram=${data.nameCht}`
      )
    ).data;

    const dataCopy = JSON.parse(JSON.stringify(data));
    if (!dataCopy.nameChs) {
      dataCopy.nameChs = response.simplified;
    }

    if (!dataCopy.pinyin) {
      dataCopy.pinyin = response.pinyin;
    }

    setData(dataCopy);
  };

  React.useEffect(() => {
    async function init() {
      if (props.match.params.category) {
        const categoryResponse = (
          await axios.get(
            `${config.apiUrl}/category/${props.match.params.category}`
          )
        ).data;
        setCategory(categoryResponse);
      }

      if (props.match.params.id) {
        const cardResponse = (
          await axios.get(`${config.apiUrl}/card/${props.match.params.id}`)
        ).data;

        setData(cardResponse);
      }
    }

    init();
  }, []);

  const save = async () => {
    const request = data;
    if (props.match.params.category) {
      request.categoryId = parseInt(props.match.params.category, 10);
    }

    if (props.match.params.id) {
      await axios.put(
        `${config.apiUrl}/card/${props.match.params.id}`,
        request
      );
    } else {
      await axios.post(`${config.apiUrl}/card`, request);
    }

    window.location.hash = `/category/${request.categoryId}`;
  };

  return (
    <div className={classes.container}>
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          {!props.match.params.id && <>Add to "{category.nameEn}"</>}
          {props.match.params.id && <>Editing</>}:
        </Typography>
        <div>
          <TextField
            name="nameEn"
            label="English"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            onBlur={() => handleForvo('En')}
            value={data.nameEn}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1000 } }}
          />

          <TextField
            name="audioEn"
            label="Audio English"
            autoComplete="off"
            onChange={handleChange}
            value={data.audioEn}
            className={classes.input}
            InputProps={{ tabIndex: '1' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://forvo.com/word/${data.nameEn}/#en_usa`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <MusicVideoIcon />
          </IconButton>

          <audio src={data.audioEn} ref={audioEnRef}></audio>

          <IconButton
            color="primary"
            variant="contained"
            component="span"
            disabled={data.audioEn ? false : true}
            onClick={() => audioEnRef.current.play()}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            name="namePt"
            label="Portuguese"
            autoComplete="off"
            onChange={handleChange}
            onBlur={() => handleForvo('Pt')}
            value={data.namePt}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1001 } }}
            inputRef={nameInputPtRef}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=pt&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            onClick={() => {
              nameInputPtRef.current.focus();
            }}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="audioPt"
            label="Audio Portuguese"
            autoComplete="off"
            onChange={handleChange}
            value={data.audioPt}
            className={classes.input}
            InputProps={{ tabIndex: '2' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://forvo.com/word/${data.namePt}/#pt`}
            target="_blank"
            disabled={data.namePt ? false : true}
          >
            <MusicVideoIcon />
          </IconButton>

          <audio src={data.audioPt} ref={audioPtRef}></audio>

          <IconButton
            color="primary"
            variant="contained"
            component="span"
            disabled={data.audioPt ? false : true}
            onClick={() => audioPtRef.current.play()}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            name="nameCht"
            label="Chinese (Trad.)"
            autoComplete="off"
            onChange={handleChange}
            onBlur={() => {
              getPinyin();
            }}
            value={data.nameCht}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1002 } }}
            inputRef={nameInputChtRef}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-TW&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            onClick={() => {
              nameInputChtRef.current.focus();
            }}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="nameChs"
            label="Chinese (Simp.)"
            autoComplete="off"
            onChange={handleChange}
            onBlur={() => handleForvo('Chs')}
            value={data.nameChs}
            className={classes.input}
            inputRef={nameInputChsRef}
          />
          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-CN&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            onClick={() => {
              nameInputChsRef.current.focus();
            }}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="pinyin"
            label="Pinyin"
            autoComplete="off"
            onChange={handleChange}
            value={data.pinyin}
            className={classes.input}
          />

          <TextField
            name="audioCh"
            label="Audio Chinese"
            autoComplete="off"
            onChange={handleChange}
            value={data.audioCh}
            className={classes.input}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://forvo.com/word/${data.nameCht || data.nameChs}/#zh`}
            target="_blank"
            disabled={data.nameCht || data.nameChs ? false : true}
          >
            <MusicVideoIcon />
          </IconButton>

          <audio src={data.audioCh} ref={audioChRef}></audio>

          <IconButton
            color="primary"
            variant="contained"
            component="span"
            disabled={data.audioCh ? false : true}
            onClick={() => audioChRef.current.play()}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="nameIt"
            label="Italian"
            autoComplete="off"
            onChange={handleChange}
            onBlur={() => handleForvo('It')}
            value={data.nameIt}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1003 } }}
            inputRef={nameInputItRef}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=it&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            onClick={() => {
              nameInputItRef.current.focus();
            }}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="audioIt"
            label="Audio Italian"
            autoComplete="off"
            onChange={handleChange}
            value={data.audioIt}
            className={classes.input}
            InputProps={{ tabIndex: '2' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://forvo.com/word/${data.nameIt}/#it`}
            target="_blank"
            disabled={data.nameIt ? false : true}
          >
            <MusicVideoIcon />
          </IconButton>

          <audio src={data.audioIt} ref={audioItRef}></audio>

          <IconButton
            color="primary"
            variant="contained"
            component="span"
            disabled={data.audioIt ? false : true}
            onClick={() => audioItRef.current.play()}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="nameFr"
            label="French"
            autoComplete="off"
            onChange={handleChange}
            onBlur={() => handleForvo('Fr')}
            value={data.nameFr}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1004 } }}
            inputRef={nameInputFrRef}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=fr&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            onClick={() => {
              nameInputFrRef.current.focus();
            }}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="audioFr"
            label="Audio French"
            autoComplete="off"
            onChange={handleChange}
            value={data.audioFr}
            className={classes.input}
            InputProps={{ tabIndex: '2' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://forvo.com/word/${data.nameFr}/#fr`}
            target="_blank"
            disabled={data.nameFr ? false : true}
          >
            <MusicVideoIcon />
          </IconButton>

          <audio src={data.audioFr} ref={audioFrRef}></audio>

          <IconButton
            color="primary"
            variant="contained"
            component="span"
            disabled={data.audioFr ? false : true}
            onClick={() => audioFrRef.current.play()}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="image"
            label="Image"
            autoComplete="off"
            onChange={handleChange}
            value={data.image}
            className={classes.input}
            InputProps={{ inputProps: { tabIndex: 1005 } }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://www.google.com/search?q=${data.nameEn}&tbm=isch&sxsrf=ACYBGNTvB-DW6ELIKgZ60J2gwqZwMfTO1Q:1579728976811&source=lnt&tbs=isz:l&sa=Xbiw=1280&bih=662&dpr=1`}
            target="_blank"
            disabled={data.nameEn ? false : true}
            size="large"
          >
            <PhotoIcon />
          </IconButton>
        </div>
        <div>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${data.image})` }}
          ></div>
        </div>

        <div>
          <br />
          <Button variant="contained" onClick={save} tabIndex={1006}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardCreateUpdate;
