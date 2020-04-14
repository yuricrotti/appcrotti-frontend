import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {FiltroCheques, TableCheques} from './components';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    listar_cheque_filtros,
   } from '../../store/chequeReducer'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));




const Cheques = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar_cheque_filtros([])

  }, [] )



  return (
    <div className={classes.root}>
        <FiltroCheques listar_cheque_filtros={props.listar_cheque_filtros}></FiltroCheques>
        <div className={classes.content}>
            <TableCheques cheques={props.cheque}></TableCheques>
        </div>
    </div>
   
  );
};

const mapStateToProps = state => ({
    cheque: state.cheque.cheque,
 
})

const mapDispatchToProps = dispatch => 
bindActionCreators({
    listar_cheque_filtros,
  
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cheques);
