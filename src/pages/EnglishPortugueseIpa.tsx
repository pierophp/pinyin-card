import React from 'react';
import useStyles from './EnglishPortugueseIpa.css';
import Typography from '@material-ui/core/Typography';
import Consonants from '../components/ipa/Consonants';
import SyllabicConsonants from '../components/ipa/SyllabicConsonants';
import StrongVowels from '../components/ipa/StrongVowels';
import WeakVowels from '../components/ipa/WeakVowels';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const EnglishPortugueseIpa = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('');

  const handleChangeExpanded = (newExpanded: any) => {
    setExpanded(newExpanded !== expanded ? newExpanded : false);
  };

  return (
    <div className={classes.container}>
      <ExpansionPanel
        square
        expanded={expanded === 'consonants'}
        onChange={() => handleChangeExpanded('consonants')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Consoantes</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Consonants />]{' '}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === 'strongVowels'}
        onChange={() => handleChangeExpanded('strongVowels')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Vogais Fortes</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StrongVowels />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === 'weakVowels'}
        onChange={() => handleChangeExpanded('weakVowels')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Vogais Fracas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <WeakVowels />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === 'syllabicConsonants'}
        onChange={() => handleChangeExpanded('syllabicConsonants')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Consoante silábica
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SyllabicConsonants />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2"></Typography>
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
