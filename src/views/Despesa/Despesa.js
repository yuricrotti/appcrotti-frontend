import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {DespesaCad, ParcelaCad, FooterCad} from './components';
  
  import { bindActionCreators } from 'redux'
  import { connect } from 'react-redux'
  import { 
    listar_fornecedor,
  } from '../../store/fornecedorReducer'
  import { 
    criar_despesa,
    salvar_despesa,
    limpar_despesa,
  } from '../../store/despesaReducer'
  import { 
    criar_parcela,
    salvar_parcela,
    limpar_parcela,
  } from '../../store/parcelaReducer'
 

  

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const Despesa = (props) => {
  const classes = useStyles();
  const [parcelas,setParcelas]= useState([])
 
  useEffect(() => {
    props.listar_fornecedor();
    props.limpar_parcela();
    props.limpar_despesa();
 
  }, [] )

  useEffect(() => {
  
  }, [props.parcela] )


  useEffect(() => {
  
  }, [props.despesa] )


 
  const carregaParcelas = (despesa)  =>{
    
    var vetorParcelas = [];
    console.log("Carregou parcelas");
    setParcelas([<h1></h1>])
    
    if(despesa.length != 0){
      console.log("Existe Despesas");
      console.log(despesa.numeroparcela_despesas);
      const nparcela = despesa.numeroparcela_despesa;
       for (let index = 0; index < nparcela; index++) {
        console.log("Parcela : "+index);
        vetorParcelas.push(<ParcelaCad key={index} criar = {props.criar_parcela} salvar_parcelas={props.salvar_parcela} id_parcela={index}  despesa={despesa} ></ParcelaCad>);
      }
      setParcelas(vetorParcelas)

    }

   }
 
  return (
    <div className={classes.root}>
        <DespesaCad fornecedores={props.fornecedor} criar={props.criar_despesa} salvar={props.salvar_despesa} parcelas={props.parcela} despesa={props.despesa} limpar_parcela={props.limpar_parcela} limpar_despesa={props.limpar_despesa} carregaParcelas= {carregaParcelas} setParcelas={setParcelas}></DespesaCad>
        <div className={classes.content}>
                {parcelas}
        </div>
    </div>
   
  );
};

const mapStateToProps = state => ({
    fornecedor: state.fornecedor.fornecedor,
    despesa: state.despesa.despesa,
    parcela: state.parcela.parcela,
   
   
  })
  
  const mapDispatchToProps = dispatch => 
  bindActionCreators({
    listar_fornecedor,
    criar_despesa,
    salvar_despesa,
    criar_parcela, 
    limpar_despesa,
    salvar_parcela,
    limpar_parcela,
  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Despesa);
