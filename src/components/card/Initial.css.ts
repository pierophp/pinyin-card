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
}));
