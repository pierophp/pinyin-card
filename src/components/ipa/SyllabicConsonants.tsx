import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const SyllabicConsonants = () => {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>IPA</TableCell>
          <TableCell>Inglês</TableCell>
          <TableCell>Português</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>əl</TableCell>
          <TableCell>
            bott<b>le</b>
          </TableCell>
          <TableCell>
            Goog<b>le</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ən</TableCell>
          <TableCell>
            butt<b>on</b>
          </TableCell>
          <TableCell>
            arf<b>am</b>, órf<b>ão</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>əm</TableCell>
          <TableCell>
            rhyth<b>m</b>
          </TableCell>
          <TableCell>
            arf<b>am</b>, órf<b>ão</b>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default SyllabicConsonants;
