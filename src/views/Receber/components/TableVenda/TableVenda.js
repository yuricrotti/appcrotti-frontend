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



const TableVenda = props => {
  const {className} = props;
  
  const classes = useStyles();
  const [total,setTotal] = useState(0)
  const [lista_receber,setLista_receber] = useState([])
  
  function dataFormatada(data){
    var data = new Date(data),
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth() + 1 ).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}
  function getClientename(cliente){

    if(cliente.length !==0){
      return(cliente[0].nome_cliente)
    }else{
      return("Cliente não encontrado")
    }
   

  }

  function verifica_status(venda){
    console.log(lista_receber.indexOf(venda))
    

  }
  const add_lista_receber = (venda) => {

    var aux = [...lista_receber,venda]
    setLista_receber(aux)
    //console.log(lista_receber)
    
  }

  const realizar_recebimento = ()=>{


      if(lista_receber.length !== 0){
        props.adicionar_lista_receber(lista_receber)

      }else{

        console.log("não tem nada para receber ")
      }

  }


  useEffect(() => {
    var total = 0.0
    if(props.vendas.length !==0){
     // console.log(props.vendas)
      for (var venda of props.vendas){
          console.log(venda)
          total =  total + venda.valor_total_venda
      }
      setTotal(total);
    }  
    }, [props.vendas] )

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
                    <TableCell>Cliente</TableCell>
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
              {props.vendas.length !==0 ? props.vendas.map((venda,index) =>{
                  return (
                  <TableRow key={index}> 
                            <TableCell>{getClientename(venda.listacliente)}</TableCell>
                            <TableCell>{venda.produto_venda}</TableCell>
                            <TableCell>{dataFormatada(venda.data_venda)}</TableCell>
                            <TableCell>{venda.quantidade_venda}</TableCell>
                            <TableCell>{venda.valor_venda}</TableCell>
                            <TableCell>{venda.valor_total_venda}</TableCell>
                            <TableCell>{venda.status_venda}</TableCell>
                            <IconButton disabled ={lista_receber.indexOf(venda)>-1?true:false}  onClick = {()=> add_lista_receber(venda)} aria-label="delete">
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
            <Button fullWidth  onClick={()=>realizar_recebimento()} variant="contained" color="primary">
                                    Realizar Recebimento
            </Button>
          </div>
        </PerfectScrollbar>
      </CardContent>
     
    </Card>
  );
};

TableVenda.propTypes = {
  className: PropTypes.string,

};

export default TableVenda;