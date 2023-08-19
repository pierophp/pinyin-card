import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import React from "react";
import { Link } from "react-router-dom";
import ShowCategory from "../category/ShowCategory";
import useStyles from "./Initial.css";

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
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState("nameEn");
  const classes = useStyles();

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property: any) => () => {
    handleRequestSort(property);
  };

  function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: string, orderBy: string) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }

  const { cards, categories, currentCategory, user } = props;
  return (
    <div className={classes.container}>
      {currentCategory && (
        <Typography variant="h4" component="h4">
          {currentCategory.namePt} {`(${cards.length})`}
        </Typography>
      )}

      {categories && categories.length > 0 && (
        <>
          {user && user.admin && (
            <Link to={`/category-create`}>
              <Button color="primary" variant="contained">
                Adicionar Categoria
              </Button>
            </Link>
          )}

          <div className={classes.categoriesContainer}>
            {categories.map((category: any) => (
              <ShowCategory category={category} user={user} />
            ))}
          </div>
        </>
      )}

      {currentCategory && (
        <>
          <div>
            {cards.length > 0 && (
              <Link to={`/category/${currentCategory.id}/presentation`}>
                <Button color="primary" variant="contained">
                  Apresentação
                </Button>
              </Link>
            )}

            {cards.length > 0 && (
              <Link to={`/category/${currentCategory.id}/game`}>
                <Button color="primary" variant="contained">
                  Jogar
                </Button>
              </Link>
            )}

            {user && user.admin && (
              <Link to={`/card-create/${currentCategory.id}`}>
                <Button variant="contained">Adicionar</Button>
              </Link>
            )}

            {user && user.admin && cards.length > 0 && (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
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
                        </TableSortLabel>
                      </TableCell>
                    ))}

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(cards, getComparator(order, orderBy)).map(
                    (card: any) => (
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
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Initial;
