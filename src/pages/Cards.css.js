import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  cardContainer: {
    backgroundColor: '#000',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: 'calc(100vh - 56px)',
    width: '100%',
    position: 'relative',
  },
  landscape: {
    backgroundSize: 'auto 100vh',
  },
  portrait: {
    backgroundSize: '100vw auto',
  },
  informationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '150px',
    height: '75px',
    textAlign: 'center',
    position: 'absolute',
    left: 70,
    bottom: 20,
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
  pinyin: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: '25px',
  },
  containerClick: {
    display: 'flex',
  },
  leftClick: {
    width: '50%',
    height: 'calc(100vh - 56px)',
  },
  rightClick: {
    width: '50%',
    height: 'calc(100vh - 56px)',
  },
}));
