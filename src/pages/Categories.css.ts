import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  container: {
    padding: '20px 20px',
  },
  categoriesContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
  box: {
    border: '1px solid #ccc',
    height: '80px',
    width: '80px',
    margin: '10px',
    textAlign: 'center',
  },
}));
