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
import { Link } from "react-router";
import { Play } from "lucide-react";
import { CategoryDTO } from "~/types/CategoryDTO";

type Props = {
  category: CategoryDTO;
  user: any;
};

const ShowCategory = (props: Props) => {
  const { category, user } = props;
  const configuration = getConfiguration();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          <span className="block">{category.learningTitle}</span>
          <span className="block text-gray-500">
            {category.translatedtitle}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex justify-between">
        <Button color="primary" asChild>
          <Link to={`/category/${category.id}`}>
            <Play />
            Ver
          </Link>
        </Button>
        {user && user.admin && (
          <Button size="sm" color="primary">
            Editar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShowCategory;
