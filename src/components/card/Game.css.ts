import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: 'calc(50vh - (56px / 2) - 4px)',
    width: 'calc(50% - 4px)',
    position: 'relative',
    margin: 'auto',
  },
  cardContainerAnswer: {
    width: '100%',
  },
  cardContainerOption: {
    border: '2px solid #000',
    '&:hover': {
      border: '2px solid #0043ff',
    },
  },
  landscape: {
    backgroundSize: 'auto 50vh',
  },
  portrait: {
    backgroundSize: '50vw auto',
  },
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  informationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '180px',
    minHeight: '75px',
    textAlign: 'center',
    margin: 'auto',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: '25px',
  },
  translationTitle: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: '25px',
  },
  pronunciation: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: '25px',
  },
  containerClick: {
    display: 'flex',
  },

  container: {},

  rightAnswer: {
    color: 'green',
  },
  wrongAnswer: {
    color: 'red',
  },
  genderM: {
    color: '#0c5caf',
  },
  genderF: {
    color: '#cc2c2c',
  },
  genderN: {
    color: '#a8fd5a',
  },
}));
