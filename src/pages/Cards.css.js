import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  cardContainer: {
    backgroundColor: '#000',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'auto 100vh',
    height: 'calc(100vh - 65px)',
    width: '100%',
    position: 'relative',
  },
  informationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '150px',
    height: '100px',
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
}));
