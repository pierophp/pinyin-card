import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const WeakVowels = () => {
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
          <TableCell>ə</TableCell>
          <TableCell>
            COMM<b>A</b>, <b>a</b>bout
          </TableCell>
          <TableCell>
            Schwa
            <br />c<b>a</b>ma
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ər</TableCell>
          <TableCell>
            LETT<b>ER</b>, forw<b>ar</b>d, hist<b>or</b>y
          </TableCell>
          <TableCell>
            âmb<b>ar</b>, <b>ar</b>ca
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ɪ</TableCell>
          <TableCell>
            <b>e</b>dition, rabb<b>i</b>t, Lat<b>i</b>n, heat<b>i</b>ng
          </TableCell>
          <TableCell>
            abr<b>i</b>, ju<b>i</b>z<br />
            (boca bem relachada)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>oʊ</TableCell>
          <TableCell>
            mott<b>o</b>, retr<b>o</b>active, foll<b>ow</b>er
          </TableCell>
          <TableCell>???????</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i</TableCell>
          <TableCell>
            HAPP<b>Y</b>, med<b>i</b>ocre
          </TableCell>
          <TableCell>
            abr<b>i</b>, ju<b>iz</b>
            <br />
            (boca bem fechada)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>iə</TableCell>
          <TableCell>
            Californ<b>ia</b>
          </TableCell>
          <TableCell>
            p<b>ia</b>, af<b>ia</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>u</TableCell>
          <TableCell>
            fr<b>u</b>ition
          </TableCell>
          <TableCell>
            U longo, como se fosse "uw", com um pouco de biquinho <br />
            <b>ú</b>til, br<b>uta</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>uə</TableCell>
          <TableCell>
            infl<b>ue</b>nce
          </TableCell>
          <TableCell>
            s<b>ua</b>, at<b>ua</b>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default WeakVowels;
