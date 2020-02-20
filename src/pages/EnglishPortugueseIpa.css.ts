import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  container: {
    padding: '20px 20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));
