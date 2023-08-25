import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Link } from "react-router-dom";
import ShowCategory from "../category/ShowCategory";
import {
  Button,
  IconButton,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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

const Initial = (props: any) => {
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
        {currentCategory && (
          <Typography variant="h4" component="h4">
            {currentCategory.namePt} {`(${cards.length})`}
          </Typography>
        )}

        {categories && categories.length > 0 && (
          <>
            <div className="flex flex-wrap">
              {categories.map((category: any) => (
                <ShowCategory
                  category={category}
                  user={user}
                  key={category.id}
                />
              ))}
            </div>
          </>
        )}

        {currentCategory && (
          <>
            <div className="flex gap-1">
              {cards.length > 0 && (
                <Link to={`/category/${currentCategory.id}/game`}>
                  <Button variant="outlined" startIcon={<VideogameAssetIcon />}>
                    Jogar
                  </Button>
                </Link>
              )}

              {cards.length > 0 && (
                <Link to={`/category/${currentCategory.id}/presentation`}>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<SlideshowIcon />}
                  >
                    Apresentação
                  </Button>
                </Link>
              )}
            </div>
            <div>
              {user && user.admin && cards.length > 0 && (
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? "right" : "left"}
                          // sortDirection={orderBy === headCell.id ? order : false}
                        >
                          {/* <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </span>
                          ) : null}
                        </TableSortLabel> */}
                        </TableCell>
                      ))}

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {stableSort(cards, getComparator(order, orderBy)).map( */}
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
              )}
            </div>
          </>
        )}
      </div>

      {showCreateCardButton && (
        <div className="fixed bottom-5 right-6">
          <Link to={`/card-create/${currentCategory.id}`}>
            <Fab color="primary" variant="extended" aria-label="add card">
              <AddIcon sx={{ mr: 1 }} />
              Card
            </Fab>
          </Link>
        </div>
      )}

      {showCreateCategoryButton && (
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
      )}
    </>
  );
};

export default Initial;
