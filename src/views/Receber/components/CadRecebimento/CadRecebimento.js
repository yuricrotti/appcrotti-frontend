import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {CadCheque} from '../CadCheque'

import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { 
  adicionar_lista_cheque,
  salvar_cheque,
  limpar_lista_cheque,
} from '../../../../store/chequeReducer'

import { 
  salvar_dinheiro,
  limpar_dinheiro,
} from '../../../../store/dinheiroReducer'

import { 
  salvar_recebimento,
  limpar_recebimento,
} from '../../../../store/recebimentoReducer'

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



const CadRecebimento = props => {
  const {className} = props;
  
  const classes = useStyles();
 
  const [tipo_pagamento, setTipo_pagamento] = React.useState({
    dinheiro: true,
    cheque: false,
  });
  const { dinheiro, cheque } = tipo_pagamento;
  const [numero_cheques,setNumero_Cheques] = useState(0)
  const [valor_dinheiro,setValor_dinheiro] = useState(0)
  const [cheques,setCheques]= useState([])
  const [data_recebimento,setData_recebimento] = useState()

 
  const tipo_pagamento_change = event => {
    setTipo_pagamento({ ...tipo_pagamento, [event.target.name]: event.target.checked });
  };

  
useEffect(() => {
   
  console.log(props.cheque)
  console.log(props.cheque.length)
  console.log(numero_cheques)

}, [props.cheque] )

  const calcula_total = (lista_recebimentos) =>{
    //console.log(typeof(lista_recebimentos))
    var valor_total_venda = 0
    lista_recebimentos.forEach(function(recebimento, indice) {
      valor_total_venda = valor_total_venda + recebimento.valor_total_venda;
  });
    //console.log(valor_total_venda)
    return valor_total_venda
 }
  const carrega_cheque = () =>{

    if(tipo_pagamento.cheque===true){
        
      var vetorCheques = [];
      setCheques([<h1></h1>])
      if(numero_cheques != 0){
          for (let index = 0; index < numero_cheques; index++) {
         // console.log("Cheque : "+index);
          vetorCheques.push(<CadCheque   tipo ='P' id_cheque = {index} adicionar_lista_cheque={ props.adicionar_lista_cheque}></CadCheque>);
          }
          setCheques(vetorCheques)
  
      }

  }


  }
  const onSubmit = (event) => {

    event.preventDefault();
    
    //salva os cheques
    var recebimento = {}

    if(props.cheque.length!==0){
      recebimento.cheque_recebimento = props.cheque 
      var cheques = props.cheque
      cheques.forEach(function(cheque, indice) {
        props.salvar_cheque(cheque)
      });
    }
    if(tipo_pagamento.dinheiro===true){

      var dinheiro = {
        id_dinheiro : parseInt(Date.now()),
        valor_dinheiro: valor_dinheiro,
        data_dinheiro: data_recebimento,
        status_dinheiro: 'E'
      }
      recebimento.dinheiro_recebimento = dinheiro
      props.salvar_dinheiro(dinheiro)

    }
    recebimento.id_recebimento = parseInt(Date.now())
    recebimento.data_recebimento = data_recebimento
    recebimento.venda_recebimento =  props.lista_receber 
    recebimento.status_recebimento = "E"
    props.salvar_recebimento(recebimento)
 
    props.lista_receber.forEach(function(venda, indice) {
     
      props.alterarstatus_venda(venda.id_venda,venda.status_venda)
    });

    props.adicionar_lista_receber(null)
    props.limpar_lista_cheque()
    props.limpar_dinheiro()
    props.limpar_recebimento()
    setNumero_Cheques(0)
    setValor_dinheiro(0)
    setCheques([])
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
                            Recebimentos
                        </Typography>
                        
                                       
                        <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                      fullWidth
                                      disabled = {true}
                                      label="Valor Total"
                                      name="valor_total"
                                      className={classes.textField}
                                      value={calcula_total(props.lista_receber)}
                                      onChange={null}
                                                                          
                            />
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Formas de Recebimento:
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
                                        label="Quantidade de Cheques"
                                        name="numero_cheques"
                                        className={classes.textField}
                                        value={numero_cheques}
                                        onChange={(e)=> setNumero_Cheques(e.target.value)}
                                    
                                        
                                    />
                                
                                :<h1></h1>}
                            
                        </Grid>

                        <Grid item xs={3}>
                          <TextField
                             
                              name="data_recebimento"
                              label="Data do Recebimento: *"
                              type="date"
                              defaultValue = {dataAtualFormatada()}
                              className={classes.textField}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              value={data_recebimento}
                              onChange={e => setData_recebimento(e.target.value)}
                          />
                          
                            
                        </Grid>

                        <Grid item xs={3}>
                            <Button fullWidth disabled={tipo_pagamento.cheque !== true} onClick = {()=>carrega_cheque()} variant="contained" color="primary">
                                       Gerar Cheques
                            </Button>
                          
                            
                        </Grid>

                        <Grid item xs={3}>
                           
                            <Button fullWidth type="submit"  disabled={(tipo_pagamento.cheque === true && props.cheque.length != numero_cheques)|| (tipo_pagamento.cheque === true && numero_cheques === 0)} variant="contained" color="primary">
                                        Receber
                            </Button>
                            
                        </Grid>

                    </Grid>            
                         
                </CardContent>  
            </Card>

            {cheques}


        </form>
);



};

CadRecebimento.propTypes = {
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
  salvar_recebimento,
  limpar_lista_cheque,
  limpar_dinheiro,
  limpar_recebimento,

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(CadRecebimento);
