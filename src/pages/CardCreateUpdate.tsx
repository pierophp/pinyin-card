import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhotoIcon from "@mui/icons-material/Photo";
import axios from "axios";
import upperFirst from "lodash/upperFirst";
import React from "react";
import Chinese from "../components/card/create-update/Chinese";
import English from "../components/card/create-update/English";
import French from "../components/card/create-update/French";
import Italian from "../components/card/create-update/Italian";
import German from "../components/card/create-update/German";
import Portuguese from "../components/card/create-update/Portuguese";
import config from "../config";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const defaultData = {
  nameEn: "",
  audioEn: "",
  extraEn: {
    pronunciation: "",
  },
  namePt: "",
  audioPt: "",
  extraPt: {},
  nameCht: "",
  nameChs: "",
  extraCh: {},
  audioCh: "",
  pinyin: "",
  nameIt: "",
  audioIt: "",
  extraIt: {},
  nameFr: "",
  audioFr: "",
  extraFr: {},
  nameDe: "",
  audioDe: "",
  extraDe: {},
  image: "",
  categoryId: "",
};

const CardCreateUpdate = () => {
  const [data, setPartialData] = React.useReducer(
    (state: any, partialState: any) => {
      const stateCopy = JSON.parse(JSON.stringify(state));
      const keys = Object.keys(partialState);
      for (const key of keys) {
        const splitKey = key.split(".");
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

    defaultData
  );

  const params = useParams();
  const [category, setCategory] = React.useState<any>({});
  const [categories, setCategories] = React.useState<any[]>([]);
  const [expanded, setExpanded] = React.useState("en");
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

    if (["Cht", "Chs"].includes(language)) {
      audioLanguage = "Ch";
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

    if (["Cht", "Chs"].includes(language)) {
      audioLanguage = "Ch";
    }

    const url = await getForvo(language);

    setPartialData({ [`audio${audioLanguage}`]: url });
  };

  React.useEffect(() => {
    async function init() {
      if (params.category) {
        const categoryResponse = (
          await axios.get(`${config.apiUrl}/category/${params.category}`)
        ).data;
        setCategory(categoryResponse);
      }

      if (params.id) {
        async function loadCard() {
          const cardResponse = (
            await axios.get(`${config.apiUrl}/card/${params.id}`)
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
  }, [params.category, params.id]);

  const save = async () => {
    try {
      setLoading(true);
      const request = data;
      if (params.category) {
        request.categoryId = parseInt(params.category, 10);
      }

      if (params.id) {
        await axios.put(`${config.apiUrl}/card/${params.id}`, request);
      } else {
        await axios.post(`${config.apiUrl}/card`, request);
      }

      window.location.hash = `/category/${request.categoryId}`;
    } catch (e) {
      // console.log(e.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <form autoComplete="off">
        <Typography variant="h4" component="h4">
          {!params.id && <>Add to "{category.nameEn}"</>}
          {params.id && <>Editing</>}:
        </Typography>
        <Accordion
          square
          expanded={expanded === "en"}
          onChange={() => handleChangeExpanded("en")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-usa-48.png" height="25" />
              <Typography>Inglês</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <English
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              setPartialData={setPartialData}
              data={data}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          expanded={expanded === "pt"}
          onChange={() => handleChangeExpanded("pt")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-brazil-48.png" height="25" />
              <Typography>Português</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Portuguese
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          expanded={expanded === "ch"}
          onChange={() => handleChangeExpanded("ch")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-china-48.png" height="25" />
              <Typography>Chinês</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Chinese
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              getForvo={getForvo}
              data={data}
              setPartialData={setPartialData}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          expanded={expanded === "de"}
          onChange={() => handleChangeExpanded("de")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-german-48.png" height="25" />
              <Typography>Alemão</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <German
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          expanded={expanded === "it"}
          onChange={() => handleChangeExpanded("it")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-italy-48.png" height="25" />
              <Typography>Italiano</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Italian
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          expanded={expanded === "frs"}
          onChange={() => handleChangeExpanded("frs")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-1 items-center">
              <img src="/icons/icons8-france-48.png" height="25" />
              <Typography>Francês</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <French
              handleChange={handleChange}
              handleBlurChange={handleBlurChange}
              handleForvo={handleForvo}
              data={data}
            />
          </AccordionDetails>
        </Accordion>

        <div>
          <TextField
            name="image"
            label="Image"
            autoComplete="off"
            onChange={handleChange}
            value={data.image}
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
            className="bg-black bg-no-repeat bg-center bg-auto-100 h-100 w-190"
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
