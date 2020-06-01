import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import MoneyIcon from '@material-ui/icons/AttachMoney';


import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button
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
  const [lista_cheques,setLista_cheques] = useState([])
  
  function data_formata(datac){
    var date = new Date(datac)
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var dateFormatted = day +'/'+ (month++) +'/'+ year;
    return dateFormatted;
}
 
  const add_lista_cheque= (cheque) => {

    var aux = [...lista_cheques,cheque]
    console.log("Numero aux :",aux)
    setLista_cheques(aux)
    console.log("Numero Lista ...:",lista_cheques)
    
  }

  const Enviar_Cheques = ()=>{


    if(lista_cheques.length !== 0){
      props.adicionar_lista_cheques(lista_cheques)

    }else{
      console.log("não tem nada para receber ")
    }

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
                    <TableCell>Nome Cheque</TableCell>
                    <TableCell>Data Vencimento</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ação</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
              
            { props.cheques.length !==0 ? props.cheques.map((cheque,index) =>{
                  return (
                  <TableRow key={index}> 
                            <TableCell>{cheque.nome_cheque}</TableCell>
                            <TableCell>{data_formata(cheque.data_cheque)}</TableCell>
                            <TableCell>{cheque.valor_cheque}</TableCell>
                            <TableCell>{cheque.status_cheque}</TableCell>
                            <IconButton disabled ={lista_cheques.indexOf(cheque)>-1?true:false}  onClick = {()=> add_lista_cheque(cheque)} aria-label="delete">
                                          <MoneyIcon />                           
                            </IconButton>  

                    </TableRow>
                  );
              })  
              : console.log("ERA ZERO")      
            }

            </TableBody>
            </Table>
            <Button fullWidth  onClick={()=>Enviar_Cheques()} variant="contained" color="primary">
                                    Finalizar Cheques
            </Button>
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