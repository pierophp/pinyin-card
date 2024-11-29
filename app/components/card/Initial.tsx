import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Link } from "react-router";
import ShowCategory from "../category/ShowCategory";
import {
  IconButton,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CategoryDTO } from "~/types/CategoryDTO";
import { CardDTO } from "~/types/CardDTO";
import { Button } from "../ui/button";
import { Gamepad2Icon, ImagesIcon } from "lucide-react";

const headCells = [
  {
    id: "nameEn",
    numeric: false,
    label: "Inglês",
  },
  { id: "namePt", numeric: false, label: "Português" },
  { id: "nameCht", numeric: false, label: "Chinês (Trad.)" },
  { id: "nameChs", numeric: false, label: "Chinês (Simp.)" },
  { id: "pinyin", numeric: false, label: "Pinyin" },
  { id: "nameIt", numeric: false, label: "Italiano" },
  { id: "nameFr", numeric: false, label: "Francês" },
  { id: "nameDe", numeric: false, label: "Alemão" },
];

type Props = {
  cards: CardDTO[];
  categories: CategoryDTO[];
  currentCategory: CategoryDTO | null;
  user: any;
};

const Initial = (props: Props) => {
  // const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  // const [orderBy, setOrderBy] = React.useState("nameEn");

  // const handleRequestSort = (property: string) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const createSortHandler = (property: any) => () => {
  //   handleRequestSort(property);
  // };

  // function descendingComparator(a: any, b: any, orderBy: any) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // function getComparator(order: string, orderBy: string) {
  //   return order === "desc"
  //     ? (a: any, b: any) => descendingComparator(a, b, orderBy)
  //     : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  // }

  // function stableSort(array: any, comparator: any) {
  //   const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  //   stabilizedThis.sort((a: any, b: any) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el: any) => el[0]);
  // }

  const { cards, categories, currentCategory, user } = props;
  const showCreateCardButton =
    user?.admin && currentCategory && categories.length === 0;
  const showCreateCategoryButton = user?.admin && cards.length === 0;

  return (
    <>
      <div className="p-3 pb-12">
        <div className="container mx-auto py-8">
          {currentCategory && (
            <h1 className="text-3xl font-bold mb-6 text-center">
              {currentCategory.translatedtitle} {`(${cards.length})`}
            </h1>
          )}

          {categories && categories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
              {categories.map((category: any) => (
                <ShowCategory
                  category={category}
                  user={user}
                  key={category.id}
                />
              ))}
            </div>
          )}
        </div>

        {currentCategory && (
          <>
            <div className="flex gap-1">
              {cards.length > 0 && (
                <Button asChild>
                  <Link to={`/category/${currentCategory.id}/game`}>
                    <Gamepad2Icon />
                    Jogar
                  </Link>
                </Button>
              )}

              {cards.length > 0 && (
                <Button color="success" asChild>
                  <Link to={`/category/${currentCategory.id}/presentation`}>
                    <ImagesIcon />
                    Apresentação
                  </Link>
                </Button>
              )}
            </div>
            <div>
              {/* {user && user.admin && cards.length > 0 && (
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? "right" : "left"}
                         
                        >
                         
                        </TableCell>
                      ))}

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {cards.map((card: any) => (
                      <TableRow key={card.id}>
                        <TableCell component="th" scope="row">
                          {card.nameEn}
                          {!card.audioEn && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          {card.namePt}
                          {!card.audioPt && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          {card.nameCht}{" "}
                          {!card.audioCh && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>{card.nameChs}</TableCell>
                        <TableCell>{card.pinyin}</TableCell>
                        <TableCell>
                          {card.nameIt}
                          {!card.audioIt && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          {card.nameFr}
                          {!card.audioFr && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          {card.nameDe}
                          {!card.audioDe && (
                            <VolumeOffIcon fontSize="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="a"
                            href={`/card-update/${card.id}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )} */}
            </div>
          </>
        )}
      </div>

      {/* {showCreateCardButton && (
        <div className="fixed bottom-5 right-6">
          <Link to={`/card-create/${currentCategory.id}`}>
            <Fab color="primary" variant="extended" aria-label="add card">
              <AddIcon sx={{ mr: 1 }} />
              Card
            </Fab>
          </Link>
        </div>
      )} */}

      {/* {showCreateCategoryButton && (
        <div
          className={`fixed right-6 ${
            showCreateCardButton ? "bottom-20" : "bottom-5"
          }`}
        >
          <Link to={`/category-create`}>
            <Fab color="secondary" variant="extended" aria-label="add category">
              <AddIcon sx={{ mr: 1 }} />
              Category
            </Fab>
          </Link>
        </div>
      )} */}
    </>
  );
};

export default Initial;
