import React from 'react';
import useStyles from './EnglishPortugueseIpa.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const EnglishPortugueseIpa = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant="h5" component="h2">
        Consoantes
      </Typography>
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
            <TableCell>b</TableCell>
            <TableCell>
              <b>b</b>uy, <b>c</b>ab
            </TableCell>
            <TableCell>
              <b>b</b>eiço, âm<b>b</b>ar, so<b>b</b>, ca<b>b</b>eça, so<b>b</b>
              re
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>d</TableCell>
            <TableCell>
              <b>d</b>ye, ca<b>d</b>, la<b>dd</b>er
            </TableCell>
            <TableCell>
              ce<b>d</b>o, i<b>d</b>ade, <b>d</b>edo, len<b>d</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>dj</TableCell>
            <TableCell>
              <b>d</b>ew
            </TableCell>
            <TableCell>???</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>dʒ</TableCell>
            <TableCell>
              <b>g</b>iant, ba<b>dg</b>e
            </TableCell>
            <TableCell>
              <b>d</b>igo, an<b>d</b>e, bal<b>d</b>e
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ð</TableCell>
            <TableCell>
              <b>th</b>y, brea<b>th</b>e, fa<b>th</b>er
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <b>Fontes:</b>{' '}
      <a href="https://en.wikipedia.org/wiki/Help:IPA/English" target="_blank">
        Inglês
      </a>
      ,{' '}
      <a
        href="https://en.wikipedia.org/wiki/Help:IPA/Portuguese"
        target="_blank"
      >
        Português
      </a>
    </div>
  );
};

export default EnglishPortugueseIpa;
