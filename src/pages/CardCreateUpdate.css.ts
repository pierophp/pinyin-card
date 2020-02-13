import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  container: {
    padding: '20px 20px',
  },
  input: {
    width: '150px',
    margin: '5px 3px !important',
  },
  inputChinese: {
    width: '100px',
    margin: '5px 3px !important',
  },
  link: {
    margin: '3px 3px !important',
    textDecoration: 'none',
  },
  image: {
    backgroundColor: '#000',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'auto 100px',
    height: '100px',
    width: '190px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));
