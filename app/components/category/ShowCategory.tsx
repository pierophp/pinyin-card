import upperFirst from "lodash/upperFirst";
import getConfiguration from "../../helpers/get.configuration";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const ShowCategory = (props: any) => {
  const { category, user } = props;
  const configuration = getConfiguration();

  return (
    <Card>
      {/* <CardActionArea
        onClick={() => (window.location.hash = `/category/${category.id}`)}
      > */}
      {/*         
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        /> */}

      <CardHeader>
        <CardTitle>{category.namePt}</CardTitle>
      </CardHeader>

      <CardContent>
        {category[`name${upperFirst(configuration.learningLanguage)}`] ||
          category[`nameEn`]}
      </CardContent>
      {/* </CardActionArea> */}
      <CardFooter>
        <Button
          size="sm"
          color="primary"
          // component="a"
          // href={`/category/${category.id}`}
        >
          Ver
        </Button>

        {user && user.admin && (
          <Button
            size="sm"
            color="primary"
            // href={`/category-update/${category.id}`}
          >
            Editar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShowCategory;
