import upperFirst from "lodash/upperFirst";
import getConfiguration from "../../helpers/get.configuration";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const ShowCategory = (props: any) => {
  const { category, user } = props;
  const configuration = getConfiguration();

  return (
    <Card>
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
          href={`/category/${category.id}`}
        >
          Ver
        </Button>

        {user && user.admin && (
          <Button
            size="small"
            color="primary"
            component="a"
            href={`/category-update/${category.id}`}
          >
            Editar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ShowCategory;
