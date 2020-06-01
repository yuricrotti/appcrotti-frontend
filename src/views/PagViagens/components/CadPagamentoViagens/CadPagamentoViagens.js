import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {CadCheque} from '../../../Receber/components/CadCheque'

import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {TableCheques} from '../';
import { 
  adicionar_lista_cheque,
  salvar_cheque,
  limpar_lista_cheque,
  listar_cheque_filtros,
  alterarstatus_cheque,
} from '../../../../store/chequeReducer'

import { 
  salvar_dinheiro,
  limpar_dinheiro,
} from '../../../../store/dinheiroReducer'

import { 
  salvar_pagamento,
  limpar_pagamento,
  
} from '../../../../store/pagamentoReducer'

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
  TextField,
  IconButton,

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



const CadPagamentoViagens = props => {
  const {className} = props;
  
  const classes = useStyles();
 
  const [tipo_pagamento, setTipo_pagamento] = React.useState({
    dinheiro: true,
    cheque: false,
  });
  const { dinheiro, cheque } = tipo_pagamento;
  const [valor_cheques,setValor_Cheques] = useState(0)
  const [valor_dinheiro,setValor_dinheiro] = useState(0)
  const [lista_cheques,setLista_Cheques]= useState([])
  const [data_pagamento,setData_pagamento] = useState()

 const [lista_pagarviagens,setlista_pagarviagens] = useState(null)
  const tipo_pagamento_change = event => {
    setTipo_pagamento({ ...tipo_pagamento, [event.target.name]: event.target.checked });
  };

  
useEffect(() => {
   


  var total = 0.0
    if(lista_cheques.length!==0){
     // console.log(props.vendas)
     var cheques = lista_cheques
     cheques.forEach(function(cheque, indice) {
      
       total =  total + cheque.valor_cheque
      
    });
    
  }
  setValor_Cheques(total);
       

}, [lista_cheques] )

  const calcula_total = (lista_pagamentos) =>{
    //console.log(typeof(lista_recebimentos))
    var valor_total_compra = 0
    lista_pagamentos.forEach(function(pagamento, indice) {
        valor_total_compra = valor_total_compra + pagamento.valor_total_compra;
  });
    //console.log(valor_total_venda)
    return valor_total_compra
 }

  const carrega_cheque = () =>{
    var filtros = {}
    var listafiltros = []
    filtros.status_cheque =  'E'
    filtros.cond1 = "$eq"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_cheque_filtros(listafiltros)

  }

  const adicionar_lista_cheques = (lista) =>{
    console.log(lista)
    setLista_Cheques(lista)
  }




  const onSubmit = (event) => {

    event.preventDefault();

    //altera status
    var pagamento = {}
 
    if(lista_cheques.length!==0){
        pagamento.cheque_pagamento = lista_cheques
      var cheques = lista_cheques
      cheques.forEach(function(cheque, indice) {
         props.alterarstatus_cheque(cheque.id_cheque,cheque.status_cheque)
         //console.log(cheque)
      });
    }

    if(tipo_pagamento.dinheiro===true){

      var dinheiro = {
        id_dinheiro : parseInt(Date.now()),
        valor_dinheiro: valor_dinheiro,
        data_dinheiro: data_pagamento,
        status_dinheiro: 'P'
      }
      pagamento.dinheiro_pagamento = dinheiro
     props.salvar_dinheiro(dinheiro)

    }


    pagamento.id_pagamento = parseInt(Date.now())
    pagamento.data_pagamento = data_pagamento
    pagamento.compra_pagamento =  props.lista_pagar
    pagamento.status_pagamento= "E"
    props.salvar_pagamento(pagamento)
   
    props.lista_pagar.forEach(function(compra, indice) {
       //console.log(compra)
       props.alterarstatus_compra(compra.id_compra,compra.status_compra)
    });
    
    props.adicionar_lista_pagar(null)
    props.limpar_lista_cheque()
    props.limpar_dinheiro()
    props.limpar_pagamento()
    setValor_Cheques(0)
    setValor_dinheiro(0)
    setLista_Cheques([])
    
    
    //alterar status das viagens
    //cadastrar chuques e dinheiro
    //cadastrar recebimentos 

  }

  function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth() + 1 ).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+(mesF)+"-"+diaF;
}
   

  
  return (

        <form onSubmit={e=> onSubmit(e)}>
            <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Pagamentos
                        </Typography>
                        
                                       
                        <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                      fullWidth
                                      disabled = {true}
                                      label="Valor Total"
                                      name="valor_total"
                                      className={classes.textField}
                                      value={calcula_total(props.lista_pagar)}
                                      onChange={null}
                                                                          
                            />
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Formas de Pagamento:
                            </Typography>
                            <FormControlLabel
                                control={<Checkbox checked={dinheiro} onChange={tipo_pagamento_change} name="dinheiro" />}
                                label="Dinheiro"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={cheque} onChange={tipo_pagamento_change} name="cheque" />}
                                label="Cheque"
                            />
                            
                        </Grid>
                        <Grid item xs={3}>
                            {tipo_pagamento.dinheiro === true ? 
                                    <TextField
                                        fullWidth
                                        label="Valor em Dinheiro"
                                        name="valor_dinheiro"
                                        className={classes.textField}
                                        value={valor_dinheiro}
                                        onChange={(e)=> setValor_dinheiro(e.target.value)}
                                    
                                        
                                    />
                                
                                :<h1></h1>}
                           
                        </Grid>

                        <Grid item xs={3}>
                            {tipo_pagamento.cheque === true ? 
                                    <TextField
                                        fullWidth
                                        label="Valor em Cheques"
                                        name="numero_cheques"
                                        className={classes.textField}
                                        value={valor_cheques}
                                       // onChange={(e)=> setNumero_Cheques(e.target.value)}
                                    
                                        
                                    />
                                
                                :<h1></h1>}
                            
                        </Grid>
                      

                        <Grid item xs={3}>
                          <TextField
                             
                              name="data_pagamento"
                              label="Data do Pagamento: *"
                              type="date"
                              defaultValue = {dataAtualFormatada()}
                              className={classes.textField}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              value={data_pagamento}
                              onChange={e => setData_pagamento(e.target.value)}
                          />
                          
                            
                        </Grid>

                        <Grid item xs={3}>
                            <Button fullWidth disabled={tipo_pagamento.cheque !== true} onClick = {()=>carrega_cheque()} variant="contained" color="primary">
                                       Carregar Cheques
                            </Button>
                          
                            
                        </Grid>

                        <Grid item xs={3}>
                           
                            <Button fullWidth type="submit"  disabled={false } variant="contained" color="primary">
                                        Pagar
                            </Button>
                            
                        </Grid>

                    </Grid>            
                         
                </CardContent>  
            </Card>

              {tipo_pagamento.cheque !== false  ? 
                  <TableCheques cheques = {props.cheque} adicionar_lista_cheques= {adicionar_lista_cheques}></TableCheques>
                  :
                  <h1></h1>
              }   


        </form>
);



};

CadPagamentoViagens.propTypes = {
  className: PropTypes.string,

};

const mapStateToProps = state => ({
  cheque: state.cheque.cheque,
  dinheiro: state.dinheiro.dinheiro,
  recebimento: state.recebimento.recebimento
})

const mapDispatchToProps = dispatch => 
bindActionCreators({
  adicionar_lista_cheque,
  salvar_cheque,
  salvar_dinheiro,
  listar_cheque_filtros,
  salvar_pagamento,
  limpar_lista_cheque,
  limpar_dinheiro,
  limpar_pagamento,
  alterarstatus_cheque,

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(CadPagamentoViagens);
