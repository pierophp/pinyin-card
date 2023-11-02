import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

const CategoryCreateUpdate = () => {
  const params = useParams();

  const [data, setData] = useState({
    nameEn: "",
    namePt: "",
    nameCht: "",
    nameChs: "",
    nameIt: "",
    nameFr: "",
    nameDe: "",
    parentCategoryId: "",
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const categoriesResponse = (await axios.get(`${config.apiUrl}/category`))
        .data;
      setCategories(categoriesResponse);
    }

    loadCategories();

    async function loadCard() {
      if (!params.id) {
        return;
      }

      const response = (
        await axios.get(`${config.apiUrl}/category/${params.id}`)
      ).data;

      setData(response);
    }

    loadCard();
  }, []);

  const handleChange = (e: any) => {
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
    const request = data as any;
    if (!request.parentCategoryId) {
      request.parentCategoryId = null;
    }

    if (params.id) {
      await axios.put(`${config.apiUrl}/category/${params.id}`, request);
    } else {
      await axios.post(`${config.apiUrl}/category`, request);
    }

    window.location.hash = `/`;
  };

  return (
    <div className="p-3">
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
            InputProps={{ tabIndex: 1000 }}
          />
        </div>
        <div>
          <TextField
            name="namePt"
            label="Portuguese"
            autoComplete="off"
            onChange={handleChange}
            value={data.namePt}
            InputProps={{ tabIndex: 1001 }}
          />

          <IconButton
            color="primary"
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
            onBlur={() => {
              getPinyin();
            }}
          />

          <IconButton
            color="primary"
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
          />
          <IconButton
            color="primary"
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
            InputProps={{ tabIndex: 1001 }}
          />

          <IconButton
            color="primary"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=de&text=${data.nameEn}`}
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
            InputProps={{ tabIndex: 1001 }}
          />

          <IconButton
            color="primary"
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
            InputProps={{ tabIndex: 1001 }}
          />

          <IconButton
            color="primary"
            component="a"
            href={`https://translate.google.com.br/#view=home&op=translate&sl=en&tl=fr&text=${data.nameEn}`}
            target="_blank"
            disabled={data.nameEn ? false : true}
          >
            <GTranslateIcon />
          </IconButton>
        </div>

        <div>
          <FormControl>
            <InputLabel id="parent-category-id-label">Category</InputLabel>
            <Select
              labelId="parent-category-id-label"
              id="parent-ategory-id"
              value={data.parentCategoryId}
              name="parentCategoryId"
              onChange={handleChange}
            >
              <MenuItem value={""}>-</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.nameEn}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
        </div>

        <div className="py-10">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={save}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreateUpdate;
