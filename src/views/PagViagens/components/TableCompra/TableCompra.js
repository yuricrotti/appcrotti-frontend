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



const TableCompra = props => {
  const {className} = props;
  
  const classes = useStyles();
  const [total,setTotal] = useState(0)
  const [lista_pagar,setLista_pagar] = useState([])
  
  function data_formata(datac){
    var data = new Date(datac),
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth() + 1 ).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}
  function fornecedor_nome(Fornecedor){

    if(Fornecedor.length !==0){
      return(Fornecedor[0].nome_fornecedor)
    }else{
      return("Fornecedor não encontrado")
    }

  }

  const add_lista_pagar = (venda) => {

    var aux = [...lista_pagar,venda]
    setLista_pagar(aux)
    //console.log(lista_receber)
    
  }

  const realizar_pagamento = ()=>{


      if(lista_pagar.length !== 0){
        props.adicionar_lista_pagar(lista_pagar)

      }else{

        console.log("não tem nada para receber ")
      }

  }


  useEffect(() => {
    var total = 0.0
    if(props.compras.length !==0){
     // console.log(props.vendas)
      for (var compra of props.compras){
          console.log(compra)
          total =  total + compra.valor_total_compra
      }
      setTotal(total);
    }  
    }, [props.compras] )

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
                    <TableCell>Produto</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Qtd (m³)</TableCell>
                    <TableCell>Valor por (m³)</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ação</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
              {props.compras.length !==0 ? props.compras.map((compra,index) =>{
                  return (
                  <TableRow key={index}> 
                            <TableCell>{fornecedor_nome(compra.listaforn)}</TableCell>
                            <TableCell>{compra.produto_compra}</TableCell>
                            <TableCell>{data_formata(compra.data_compra)}</TableCell>
                            <TableCell>{compra.quantidade_compra}</TableCell>
                            <TableCell>{compra.valor_compra}</TableCell>
                            <TableCell>{compra.valor_total_compra}</TableCell>
                            <TableCell>{compra.status_compra}</TableCell>
                            <IconButton disabled ={lista_pagar.indexOf(compra)>-1?true:false}  onClick = {()=> add_lista_pagar(compra)} aria-label="delete">
                                          <MoneyIcon />                           
                            </IconButton>  

                            

                    </TableRow>
                  );
              })  
              : console.log("ERA ZERO")      
            }

            { total !== 0 ?
                <TableRow>
                  
                  <TableCell colSpan={5} >Total</TableCell>
                  <TableCell >{total}</TableCell>
                </TableRow>
                :
                <TableRow>
          
                </TableRow>
                
            }


              </TableBody>
            </Table>
            <Button fullWidth  onClick={()=>realizar_pagamento()} variant="contained" color="primary">
                                    Realizar Pagamento
            </Button>
          </div>
        </PerfectScrollbar>
      </CardContent>
     
    </Card>
  );
};

TableCompra.propTypes = {
  className: PropTypes.string,

};

export default TableCompra;