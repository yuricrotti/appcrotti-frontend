import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {ClienteCad} from './components';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
 salvar_cliente,
} from '../../store/clienteReducer'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Cliente = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <ClienteCad salvar_cliente={props.salvar_cliente}></ClienteCad>
        <div className={classes.content}>

        </div>
    </div>   
  );
};

const mapStateToProps = state => ({
    cliente: state.cliente.cliente,
})

const mapDispatchToProps = dispatch => 
bindActionCreators({
    salvar_cliente,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cliente);
