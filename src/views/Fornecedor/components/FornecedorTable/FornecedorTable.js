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
  IconButton
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



const FornecedorTable = props => {
  const {className} = props;
  const classes = useStyles();

  const mudar_status = (id_fornecedor,status_fornecedor) => {
    props.alterarstatus(id_fornecedor,status_fornecedor)
    props.listar()
  }

  const deletar = (id_fornecedor) => {
    props.deletar(id_fornecedor)
    props.listar()
  }
  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome Fornecedor</TableCell>
                    <TableCell>Registro(CPNJ/CPF)</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {props.fornecedores.length != 0 ? props.fornecedores.map( (forn,index) =>{
                     return (<TableRow key={index}> 
                                 <TableCell>{forn.id_fornecedor}</TableCell>
                                 <TableCell>{forn.nome_fornecedor}</TableCell>
                                 <TableCell>{forn.registro_fornecedor}</TableCell>
                                 <TableCell>{forn.cidade_fornecedor}</TableCell>
                                 <TableCell>{forn.status_fornecedor}</TableCell>
                                 <IconButton onClick = {()=> mudar_status(forn.id_fornecedor,forn.status_fornecedor)} aria-label="delete">
                                  { forn.status_fornecedor == 'A' ? 
                                        (
                                          <LockIcon />
                                        ) : 
                                        (
                                          <LockOpenIcon />
                                        )
                                  }        
                                  </IconButton>  

                                  <IconButton onClick = {()=> deletar(forn.id_fornecedor)} aria-label="delete">
                                    <DeleteIcon/>    
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

FornecedorTable.propTypes = {
  className: PropTypes.string,
};

export default FornecedorTable;