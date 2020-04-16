import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Button,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
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



const FiltroVenda = props => {
  const {className} = props;
  
  const classes = useStyles();
  const [forn,setForn] = useState([])
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const toggleChecked = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [periodo, setPerido] = React.useState('Todas');
  const [status, setStatus] = React.useState({
    aberto: true,
    paga: false,
  });

  const [clientes, setClientes] = useState([])
  const [cliente_venda, setClientevenda] = useState([])
  const [data_venda_inicial, set_Data_venda_inicial] = useState([])
  const [data_venda_final, set_Data_venda_final] = useState([])


  useEffect(() => {
    setClientes(props.clientes)
  }, [props.clientes] )



  const { aberto, paga } = status;
  
  const PeriodoChange = event => {
    if(event.target.value=="Todas"){
        set_Data_venda_inicial([])
        set_Data_venda_final([])
    }  
    setPerido(event.target.value);
  };
  const StatusChange = event => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };

  

  const onSubmit = (event) => {

    event.preventDefault();
    var filtros = {}
    var listafiltros = []
    var teste = ""
    
     
        if(periodo === "Mês"){
          filtros.data_venda = data_venda_inicial + "," + data_venda_final
          filtros.cond1 = "$gte"
          filtros.cond2 = "$lt"
          listafiltros.push(filtros)
          filtros = {}
        }
        
        if(status.aberto == true && status.paga == false){
          filtros.status_venda =  'E'
          filtros.cond1 = "$eq"
          } else if (status.aberto == false && status.paga == true){
                filtros.status_venda = 'P'
                filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
    
        if(cliente_venda.length !== 0){
            filtros.cliente_venda = cliente_venda
            filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
        console.log(listafiltros)
       
        props.listar_vendas_filtros(listafiltros)
       // props.listar_despesas_filtros()


  }
   

  
  return (

        <form onSubmit={e=> onSubmit(e)}>
            <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Filtros para Vendas
                        </Typography>
                        
                        <Grid container spacing={3}>
                            
                       
                            <Grid item xs={6}>
                                <Card className={classes.root} variant="outlined" fullWidth>
                                        <CardContent>

                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormLabel component="legend">Status</FormLabel>
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox checked={aberto} onChange={StatusChange} name="aberto" />}
                                                    label="em Aberto"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={paga} onChange={StatusChange} name="paga" />}
                                                    label="Paga"
                                                />
                                                </FormGroup>
                                               
                                            </FormControl>

                                            <FormControl fullWidth component="fieldset" className={classes.formControl}>
                                                
                                                <InputLabel id="lable_clientes">Clientes</InputLabel>
                                                        <Select
                                                        fullWidth
                                                        value = {cliente_venda} 
                                                        onChange= {e => setClientevenda(e.target.value)}
                                                        >
                                                            {clientes != []  ?  clientes.map( (cliente,index) =>{
                                                            return <MenuItem key={index} value={cliente}>{cliente.nome_cliente}</MenuItem>
                                                            }):<MenuItem></MenuItem>
                                                            }
                                                        </Select>
                                                                        
                                                </FormControl>
                                            
                                        </CardContent>  
                                </Card>
                            </Grid>

                            <Grid item xs={3}>
                                <Card className={classes.root} variant="outlined" fullWidth>
                                            <CardContent>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Período</FormLabel>
                                                    <RadioGroup aria-label="gender" name="periodo" value={periodo} onChange={PeriodoChange}>
                                                        <FormControlLabel value="Mês" control={<Radio />} label="Mês" />
                                                        <FormControlLabel value="Todas" control={<Radio />} label="Todas" />                                              
                                                    </RadioGroup>

                              
                                                </FormControl>
                                                
                                            </CardContent>  
                                    </Card>
                                
                            </Grid>


                            <Grid item xs={3}>
                                <Card className={classes.root} variant="outlined" fullWidth>
                                            <CardContent>
                                                <FormControl component="fieldset">
                                                  
                                                    <TextField
                                                        disabled  = {periodo !== "Mês" ? true : false}
                                                        name="data_venda_inicial"
                                                        label="Mês inicial venda *"
                                                        type="date"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={data_venda_inicial}
                                                        onChange={e => set_Data_venda_inicial(e.target.value)}
                                                    />

                                                      <TextField
                                                        disabled  = {periodo !== "Mês" ? true : false}
                                                        name="data_venda_final"
                                                        label="Mês final venda *"
                                                        type="date"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={data_venda_final}
                                                        onChange={e => set_Data_venda_final(e.target.value)}
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

FiltroVenda.propTypes = {
  className: PropTypes.string,

};

export default FiltroVenda;