import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { 
    listar_fornecedor,
  } from '../../store/fornecedorReducer'

import { 
    listar_compras_filtros,
    alterarstatus_compra,
    } from '../../store/compraReducer'

import {FiltroCompra,TableCompra,CadPagamentoViagens} from './components';


  
const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));


const PagViagens = (props) =>{

    const [lista_pagarviagens,setlista_pagarviagens] = useState(null)
 
    useEffect(() => {
        props.listar_fornecedor();
        props.listar_compras_filtros({});
    
    
    }, [] )

    const adicionar_lista_pagar = (lista) =>{
        setlista_pagarviagens(lista)
  }

    const classes = useStyles();
    return (
        <div className={classes.root}>

                {lista_pagarviagens === null ? 
                   <FiltroCompra fornecedores={props.fornecedor} listar_compras_filtros={props.listar_compras_filtros}></FiltroCompra>
                :
                
                    <CadPagamentoViagens adicionar_lista_pagar={adicionar_lista_pagar} alterarstatus_compra={props.alterarstatus_compra} lista_pagar={lista_pagarviagens}></CadPagamentoViagens>
                }
             
            
              <div className={classes.content}>

                {lista_pagarviagens === null ? 
                  <TableCompra compras={props.compra} adicionar_lista_pagar={adicionar_lista_pagar}></TableCompra>
                  :
                  <h1></h1>
                }   
                
              </div>
   
        </div>
       
      );

}

const mapStateToProps = state => ({
    fornecedor:state.fornecedor.fornecedor,
    compra:state.compra.compra,
  })

 const mapDispatchToProps = dispatch => 
  bindActionCreators({
    alterarstatus_compra,
    listar_fornecedor,
    listar_compras_filtros,
  }, dispatch)


  
  export default connect(mapStateToProps, mapDispatchToProps)(PagViagens);
