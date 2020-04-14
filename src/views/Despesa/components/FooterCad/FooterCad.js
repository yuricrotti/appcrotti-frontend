import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import { Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel 

} from '@material-ui/core';







const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));



const FooterCad = props => {
    const { className, ...rest } = props;
    const classes = useStyles();


    const onSubmit = (event) => {

      event.preventDefault();
      props.despesa.parcelas_despesa = props.parcelas;
      console.log(props)
      props.salvar(props.despesa)
      props.limpar_parcela()
      props.limpar_despesa()
      props.carregaParcelas()
        

    }



    return ( 
    
      <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit} >
        
        <Card className={classes.root} variant="outlined">
          <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              
              </Typography>
              <Grid container spacing={3}>
     
                   
                  <Grid item xs={3}>
                      
                      <Button variant="contained" color="primary" type="submit" >
                          Salvar
                      </Button>
                  </Grid>



                 
  
              </Grid>
          </CardContent>
        </Card>  
       
      </form>
      
);



}

FooterCad.propTypes = {
    className: PropTypes.string
  };
  
  export default FooterCad;