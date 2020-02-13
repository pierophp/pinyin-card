import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import LanguageIcon from '@material-ui/icons/Language';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PhotoIcon from '@material-ui/icons/Photo';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import config from '../config';
import useStyles from './CardCreateUpdate.css';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const CardCreateUpdate = (props: any) => {
  const classes = useStyles();

  const [data, setPartialData] = React.useReducer(
    (state: any, partialState: any) => {
      return { ...state, ...partialState };
    },
    {
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
      categoryId: '',
    }
  );

  const [category, setCategory] = React.useState<any>({});
  const [categories, setCategories] = React.useState<any[]>([]);
  const [errors, setErrors] = React.useState({});
  const [expanded, setExpanded] = React.useState('en');
  const [loading, setLoading] = React.useState(false);
  const nameInputPtRef = React.createRef<any>();
  const nameInputChtRef = React.createRef<any>();
  const nameInputChsRef = React.createRef<any>();
  const nameInputItRef = React.createRef<any>();
  const nameInputFrRef = React.createRef<any>();

  const audioEnRef = React.createRef<any>();
  const audioPtRef = React.createRef<any>();
  const audioChRef = React.createRef<any>();
  const audioItRef = React.createRef<any>();
  const audioFrRef = React.createRef<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setPartialData({ [name]: value });
  };

  const handleBlurChange = (e: any) => {
    const { name, value } = e.target;

    setPartialData({ [name]: upperFirst(value.trim()) });
  };

  const handleChangeExpanded = (newExpanded: any) => {
    setExpanded(newExpanded !== expanded ? newExpanded : false);
  };

  const getForvo = async (language: any) => {
    let audioLanguage = language;

    if (['Cht', 'Chs'].includes(language)) {
      audioLanguage = 'Ch';
    }

    const audio = data[`audio${audioLanguage}`];
    const word = data[`name${language}`];

    if (audio) {
      return audio;
    }

    const response = (
      await axios.get(
        `${
          config.pinyinApiUrl
        }/forvo?word=${word}&language=${audioLanguage.toLowerCase()}`
      )
    ).data;

    if (!response.url) {
      return audio;
    }

    return response.url;
  };

  const handleForvo = async (language: any) => {
    let audioLanguage = language;

    if (['Cht', 'Chs'].includes(language)) {
      audioLanguage = 'Ch';
    }

    const url = await getForvo(language);

    setPartialData({ [`audio${audioLanguage}`]: url });
  };

  const getPinyin = async () => {
    const url = await getForvo('Cht');

    const response = (
      await axios.get(
        `${config.pinyinApiUrl}/cards/convert?ideogram=${data.nameCht}`
      )
    ).data;

    if (!data.nameChs) {
      setPartialData({
        nameChs: response.simplified,
      });
    }

    if (!data.pinyin) {
      setPartialData({
        pinyin: response.pinyin,
      });
    }

    setPartialData({ audioCh: url });
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
        async function loadCard() {
          const cardResponse = (
            await axios.get(`${config.apiUrl}/card/${props.match.params.id}`)
          ).data;

          setPartialData(cardResponse);
        }

        loadCard();

        async function loadCategories() {
          const categoriesResponse = (
            await axios.get(`${config.apiUrl}/category`)
          ).data;
          setCategories(categoriesResponse);
        }

        loadCategories();
      }
    }

    init();
  }, [props.match.params.category, props.match.params.id]);

  const save = async () => {
    try {
      setLoading(true);
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
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          {!props.match.params.id && <>Add to "{category.nameEn}"</>}
          {props.match.params.id && <>Editing</>}:
        </Typography>

        <ExpansionPanel
          square
          expanded={expanded === 'en'}
          onChange={() => handleChangeExpanded('en')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Inglês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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

              <audio src={data.audioEn} ref={audioEnRef}></audio>

              <IconButton
                color="primary"
                component="span"
                disabled={data.audioEn ? false : true}
                onClick={() => audioEnRef.current.play()}
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
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'pt'}
          onChange={() => handleChangeExpanded('pt')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Português</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
                inputRef={nameInputPtRef}
              />

              <IconButton
                color="primary"
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

              <audio src={data.audioPt} ref={audioPtRef}></audio>

              <IconButton
                color="primary"
                component="span"
                disabled={data.audioPt ? false : true}
                onClick={() => audioPtRef.current.play()}
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'ch'}
          onChange={() => handleChangeExpanded('ch')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Chinês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <TextField
                name="nameCht"
                label="Tradicional"
                autoComplete="off"
                onChange={handleChange}
                onBlur={e => {
                  handleBlurChange(e);
                  getPinyin();
                }}
                value={data.nameCht}
                className={classes.inputChinese}
                InputProps={{ inputProps: { tabIndex: 1002 } }}
                inputRef={nameInputChtRef}
              />

              <IconButton
                color="primary"
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
                label="Simplificado"
                autoComplete="off"
                onChange={handleChange}
                onBlur={e => {
                  handleBlurChange(e);
                  handleForvo('Chs');
                }}
                value={data.nameChs}
                className={classes.inputChinese}
                inputRef={nameInputChsRef}
              />
              <IconButton
                color="primary"
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
                className={classes.inputChinese}
              />

              <TextField
                name="audioCh"
                label="Áudio"
                autoComplete="off"
                onChange={handleChange}
                value={data.audioCh}
                className={classes.input}
              />

              <IconButton
                color="primary"
                component="a"
                href={`https://forvo.com/word/${data.nameCht ||
                  data.nameChs}/#zh`}
                target="_blank"
                disabled={data.nameCht || data.nameChs ? false : true}
              >
                <MusicVideoIcon />
              </IconButton>

              <audio src={data.audioCh} ref={audioChRef}></audio>

              <IconButton
                color="primary"
                component="span"
                disabled={data.audioCh ? false : true}
                onClick={() => audioChRef.current.play()}
              >
                <PlayCircleOutlineIcon />
              </IconButton>

              <IconButton
                color="primary"
                component="a"
                href={`https://zh.wikipedia.org/wiki/${data.nameCht}`}
                target="_blank"
                disabled={data.nameCht ? false : true}
              >
                <LanguageIcon />
              </IconButton>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'it'}
          onChange={() => handleChangeExpanded('it')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Italiano</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <TextField
                name="nameIt"
                label="Nome"
                autoComplete="off"
                onChange={handleChange}
                onBlur={e => {
                  handleForvo('It');
                  handleBlurChange(e);
                }}
                value={data.nameIt}
                className={classes.input}
                InputProps={{ inputProps: { tabIndex: 1003 } }}
                inputRef={nameInputItRef}
              />

              <IconButton
                color="primary"
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
                label="Áudio"
                autoComplete="off"
                onChange={handleChange}
                value={data.audioIt}
                className={classes.input}
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

              <audio src={data.audioIt} ref={audioItRef}></audio>

              <IconButton
                color="primary"
                component="span"
                disabled={data.audioIt ? false : true}
                onClick={() => audioItRef.current.play()}
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'frs'}
          onChange={() => handleChangeExpanded('frs')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Francês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <TextField
                name="nameFr"
                label="Nome"
                autoComplete="off"
                onChange={handleChange}
                onBlur={e => {
                  handleBlurChange(e);
                  handleForvo('Fr');
                }}
                value={data.nameFr}
                className={classes.input}
                InputProps={{ inputProps: { tabIndex: 1004 } }}
                inputRef={nameInputFrRef}
              />

              <IconButton
                color="primary"
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
                label="Áudio"
                autoComplete="off"
                onChange={handleChange}
                value={data.audioFr}
                className={classes.input}
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

              <audio src={data.audioFr} ref={audioFrRef}></audio>

              <IconButton
                color="primary"
                component="span"
                disabled={data.audioFr ? false : true}
                onClick={() => audioFrRef.current.play()}
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

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
            component="a"
            href={`https://www.google.com/search?q=${data.nameEn}&tbm=isch&sxsrf=ACYBGNTvB-DW6ELIKgZ60J2gwqZwMfTO1Q:1579728976811&source=lnt&tbs=isz:l&sa=Xbiw=1280&bih=662&dpr=1`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <PhotoIcon />
          </IconButton>

          <IconButton
            color="primary"
            component="a"
            href={`https://www.bing.com/images/search?&q=${data.nameEn}&qft=+filterui:imagesize-wallpaper&FORM=IRFLTR`}
            target="_blank"
            disabled={data.nameEn ? false : true}
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

        {categories.length > 0 && (
          <div>
            <FormControl>
              <InputLabel id="category-id-label">Category</InputLabel>
              <Select
                labelId="category-id-label"
                id="category-id"
                value={data.categoryId}
                name="categoryId"
                onChange={handleChange}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.nameEn}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
          </div>
        )}

        <div>
          <br />
          <Button
            variant="contained"
            onClick={save}
            tabIndex={1006}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardCreateUpdate;
