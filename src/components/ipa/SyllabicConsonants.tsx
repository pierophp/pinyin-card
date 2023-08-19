import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
