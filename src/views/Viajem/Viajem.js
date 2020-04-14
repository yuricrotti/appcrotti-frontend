import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {CadViajem} from './components';


  
  import { bindActionCreators } from 'redux'
  import { connect } from 'react-redux'
  import { listar_fornecedor} from '../../store/fornecedorReducer'
  import { listar_cliente} from '../../store/clienteReducer'
  import { salvar_venda } from '../../store/vendaReducer'
  import { salvar_compra} from '../../store/compraReducer'
  import { salvar_viajem} from '../../store/viajemReducer'


  

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));




const Viajem = (props) => {
  const classes = useStyles();
  


  
 
 
  useEffect(() => {
    props.listar_cliente();
    props. listar_fornecedor();
    
  }, [] )


   
  






  return (
    <div className={classes.root}>
        <CadViajem clientes={props.cliente} fornecedores={props.fornecedor} salvar_venda={props.salvar_venda} salvar_compra={props.salvar_compra} salvar_viajem={props.salvar_viajem}></CadViajem>
        <div className={classes.content}>
               
        </div>
    </div>
   
  );
};


const mapStateToProps = state => ({
    fornecedor: state.fornecedor.fornecedor,
    cliente: state.cliente.cliente,
    venda: state.venda.venda,
    compra: state.compra.compra,
    viajem: state.viajem.viajem,
   
  })
  
  const mapDispatchToProps = dispatch => 
  bindActionCreators({
    listar_fornecedor,
    listar_cliente,
    salvar_venda,
    salvar_compra,
    salvar_viajem,

  }, dispatch)
  
  export default connect(mapStateToProps, mapDispatchToProps)(Viajem);
