import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {FiltroVenda,TableVenda,CadRecebimento} from './components';


import { 
    listar_cliente,
  } from '../../store/clienteReducer'

import { 
  listar_vendas_filtros,
  alterarstatus_venda,
  } from '../../store/vendaReducer' 
  
const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));


const Recebimento = (props) =>{

    const [lista_receber,setLista_receber] = useState(null)
   
    useEffect(() => {
        props.listar_cliente();
        props.listar_vendas_filtros({});
    
    }, [] )

    const adicionar_lista_receber = (lista) =>{
          setLista_receber(lista)
    }


    const classes = useStyles();
    return (
        <div className={classes.root}>
          
              {lista_receber === null ? 
                <FiltroVenda clientes={props.cliente}  listar_vendas_filtros={props.listar_vendas_filtros}></FiltroVenda>
                :
                <CadRecebimento adicionar_lista_receber={adicionar_lista_receber} alterarstatus_venda={props.alterarstatus_venda} lista_receber={lista_receber}></CadRecebimento>
              }
              <div className={classes.content}>
                {lista_receber === null ? 
                  <TableVenda vendas={props.venda} adicionar_lista_receber={adicionar_lista_receber}></TableVenda>
                  :
                  <h1></h1>
                }   
              </div>
   
        </div>
       
      );

}

const mapStateToProps = state => ({
    cliente: state.cliente.cliente,
    venda: state.venda.venda,
  })

 const mapDispatchToProps = dispatch => 
  bindActionCreators({
    listar_cliente,
    listar_vendas_filtros,
    alterarstatus_venda,
 
  }, dispatch)


  
  export default connect(mapStateToProps, mapDispatchToProps)(Recebimento);
