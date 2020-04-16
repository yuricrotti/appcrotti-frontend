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



const FiltroPag = props => {
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
  const [tipo, setTipo] = React.useState('Parcelas');
  const [periodo, setPerido] = React.useState('Todas');
  const [status, setStatus] = React.useState({
    aberto: true,
    paga: false,
  });

  const [fornecedores, setFornecedores] = useState([])
  const [fornecedor_despesa, setFornecedoresdespesa] = useState([])
  const [data_pagamento_inicial, set_Data_pagamento_inicial] = useState([])
  const [data_pagamento_final, set_Data_pagamento_final] = useState([])


  useEffect(() => {
    setFornecedores(props.fornecedores)
  }, [props.fornecedores] )



  const { aberto, paga } = status;
  const TipoChange = event => {
    setTipo(event.target.value);
  };
  const PeriodoChange = event => {
    if(event.target.value=="Todas"){
      set_Data_pagamento_inicial([])
      set_Data_pagamento_final([])
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
    
    
     if(tipo === "Parcelas" ){
        if(periodo === "Mês"){
          filtros.datapagamento_parcela = data_pagamento_inicial+","+data_pagamento_final
          filtros.cond1 = "$gte"
          filtros.cond2 = "$lt"
          listafiltros.push(filtros)
          filtros = {}
        }
        
        if(status.aberto == true && status.paga == false){
          filtros.status_parcela =  'E'
          filtros.cond1 = "$eq"
          } else if (status.aberto == false && status.paga == true){
                filtros.status_parcela = 'P'
                filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
    
        if(fornecedor_despesa !=[]){
            filtros.fornecedor_parcela = fornecedor_despesa
            filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
        props.setTipo_pagamento("Parcelas")
        props.listar_parcelas_filtros(listafiltros)
        props.listar_despesas_filtros()


     }else{
        if(periodo === "Mês"){
          filtros.datacad_despesa =  data_pagamento_inicial+","+data_pagamento_final
          filtros.cond1 = "$gte"
          filtros.cond2 = "$lt"
          listafiltros.push(filtros)
          filtros = {}
        }
    
        if(status.aberto == true && status.paga == false){
          filtros.status_despesa =  'E'
          filtros.cond1 = "$eq"
          } else if (status.aberto == false && status.paga == true){
                filtros.status_despesa = 'P'
                filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
    
        if(fornecedor_despesa !=[]){
            filtros.fornecedor_despesa = fornecedor_despesa
            filtros.cond1 = "$eq"
        }
        listafiltros.push(filtros)
        filtros = {}
        //console.log(listafiltros)
        props.setTipo_pagamento("Despesas")
        props.listar_despesas_filtros(listafiltros)
      

    }
    

   
  }
   

  
  return (

        <form onSubmit={e=> onSubmit(e)}>
            <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Filtros para Pagamentos
                        </Typography>
                        
                        <Grid container spacing={3}>
                            
                            <Grid item xs={4}>
                                <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Tipo</FormLabel>
                                                <RadioGroup aria-label="gender" name="tipo" value={tipo} onChange={TipoChange}>
                                                    <FormControlLabel value="Parcelas" control={<Radio />} label="Parcelas" />
                                                    <FormControlLabel value="Despesas" control={<Radio />} label="Despesas" />                                              
                                                </RadioGroup>
                                            </FormControl>
                                        </CardContent>  
                                </Card>
                            </Grid>
                            
                            <Grid item xs={4}>
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
                                                
                                                <InputLabel id="lable_tipo_despesa">Fornecedor</InputLabel>
                                                        <Select
                                                        fullWidth
                                                            value = {fornecedor_despesa} 
                                                            onChange= {e => setFornecedoresdespesa(e.target.value)}
                                                        >
                                                            {fornecedores != []  ?  fornecedores.map( (fornecedores,index) =>{
                                                            return <MenuItem key={index} value={fornecedores}>{fornecedores.nome_fornecedor}</MenuItem>
                                                            }):<MenuItem></MenuItem>
                                                            }
                                                        </Select>
                                                                        
                                                </FormControl>
                                            
                                        </CardContent>  
                                </Card>
                            </Grid>

                            <Grid item xs={2}>
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

                            <Grid item xs={2}>
                                <Card className={classes.root} variant="outlined" fullWidth>
                                            <CardContent>
                                                
                                            <TextField
                                              disabled  = {periodo !== "Mês" ? true : false}
                                              name="data_pagamento_inicial"
                                              label="Mês inicial pagamento *"
                                              type="date"
                                              className={classes.textField}
                                              InputLabelProps={{
                                                  shrink: true,
                                              }}
                                              value={data_pagamento_inicial}
                                              onChange={e => set_Data_pagamento_inicial(e.target.value)}
                                            />

                                            <TextField
                                              disabled  = {periodo !== "Mês" ? true : false}
                                              name="data_pagamento_final"
                                              label="Mês pagamento venda *"
                                              type="date"
                                              className={classes.textField}
                                              InputLabelProps={{
                                                  shrink: true,
                                              }}
                                              value={data_pagamento_final}
                                              onChange={e => set_Data_pagamento_final(e.target.value)}
                                            />    
                                                
                                                
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

FiltroPag.propTypes = {
  className: PropTypes.string,

};

export default FiltroPag;