import React from 'react';
import useStyles from './EnglishPortugueseIpa.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Consonants from '../components/ipa/Consonants';
import StrongVowels from '../components/ipa/StrongVowels';
import WeakVowels from '../components/ipa/WeakVowels';

const EnglishPortugueseIpa = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant="h5" component="h2">
        Consoantes
      </Typography>
      <Consonants />
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2">
        Vogais Fortes
      </Typography>
      <StrongVowels />
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2">
        Vogais Fracas
      </Typography>
      <WeakVowels />
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2">
        Consoante silábica
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
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:AFI_para_ingl%C3%AAs"
        target="_blank"
      >
        Português
      </a>
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Alfabeto_fon%C3%A9tico_internacional"
        target="_blank"
      >
        Explicação
      </a>
      <a href="https://www.youtube.com/watch?v=9E6F57s-V7U">You Tube Vogais</a>
    </div>
  );
};

export default EnglishPortugueseIpa;
