import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  body2: {
    textAlign: 'left'
  }
});

const Post = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.body2}>
          {props.content}
        </Typography>
      </CardContent>
      {props.isLoggedIn ?
        <CardActions>
          <Button variant="contained" color="secondary" size="small" onClick={() => {props.deleteButtonClicked(props.id) }}>Delete</Button>
          <Button variant="contained" color="primary" size="small" onClick={() => props.editButtonClicked(props.id)}>Edit</Button>
        </CardActions>
      : null}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(Post);
