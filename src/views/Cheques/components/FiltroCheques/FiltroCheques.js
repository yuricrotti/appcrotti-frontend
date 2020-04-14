import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  TextField

} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const FiltroCheques = props => {
  const {className} = props;
  
  const classes = useStyles();

  const [periodo, set_perido] = React.useState('Todas');
  const [data_venda, set_data_venda] = useState([])

  
  const periodo_change = event => {
    if(event.target.value=="Todas"){
        set_data_venda([])
    }  
    set_perido(event.target.value);
  };
 
  const onSubmit = (event) => {

    event.preventDefault();
    var filtros = {}
    var listafiltros = []
 
    if(periodo === "Mês"){
      filtros.data_cheque = data_venda
      filtros.cond1 = "$gte"
      filtros.cond2 = "$lt"
      listafiltros.push(filtros)
      filtros = {}
    }     
    props.listar_cheque_filtros(listafiltros)
  }

  return (
    <form onSubmit={e=> onSubmit(e)}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              Filtros para Cheques
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card className={classes.root} variant="outlined" fullWidth>
                <CardContent>
                  <FormControl component="fieldset">
                      <FormLabel component="legend">Período</FormLabel>
                      <RadioGroup aria-label="gender" name="periodo" value={periodo} onChange={periodo_change}>
                          <FormControlLabel value="Mês" control={<Radio />} label="Mês" />
                          <FormControlLabel value="Todas" control={<Radio />} label="Todas" />                                              
                      </RadioGroup>

                      <TextField
                          disabled  = {periodo !== "Mês" ? true : false}
                          name="data_venda"
                          label="Mês da Venda *"
                          type="date"
                          className={classes.textField}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          value={data_venda}
                          onChange={e => set_data_venda(e.target.value)}
                      />
                  </FormControl>
                </CardContent>  
              </Card>
            </Grid>

            <Grid item xs={2}>
            <Button fullWidth  type="submit" variant="contained" color="primary">
                    Pesquisar
            </Button>
            </Grid>
          </Grid>
        </CardContent>  
      </Card>
    </form>
  );
};

FiltroCheques.propTypes = {
  className: PropTypes.string,

};

export default FiltroCheques;