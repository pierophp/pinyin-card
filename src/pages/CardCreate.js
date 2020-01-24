import React from 'react';
import useStyles from './CardCreate.css.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import config from '../config';

const CardCreate = props => {
  const classes = useStyles();
  const [data, setData] = React.useState({});

  const handleChange = e => {
    const { name, value } = e.target;

    const dataCopy = JSON.parse(JSON.stringify(data));

    dataCopy[name] = value;

    setData(dataCopy);
  };

  const getPinyin = async () => {
    await axios.post('https://api.pinzi.org/unihan/to_pinyin_all', {
      ideograms: [data.nameCht],
    });
  };

  const save = async () => {
    const request = data;
    request.categoryId = parseInt(props.match.params.category, 10);

    await axios.post(`${config.apiUrl}/card`, request);
  };

  return (
    <div className={classes.container}>
      <div>
        <TextField
          name="nameEn"
          label="English"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        <TextField
          name="namePt"
          label="Portuguese"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        {data.nameEn && (
          <a
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=pt&text=${data.nameEn}`}
            target="_blank"
          >
            Translator Pt
          </a>
        )}
      </div>
      <div>
        <TextField
          name="nameCht"
          label="Chinese (Trad.)"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        <TextField
          name="nameChs"
          label="Chinese (Simp.)"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        <TextField
          name="pinyin"
          label="Pinyin"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />

        {data.nameEn && (
          <a
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-TW&text=${data.nameEn}`}
            target="_blank"
          >
            Translator Ch (Trad)
          </a>
        )}

        {data.nameEn && (
          <a
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=zh-CN&text=${data.nameEn}`}
            target="_blank"
          >
            Translator Ch (Simp)
          </a>
        )}

        {data.nameCht && (
          <a href="javascript:void(0)" onClick={getPinyin}>
            Get Pinyin
          </a>
        )}
      </div>

      <div>
        <TextField
          name="image"
          label="Image"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        {data.nameEn && (
          <a
            href={`https://www.google.com/search?q=${data.nameEn}&tbm=isch&sxsrf=ACYBGNTvB-DW6ELIKgZ60J2gwqZwMfTO1Q:1579728976811&source=lnt&tbs=isz:l&sa=Xbiw=1280&bih=662&dpr=1`}
            target="_blank"
          >
            Google Images
          </a>
        )}
      </div>
      <div>
        <TextField
          name="audioCh"
          label="Audio Chinese"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />
        <TextField
          name="audioEn"
          label="Audio English"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />

        <TextField
          name="audioPt"
          label="Audio Portuguese"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          className={classes.input}
        />

        {data.nameCht && (
          <a
            href={`https://forvo.com/word/${data.nameCht}/#zh`}
            target="_blank"
          >
            Forvo Ch
          </a>
        )}

        {data.nameEn && (
          <a
            href={`https://forvo.com/word/${data.nameEn}/#en_usa`}
            target="_blank"
          >
            Forvo En
          </a>
        )}

        {data.namePt && (
          <a href={`https://forvo.com/word/${data.namePt}/#pt`} target="_blank">
            Forvo Pt
          </a>
        )}
      </div>

      <div>
        <br />
        <Button variant="contained" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CardCreate;
