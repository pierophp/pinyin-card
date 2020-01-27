import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import upperFirst from 'lodash/upperFirst';
import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import getConfiguration from '../helpers/get.configuration';
import useStyles from './Categories.css.js';

const Categories = props => {
  const [categories, setCategories] = React.useState([]);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const configuration = getConfiguration();

  const classes = useStyles();

  React.useEffect(() => {
    async function init() {
      if (props.match.params.id) {
        return;
      }

      const response = (await axios.get(`${config.apiUrl}/category`)).data;
      setCategories(response);
    }

    init();
  }, []);

  React.useEffect(() => {
    async function init() {
      if (!props.match.params.id) {
        return;
      }

      const categoryResponse = (
        await axios.get(`${config.apiUrl}/category/${props.match.params.id}`)
      ).data;

      setCurrentCategory(categoryResponse);

      const cardsResponse = (
        await axios.get(
          `${config.apiUrl}/card/category/${props.match.params.id}`
        )
      ).data;
      setCards(cardsResponse);
    }

    init();
  }, [props.match.params.id]);

  return (
    <div className={classes.container}>
      {currentCategory && (
        <div>
          <Typography variant="h4" component="h4">
            {currentCategory.namePt}
          </Typography>
          <div>
            <Link to={`/cards/${currentCategory.id}`}>
              <Button color="primary" variant="contained">
                Start
              </Button>
            </Link>

            <Link to={`/card-create/${currentCategory.id}`}>
              <Button variant="contained">Add card</Button>
            </Link>

            <Link to={`/category-update/${currentCategory.id}`}>
              <Button variant="contained">Edit Category</Button>
            </Link>
          </div>

          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>English</TableCell>
                <TableCell>Portuguese</TableCell>
                <TableCell>Chinese (Trad.)</TableCell>
                <TableCell>Chinese (Simp.)</TableCell>
                <TableCell>Pinyin</TableCell>
                <TableCell>Italian</TableCell>
                <TableCell>French</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map(card => (
                <TableRow key={card.id}>
                  <TableCell component="th" scope="row">
                    {card.nameEn}
                  </TableCell>
                  <TableCell>{card.namePt}</TableCell>
                  <TableCell>{card.nameCht}</TableCell>
                  <TableCell>{card.nameChs}</TableCell>
                  <TableCell>{card.pinyin}</TableCell>
                  <TableCell>{card.nameIt}</TableCell>
                  <TableCell>{card.nameFr}</TableCell>
                  <TableCell>
                    <Link to={`/card-update/${card.id}`}>
                      <Typography>Edit</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!currentCategory && (
        <>
          <Typography variant="h4" component="h4">
            Categories
          </Typography>

          <Link to={`/category-create`}>
            <Button color="primary" variant="contained">
              Add category
            </Button>
          </Link>
          <div className={classes.categoriesContainer}>
            {categories.map(category => (
              <Link to={`/category/${category.id}`}>
                <div className={classes.box}>
                  <Typography>
                    {category.namePt} <br />
                    {category[
                      `name${upperFirst(configuration.learningLanguage)}`
                    ] || category[`nameEn`]}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
