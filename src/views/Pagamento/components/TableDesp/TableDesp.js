import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import EjectIcon from '@material-ui/icons/Eject';
import CheckIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';

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



const TablePag = props => {
  const {className} = props;
  
  const classes = useStyles();
  const [total,setTotal] = useState(0)
  
  
  useEffect(() => {
    var total = 0
    if(props.despesas.length !==0){
      console.log(props.despesas)
      total = props.despesas.map(desp =>{
        return total +  desp.valortotal_despesa
      })
      setTotal(total);
    }  
    }, [props.despesas] )

    
  function GetName(dados){
    
    var nome_fornecedor = ""
    
    if(dados.length !== 0){
      nome_fornecedor = dados.lista_forne[0].nome_fornecedor
    }else{
      nome_fornecedor= "Fornecedor não está no banco"
    }
   
    return(nome_fornecedor)
 
}

const mudarstatus = (id_despesa,status_despesa) => {

  props.alterar_status_despesa(id_despesa,status_despesa)
 

}
  
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>

              <TableHead>
                <TableRow>
                    <TableCell>Fornecedor</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Parcelas</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {props.despesas.length !==0 ? props.despesas.map((desp,index) =>{
                      return (
                      <TableRow key={index}> 
                                 <TableCell>{GetName(desp)}</TableCell>
                                 <TableCell>{desp.descricao_despesa}</TableCell>
                                 <TableCell>{desp.numeroparcela_despesa}</TableCell>
                                 <TableCell>{desp.status_despesa === "E" ?<EjectIcon /> : <CheckIcon /> }</TableCell>
                                 <TableCell>{desp.valortotal_despesa}</TableCell>
                                 <TableCell> 
                                   <IconButton onClick = {()=> mudarstatus(desp.id_despesa,desp.status_despesa)} aria-label="delete">
                                          <MoneyIcon />                           
                                    </IconButton>  

                                    <IconButton onClick = {null} aria-label="delete">
                                          <DeleteIcon />                           
                                    </IconButton>  
                                  </TableCell>

                            </TableRow>
                      );
                  })
                  
                  
                  : console.log("ERA ZERO")
                  
                  }
                  { total !== 0 ?
                    <TableRow>
                     
                      <TableCell colSpan={4} >Total</TableCell>
                      <TableCell >{total}</TableCell>
                    </TableRow>
                    :
                    <TableRow>
              
                   </TableRow>
                
                  }

                </TableBody>

            </Table>

          </div>
        </PerfectScrollbar>
      </CardContent>
     
    </Card>
  );
};

TablePag.propTypes = {
  className: PropTypes.string,

};

export default TablePag;