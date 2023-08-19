import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import upperFirst from "lodash/upperFirst";
import getConfiguration from "../../helpers/get.configuration";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    margin: "5px 5px",
  },
  media: {
    height: 70,
  },
});

const ShowCategory = (props: any) => {
  const classes = useStyles();
  const { category, user } = props;
  const configuration = getConfiguration();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => (window.location.hash = `/category/${category.id}`)}
      >
        {/*         
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        /> */}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {category.namePt}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {category[`name${upperFirst(configuration.learningLanguage)}`] ||
              category[`nameEn`]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component="a"
          href={`/#/category/${category.id}`}
        >
          Ver
        </Button>

        {user && user.admin && (
          <Button
            size="small"
            color="primary"
            component="a"
            href={`/#/category-update/${category.id}`}
          >
            Editar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ShowCategory;
