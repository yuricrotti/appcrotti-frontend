import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import EjectIcon from '@material-ui/icons/Eject';
import CheckIcon from '@material-ui/icons/CheckCircle';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
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



const TableParc = props => {
  const {className} = props;
  
  const classes = useStyles();
  const [forn,setForn] = useState([])
  const [total,setTotal] = useState(0)
  const [parcela,setParcela] = useState([])
  
  
  

  function dataFormatada(data){
    var date = new Date(data)
    var day = date.getDate() + 1;
    var month = date.getMonth();
    var year = date.getFullYear();
    var dateFormatted = day +'/'+ (month++) +'/'+ year;
    return dateFormatted;
}
  
function get_name_fornecedor(dados){
  
  var nome_fornecedor = ""
    
  if(dados.length !== 0){
    nome_fornecedor = dados.lista_forne[0].nome_fornecedor
  }else{
    nome_fornecedor= "Fornecedor não está no banco"
  }
 
  return(nome_fornecedor)

 
}

useEffect(() => {
    var total = 0
    if(props.parcelas.length !=0){
      console.log(props.parcelas)
      props.parcelas.map(parc =>{
        total = total +  parc.valor_parcela
      })
      setTotal(total);
    }  
    }, [props.parcelas] )


function get_descricao(dados){
    var descricao = ""
    
    if(props.despesas.length != 0 ){
        props.despesas.forEach(function(valor) {
           
            if(valor.parcelas_despesa.indexOf(dados["_id"]) > -1){
               descricao = valor.descricao_despesa
            }else{
              descricao = "Não encontrou a descrição"

            }
            
        });

    }
   
    //console.log(dados["_id"])



    return descricao
 
}
const mudarstatus = (dados) => {
    var parcelas = []
    var despesa = []
    var obj = {}
    if(props.despesas.length != 0 ){
        props.despesas.forEach(function(valor, indice) {
            if(valor.parcelas_despesa.indexOf(dados["_id"]) > -1){
               parcelas = valor.parcelas_despesa
               despesa = valor.id_despesa
            }
            
        });

    }
    obj.parcela = dados["_id"]
    obj.lista_parcelas = parcelas
    obj.despesa = despesa
    obj.status_atual = dados["status_parcela"]
    
    console.log(obj)
    props.alterar_status_parcela(obj)
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
                    <TableCell>Data da Parcela</TableCell>
                    <TableCell>Valor da Parcela</TableCell>
                    <TableCell>Status</TableCell>
                   
                    <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
       
              <TableBody>
                  {props.parcelas.length !=0 ? props.parcelas.map((parc,index) =>{
                      return (
                      <TableRow key={index}> 
                                 <TableCell>{get_name_fornecedor(parc)}</TableCell>
                                 <TableCell>{get_descricao(parc)}</TableCell>
                                 <TableCell>{dataFormatada(parc.datapagamento_parcela)}</TableCell>
                                 <TableCell>{parc.valor_parcela}</TableCell>
                                 <TableCell>{parc.status_parcela == "E" ?<EjectIcon /> : <CheckIcon /> }</TableCell>
                                 
                                 <TableCell> 
                                   <IconButton onClick = {()=>mudarstatus(parc)} aria-label="delete">
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

                    { total != 0 ?
                    <TableRow>
                     
                      <TableCell colSpan={3} >Total</TableCell>
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

TableParc.propTypes = {
  className: PropTypes.string,

};

export default TableParc;