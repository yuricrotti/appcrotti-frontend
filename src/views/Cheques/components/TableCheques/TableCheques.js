import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

const TableCheques = props => {
  const {className} = props;
  
  const classes = useStyles();

  function data_formatada(data){
    var date = new Date(data)
    var day = date.getDate() ;
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var dateFormatted = day +'/'+ (month++) +'/'+ year;
    return dateFormatted;
  }
 
  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Data Cadastro</TableCell>
                    <TableCell>Data do Cheque</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Descontar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.cheques.length != 0 ? props.cheques.map( (cheque,index) =>{
                    return (<TableRow key={index}> 
                                <TableCell>{cheque.nome_cheque}</TableCell>
                                <TableCell>{data_formatada(cheque.datacad_cheque)}</TableCell>
                                <TableCell>{data_formatada(cheque.data_cheque)}</TableCell>
                                <TableCell>{cheque.valor_cheque}</TableCell>
                                <TableCell>{cheque.status_cheque}</TableCell>
                                <IconButton onClick = {()=> props.descontar_cheque(cheque.id_cheque,cheque.status_cheque)} aria-label="delete">
                                  { (cheque.status_cheque !== 'ED ' && cheque.status_cheque !== 'EP') ? 
                                        (
                                          <LockOpenIcon />
                                        ) : 
                                        (
                                          
                                          <LockIcon />
                                        )
                                  }        
                                  </IconButton>  
                                          
                          </TableRow>
                    );
                  }): <TableRow ><TableCell></TableCell></TableRow>
                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TableCheques.propTypes = {
  className: PropTypes.string,

};

export default TableCheques;