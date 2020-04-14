import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {TableDesp,FiltroPag,TableParc} from './components';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    listar_fornecedor,
  } from '../../store/fornecedorReducer'
  import { 
    listar_despesas_filtros,
    alterar_status_despesa,
  } from '../../store/despesaReducer'
  import { 
    listar_parcelas_filtros,
    alterar_status_parcela,

  } from '../../store/parcelaReducer'
  

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));


const Pagamento = (props) =>{

    const [tipo_pagamento, setTipo_pagamento] = useState("Parcelas")
    const [obj_filtro, setObj_filtro] = useState([])
   
    useEffect(() => {
      props.listar_fornecedor();
      props.listar_parcelas_filtros({})
      props.listar_despesas_filtros({})

    }, [] )





    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FiltroPag setTipo_pagamento={setTipo_pagamento} listar_parcelas_filtros={props.listar_parcelas_filtros} listar_despesas_filtros={props.listar_despesas_filtros}  fornecedores={props.fornecedor}></FiltroPag>
            <div className={classes.content}>
            {tipo_pagamento == "Parcelas"?
              <TableParc alterar_status_parcela={props.alterar_status_parcela} parcelas={props.parcela} despesas={props.despesa} fornecedor={props.fornecedor}></TableParc>
            :
            
              <TableDesp  alterar_status_despesa = {props.alterar_status_despesa} despesas={props.despesa} fornecedor={props.fornecedor}></TableDesp>
            }
            
            
            </div>
        </div>
       
      );

}

const mapStateToProps = state => ({
    fornecedor: state.fornecedor.fornecedor,
    despesa: state.despesa.despesa,
    parcela: state.parcela.parcela,
   
  })

 const mapDispatchToProps = dispatch => 
  bindActionCreators({
    listar_fornecedor,
    listar_despesas_filtros,
    listar_parcelas_filtros,
    alterar_status_despesa,
    alterar_status_parcela,
 
  }, dispatch)


  
  export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
