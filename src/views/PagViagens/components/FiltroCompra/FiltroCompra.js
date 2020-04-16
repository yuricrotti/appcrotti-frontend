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



const FiltroCompra = props => {
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

  const [fornecedores, setFornecedores] = useState([])
  const [fornecedor_compra, setFornecedorcompra] = useState([])
  const [data_compra_inicial, set_Data_compra_inicial] = useState([])
  const [data_compra_final, set_Data_compra_final] = useState([])


  useEffect(() => {
    setFornecedores(props.fornecedores)
  }, [props.fornecedores] )



  const { aberto, paga } = status;
  
  const PeriodoChange = event => {
    if(event.target.value=="Todas"){
        set_Data_compra_inicial([])
        set_Data_compra_final([])
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
    
    
     
        if(periodo === "Mês"){
          filtros.data_compra =  data_compra_inicial + "," + data_compra_final
          filtros.cond1 = "$gte"
          filtros.cond2 = "$lt"
          listafiltros.push(filtros)
          filtros = {}
        }
        
        if(status.aberto == true && status.paga == false){
          filtros.status_compra =  'E'
          filtros.cond1 = "$eq"
          } else if (status.aberto == false && status.paga == true){
                filtros.status_compra = 'P'
                filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
    
        if(fornecedores.length !== 0){
            filtros.fornecedor_compra = fornecedor_compra
            filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
        console.log(listafiltros)
        props.listar_compras_filtros(listafiltros)
        //props.listar_despesas_filtros()


  }
   

  
  return (

        <form onSubmit={e=> onSubmit(e)}>
            <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Filtros para Compras
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
                                                
                                                <InputLabel id="lable_fornecedores">Fornecedores</InputLabel>
                                                        <Select
                                                        fullWidth
                                                        value = {fornecedor_compra} 
                                                        onChange= {e => setFornecedorcompra(e.target.value)}
                                                        >
                                                           {fornecedores != []  ?  fornecedores.map( (fornecedor,index) =>{
                                                            return <MenuItem key={index} value={fornecedor}>{fornecedor.nome_fornecedor}</MenuItem>
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
                                                        name="data_compra_inicial"
                                                        label="Mês inicial compra *"
                                                        type="date"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={data_compra_inicial}
                                                        onChange={e => set_Data_compra_inicial(e.target.value)}
                                                    />

                                                      <TextField
                                                        disabled  = {periodo !== "Mês" ? true : false}
                                                        name="data_compra_final"
                                                        label="Mês final compra *"
                                                        type="date"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={data_compra_final}
                                                        onChange={e => set_Data_compra_final(e.target.value)}
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

FiltroCompra.propTypes = {
  className: PropTypes.string,

};

export default FiltroCompra;