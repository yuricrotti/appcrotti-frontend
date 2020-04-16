import React, { useState , useEffect}  from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid ,  TextField,} from '@material-ui/core';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { 
  listar_vendas_filtros,
} from '../../store/vendaReducer' 

import { 
  listar_compras_filtros,
} from '../../store/compraReducer'

import { 
  listar_recebimentos_filtros,
} from '../../store/recebimentoReducer'

import { 
  listar_cheque_filtros,
} from '../../store/chequeReducer'

import { 
  listar_dinheiro_filtros,
} from '../../store/dinheiroReducer'

import { 
  listar_despesas_filtros,
} from '../../store/despesaReducer'

import { 
  listar_pagamento_filtros,
} from '../../store/pagamentoReducer'

import {
  Budget
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [defaultData,setDefaultData] = useState([])
  const [total_venda,setTotalVenda] = useState(0)
  const [total_compra,setTotalCompra] = useState(0)
  const [total_cheque_recebimento,setTotalCheque_Recebimento] = useState(0)
  const [total_cheque_pagamento,setTotalCheque_Pagamento] = useState(0)
  const [total_dinheiro_recebimento,setTotalDinheiro_Recebimento] = useState(0)
  const [total_dinheiro_pagamento,setTotalDinheiro_Pagamento] = useState(0)
  const [total_despesa,setTotalDespesa] = useState(0)
  const [total_pagamentos,setTotalPagamentos] = useState(0)
  const [total_recebimento,setTotalRecebimento] = useState(0)


  function dataCorrigida(databruta){
    var Data  = new Date(databruta);
    var FirstDay = new Date(Data.getFullYear(), Data.getMonth()+1, 1);
    var LastDay = new Date(Data.getFullYear(), Data.getMonth()+2, 0);
    return(FirstDay+","+LastDay) 
}


  useEffect(() => {
    carregar_vendas()
    carregar_compras()   
    carregar_recebimentos()
    carregar_dinheiros()
    carregar_cheques()
    carregar_despesas()
    carregar_pagamento()

  }, [] )

  function carregar_vendas(){
    
    var filtros = {}
    var listafiltros = []
    filtros.data_venda = dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_vendas_filtros(listafiltros)

  }

  function carregar_pagamento(){
    
    var filtros = {}
    var listafiltros = []
    filtros.data_pagamento = dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_pagamento_filtros(listafiltros)

  }

  function carregar_despesas(){
    
    var filtros = {}
    var listafiltros = []
    filtros.datacad_despesa = dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_despesas_filtros(listafiltros)

  }

  function carregar_compras(){

    var filtros = {}
    var listafiltros = []
    filtros.data_compra =  dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_compras_filtros(listafiltros)

  }

  function carregar_recebimentos(){

    var filtros = {}
    var listafiltros = []
    filtros.data_recebimento =  dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_recebimentos_filtros(listafiltros)

  }

  function carregar_cheques(){

    var filtros = {}
    var listafiltros = []
    filtros.data_cheque =  dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_cheque_filtros(listafiltros)

  }

  
  function carregar_dinheiros(){

    var filtros = {}
    var listafiltros = []
    filtros.data_dinheiro =  dataCorrigida(data)
    filtros.cond1 = "$gte"
    filtros.cond2 = "$lt"
    listafiltros.push(filtros)
    filtros = {}
    props.listar_dinheiro_filtros(listafiltros)

  }

  useEffect(() => {
    carregar_vendas()
    carregar_compras() 
    carregar_recebimentos()
    carregar_cheques()
    carregar_dinheiros()
    carregar_despesas()
    carregar_pagamento()

  }, [data] )

  useEffect(() => {
    
    setTotalCompra(0)
    var total = 0
    if(props.compra.length !=0){
      props.compra.map(compra =>{
        total = total + compra.valor_total_compra
       console.log(compra.valor_total_compra)
      })
      console.log("soma compra :",total)
      setTotalCompra(total)
    }  
   
    
  }, [props.compra] )


  useEffect(() => {
    
    setTotalPagamentos(0)
    var total = 0
    var lista_pagamento = props.pagamento 

    if(lista_pagamento.length != 0 ){
      lista_pagamento.forEach(pagamento => {
        var listacompras = pagamento.listacompras
        listacompras.forEach(compra => {
            total = total + compra.valor_total_compra
        });
      });
    }
    setTotalPagamentos(total)
    
  }, [props.pagamento] )


  useEffect(() => {
    
    setTotalDespesa(0)
    var total = 0
    if(props.despesa.length !=0){
      props.despesa.map(despesa =>{
        total = total + despesa.valortotal_despesa
       
      })
      console.log("soma despesa :",total)
      setTotalDespesa(total)
    }  
   
    
  }, [props.despesa] )

  useEffect(() => {
    
    setTotalCheque_Recebimento(0)
    setTotalCheque_Pagamento(0)
    var total_recebimento = 0
    var total_pagamento = 0
    if(props.cheque.length !=0){
      props.cheque.map(cheque =>{
        if(cheque.status_cheque === 'E'){
          total_recebimento = Number(total_recebimento) + Number(cheque.valor_cheque)
        }else{
          total_pagamento = Number(total_pagamento) + Number(cheque.valor_cheque)
        }

      })
      console.log("soma cheque recebimento :",total_recebimento)
      console.log("soma cheque pagamento :",total_pagamento)
      setTotalCheque_Recebimento(total_recebimento)
      setTotalCheque_Pagamento(total_pagamento)
    }  
   
    
  }, [props.cheque] )


  useEffect(() => {
    
    setTotalDinheiro_Recebimento(0)
    setTotalDinheiro_Pagamento(0)
    var total_recebimento = 0
    var total_pagamento = 0
    console.log("yuri")
    if(props.dinheiro.length !=0){
      props.dinheiro.map(dinheiro =>{
        if(dinheiro.status_dinheiro === 'E'){
          total_recebimento = Number(total_recebimento) + Number(dinheiro.valor_dinheiro)
        }else{
          total_pagamento = Number(total_pagamento) + Number(dinheiro.valor_dinheiro)
        }

      })
      console.log("soma dinheiro recebimento :",total_recebimento)
      console.log("soma dinheiro pagamento :",total_pagamento)
      setTotalDinheiro_Pagamento(total_pagamento)
      setTotalDinheiro_Recebimento(total_recebimento)
    }  
   
  }, [props.dinheiro] )

  useEffect(() => {
    
    setTotalRecebimento(0)
    var total = 0
    var lista_recebimentos = props.recebimento 

    if(lista_recebimentos.length != 0 ){
      lista_recebimentos.forEach(recebimento => {
        var lista_vendas = recebimento.listavendas
        lista_vendas.forEach(venda => {
            total = total + venda.valor_total_venda
        });
      });
    }
    setTotalRecebimento(total)
    
  }, [props.recebimento] )


  useEffect(() => {
  
    setTotalVenda(0)
    var total = 0
    if(props.venda.length !=0){
      props.venda.map(venda =>{
        total = total + venda.valor_total_venda
       console.log(venda.valor_total_venda)
      })
      console.log("soma venda :",total)
      setTotalVenda(total)
    }  
  }, [props.venda] )


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
        >
          <TextField
            
            name="data"
            label="Mês*"
            type="date"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            value={data}
            onChange={e => setData(e.target.value)}
          />

        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Budget totalvenda={total_venda}  titulo ="TOTAL VENDIDO "></Budget>
        </Grid>
        <
          Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Budget totalvenda={total_compra}  titulo ="TOTAL COMPRA "></Budget>
        </Grid>
        <
          Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Budget totalvenda={total_venda - total_compra}  titulo ="TOTAL LUCRO "></Budget>
        </Grid>
        
        
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
           <Budget totalvenda={total_recebimento}  titulo ="TOTAL RECEBIDO "></Budget>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
          >
          <Budget totalvenda={total_cheque_recebimento}  titulo ="TOTAL CHEQUE "></Budget>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget totalvenda={total_dinheiro_recebimento}  titulo ="TOTAL DINHEIRO "></Budget>
        </Grid>

        <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
        >
        <Budget totalvenda={total_dinheiro_recebimento+total_cheque_recebimento}  titulo ="RECEBIDO (REAL) "></Budget>
        </Grid>


        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
          >
          <Budget totalvenda={total_despesa}  titulo ="DESPESA"></Budget>
        </Grid>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
          >
          <Budget totalvenda={total_pagamentos}  titulo ="PAGAMENTO"></Budget>
        </Grid>

        
        <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
        >
        <Budget totalvenda={total_pagamentos+total_despesa}  titulo =" DESPESA + PAGAMENTO  "></Budget>
        </Grid>

        <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
        >
        <Budget totalvenda={total_dinheiro_pagamento+total_cheque_pagamento}  titulo =" DESPESA + PAGAMENTO (REAL) "></Budget>
        </Grid>



        
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({

  venda: state.venda.venda,
  compra:state.compra.compra,
  cheque:state.cheque.cheque,
  dinheiro:state.dinheiro.dinheiro,
  despesa:state.despesa.despesa,
  pagamento:state.pagamento.pagamento,
  recebimento:state.recebimento.recebimento,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({

  listar_vendas_filtros,
  listar_compras_filtros,
  listar_recebimentos_filtros,
  listar_cheque_filtros,
  listar_dinheiro_filtros,
  listar_despesas_filtros,
  listar_pagamento_filtros,

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

