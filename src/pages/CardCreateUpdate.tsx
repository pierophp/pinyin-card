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
import PhotoIcon from '@material-ui/icons/Photo';
import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import Chinese from '../components/card/create-update/Chinese';
import English from '../components/card/create-update/English';
import French from '../components/card/create-update/French';
import Italian from '../components/card/create-update/Italian';
import German from '../components/card/create-update/German';
import Portuguese from '../components/card/create-update/Portuguese';
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

const defaultData = {
  nameEn: '',
  audioEn: '',
  extraEn: {
    pronunciation: '',
  },
  namePt: '',
  audioPt: '',
  extraPt: {},
  nameCht: '',
  nameChs: '',
  extraCh: {},
  audioCh: '',
  pinyin: '',
  nameIt: '',
  audioIt: '',
  extraIt: {},
  nameFr: '',
  audioFr: '',
  extraFr: {},
  nameDe: '',
  audioDe: '',
  extraDe: {},
  image: '',
  categoryId: '',
};

const CardCreateUpdate = (props: any) => {
  const classes = useStyles();

  const [data, setPartialData] = React.useReducer(
    (state: any, partialState: any) => {
      const stateCopy = JSON.parse(JSON.stringify(state));
      const keys = Object.keys(partialState);
      for (const key of keys) {
        const splitKey = key.split('.');
        if (splitKey.length === 1) {
          stateCopy[key] = partialState[key];
        } else {
          if (
            stateCopy[splitKey[0]] === undefined ||
            stateCopy[splitKey[0]] === null
          ) {
            stateCopy[splitKey[0]] = {};
          }

          stateCopy[splitKey[0]][splitKey[1]] = partialState[key];
        }
      }

      return stateCopy;
    },

    defaultData,
  );

  const [category, setCategory] = React.useState<any>({});
  const [categories, setCategories] = React.useState<any[]>([]);
  const [errors, setErrors] = React.useState({});
  const [expanded, setExpanded] = React.useState('en');
  const [loading, setLoading] = React.useState(false);

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

    if (!word) {
      return;
    }

    const response = (
      await axios.get(
        `${
          config.pinyinApiUrl
        }/forvo?word=${word}&language=${audioLanguage.toLowerCase()}`,
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

  React.useEffect(() => {
    async function init() {
      if (props.match.params.category) {
        const categoryResponse = (
          await axios.get(
            `${config.apiUrl}/category/${props.match.params.category}`,
          )
        ).data;
        setCategory(categoryResponse);
      }

      if (props.match.params.id) {
        async function loadCard() {
          const cardResponse = (
            await axios.get(`${config.apiUrl}/card/${props.match.params.id}`)
          ).data;

          cardResponse.extraEn = {
            ...defaultData.extraEn,
            ...cardResponse.extraEn,
          };

          cardResponse.extraPt = {
            ...defaultData.extraPt,
            ...cardResponse.extraPt,
          };

          cardResponse.extraCh = {
            ...defaultData.extraCh,
            ...cardResponse.extraCh,
          };

          cardResponse.extraIt = {
            ...defaultData.extraIt,
            ...cardResponse.extraIt,
          };

          cardResponse.extraFr = {
            ...defaultData.extraFr,
            ...cardResponse.extraFr,
          };

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
          request,
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
            <img
              src="/icons/icons8-usa-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Inglês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <English
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              setPartialData={setPartialData}
              data={data}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'pt'}
          onChange={() => handleChangeExpanded('pt')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src="/icons/icons8-brazil-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Português</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Portuguese
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'ch'}
          onChange={() => handleChangeExpanded('ch')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src="/icons/icons8-china-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Chinês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Chinese
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              getForvo={getForvo}
              data={data}
              setPartialData={setPartialData}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'de'}
          onChange={() => handleChangeExpanded('de')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src="/icons/icons8-german-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Alemão</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <German
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'it'}
          onChange={() => handleChangeExpanded('it')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src="/icons/icons8-italy-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Italiano</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Italian
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'frs'}
          onChange={() => handleChangeExpanded('frs')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img
              src="/icons/icons8-france-48.png"
              height="25"
              className={classes.flagIcon}
            />
            <Typography className={classes.heading}>Francês</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <French
              classes={classes}
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
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
                {categories.map((category) => (
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
