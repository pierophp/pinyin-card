import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import axios from 'axios';
import React from 'react';
import config from '../config';
import useStyles from './CategoryCreateUpdate.css.js';

const CategoryCreateUpdate = props => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    nameEn: '',
    namePt: '',
    nameCht: '',
    nameChs: '',
    nameIt: '',
    nameFr: '',
    nameDe: '',
  });

  React.useEffect(() => {
    async function init() {
      if (!props.match.params.id) {
        return;
      }

      const response = (
        await axios.get(`${config.apiUrl}/category/${props.match.params.id}`)
      ).data;

      setData(response);
    }

    init();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const getPinyin = async () => {
    const response = (
      await axios.get(
        `${config.pinyinApiUrl}/cards/convert?ideogram=${data.nameCht}`
      )
    ).data;

    const dataCopy = JSON.parse(JSON.stringify(data));
    if (!dataCopy.nameChs) {
      dataCopy.nameChs = response.simplified;
    }

    setData(dataCopy);
  };

  const save = async () => {
    const request = data;

    if (props.match.params.id) {
      await axios.put(
        `${config.apiUrl}/category/${props.match.params.id}`,
        request
      );
    } else {
      await axios.post(`${config.apiUrl}/category`, request);
    }

    window.location.hash = `/`;
  };

  return (
    <div className={classes.container}>
      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          Add category:
        </Typography>
        <div>
          <TextField
            name="nameEn"
            label="English"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={data.nameEn}
            className={classes.input}
            InputProps={{ tabIndex: '1000' }}
          />
        </div>
        <div>
          <TextField
            name="namePt"
            label="Portuguese"
            autoComplete="off"
            onChange={handleChange}
            value={data.namePt}
            className={classes.input}
            InputProps={{ tabIndex: '1001' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=pt&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>
        <div>
          <TextField
            name="nameCht"
            label="Chinese (Trad.)"
            autoComplete="off"
            onChange={handleChange}
            value={data.nameCht}
            className={classes.input}
            onBlur={() => {
              getPinyin();
            }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-TW&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>

          <TextField
            name="nameChs"
            label="Chinese (Simp.)"
            autoComplete="off"
            onChange={handleChange}
            value={data.nameChs}
            className={classes.input}
          />
          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-CN&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="nameDe"
            label="German"
            autoComplete="off"
            onChange={handleChange}
            value={data.nameDe}
            className={classes.input}
            InputProps={{ tabIndex: '1001' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=de&tl=it&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="nameIt"
            label="Italian"
            autoComplete="off"
            onChange={handleChange}
            value={data.nameIt}
            className={classes.input}
            InputProps={{ tabIndex: '1001' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=it&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>

        <div>
          <TextField
            name="nameFr"
            label="French"
            autoComplete="off"
            onChange={handleChange}
            value={data.nameFr}
            className={classes.input}
            InputProps={{ tabIndex: '1001' }}
          />

          <IconButton
            color="primary"
            variant="contained"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=fr&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>

        <div>
          <br />
          <Button variant="contained" onClick={save}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreateUpdate;
