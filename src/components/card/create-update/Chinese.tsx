import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LanguageIcon from "@mui/icons-material/Language";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import axios from "axios";
import React from "react";
import config from "../../../config";

const Chinese = (props: any) => {
  const {
    handleChange,
    handleBlurChange,
    handleForvo,
    getForvo,
    setPartialData,
    data,
  } = props;

  const audioRef = React.createRef<any>();
  const nameInputChtRef = React.createRef<any>();
  const nameInputChsRef = React.createRef<any>();

  const getPinyin = async () => {
    const url = await getForvo("Cht");

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

  return (
    <div>
      <TextField
        name="nameCht"
        label="Tradicional"
        autoComplete="off"
        onChange={handleChange}
        onBlur={(e) => {
          handleBlurChange(e);
          getPinyin();
        }}
        value={data.nameCht}
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
        onBlur={(e) => {
          handleBlurChange(e);
          handleForvo("Chs");
        }}
        value={data.nameChs}
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
      />

      <TextField
        name="audioCh"
        label="Áudio"
        autoComplete="off"
        onChange={handleChange}
        value={data.audioCh}
      />

      <IconButton
        color="primary"
        component="a"
        href={`https://forvo.com/word/${data.nameCht || data.nameChs}/#zh`}
        target="_blank"
        disabled={data.nameCht || data.nameChs ? false : true}
      >
        <MusicVideoIcon />
      </IconButton>

      <audio src={data.audioCh} ref={audioRef}></audio>

      <IconButton
        color="primary"
        component="span"
        disabled={data.audioCh ? false : true}
        onClick={() => audioRef.current.play()}
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
  );
};

export default Chinese;
