import { makeStyles } from '@material-ui/core/styles';
import useStyles from './Initial.css';
export default makeStyles(theme => ({
  container: {
    padding: '20px 20px',
  },
  categoriesContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
