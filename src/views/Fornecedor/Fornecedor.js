import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {FornecedorCad,FornecedorTable} from './components';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  listar_fornecedor,
  salvar_fornecedor,
  alterarstatus_fornecedor,
  deletar_fornecedor,
} from '../../store/fornecedorReducer'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Fornecedor = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar_fornecedor();
  }, [] )

  return (
    <div className={classes.root}>
         <FornecedorCad salvar={props.salvar_fornecedor} listar={props.listar_fornecedor} ></FornecedorCad>
        <div className={classes.content}>
            <FornecedorTable listar={props.listar_fornecedor} fornecedores={props.fornecedor} alterarstatus = {props.alterarstatus_fornecedor} deletar = {props.deletar_fornecedor}></FornecedorTable>
        </div>
    </div>
   
  );
};

const mapStateToProps = state => ({
  fornecedor: state.fornecedor.fornecedor,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({
  listar_fornecedor, 
  salvar_fornecedor,
  alterarstatus_fornecedor, 
  deletar_fornecedor, 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
