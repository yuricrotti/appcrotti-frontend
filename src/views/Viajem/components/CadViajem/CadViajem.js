import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Formik
} from 'formik';
import * as Yup from 'yup';


import { Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel 

} from '@material-ui/core';





const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));



const CadViajem = props => {
    const { className,salvar,listar, ...rest } = props;
    const classes = useStyles();


    const [open, setOpen] = useState(false);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
    
    const [listaClientes, setListaClientes] = useState(null)
    const [listaFornecedores, setListaFornecedores] = useState(null)
    const [produto_venda_compra, setProduto_venda_compra] = useState([])
    const [cliente_venda, setCliente_venda] = useState([])
    const [fornecedor_compra, setFornecedor_compra] = useState([])


    useEffect(() => {
        if(props.clientes.length !== 0){
          setListaClientes(props.clientes)
        }
      
      }, [props.clientes] )

  
      useEffect(() => {
        if(props.fornecedores.length !== 0){
          setListaFornecedores(props.fornecedores)
        }

      }, [props.fornecedores] )
    
    function data_atual_formata(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
            
        return anoF+"-"+(mesF)+"-"+diaF;
    }


    const salvar_viajem = (values) => {

      const venda = {
        id_venda: parseInt(Date.now()),
        cliente_venda :cliente_venda,
        produto_venda:produto_venda_compra,
        quantidade_venda:values.quantidade_venda,
        valor_venda:values.valor_venda,
        valor_total_venda:values.quantidade_venda*values.valor_venda,
        data_venda:values.data,
        status_venda:"E",
      }


      const compra = {
        id_compra: parseInt(Date.now()),
        fornecedor_compra :fornecedor_compra,
        produto_compra:produto_venda_compra,
        quantidade_compra:values.quantidade_compra,
        valor_compra:values.valor_compra,
        valor_total_compra:values.valor_compra*values.quantidade_compra,
        data_compra:values.data,
        status_compra:"E",
      }
      const viajem ={
        id_viajem : parseInt(Date.now()),
        descricao_viajem : "Viajem realizada (produto:"+produto_venda_compra+"). A carga saiu do fornecedor " +fornecedor_compra.nome_fornecedor+". Foi entregue ao cliente " + cliente_venda.nomecliente +".",
        compra_viajem : compra,
        venda_viajem : venda,
        data_viajem:values.data,
        status_viajem :"E",
      } 

      setFornecedor_compra([])
      setCliente_venda([])
      setProduto_venda_compra([])
      props.salvar_venda(venda)
      props.salvar_compra(compra)
      props.salvar_viajem(viajem)
  
 
  
  }
    

    return ( 
      <React.Fragment>
        {!isSubmitionCompleted &&
          <React.Fragment>
            <Formik
              initialValues={{ quantidade_venda:0 , valor_venda:0, data:data_atual_formata(),quantidade_compra:0,valor_compra:0,valor_total_venda: 0 ,valor_total_compra:0}}
              onSubmit={(values, { resetForm }) => {
                salvar_viajem(values);
                resetForm();
                }}
              validationSchema={Yup.object().shape({
                quantidade_venda: Yup.number()
                  .required('Obrigatório'),
                valor_venda: Yup.number()
                  .required('Obrigatório'),
                data: Yup.string()
                  .required('Obrigatório'), 
                quantidade_compra: Yup.number()
                  .required('Obrigatório'),
                valor_compra: Yup.number()
                  .required('Obrigatório'),
                
              })}
            >
            {(props) => {   const {
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    handleReset,
                                    resetForm,
                                   } = props;
                  
                        
                        
                            return (
                              <form onSubmit={handleSubmit}>
                                <Card className={classes.root} variant="outlined">
                                <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Cadastro de Viagem
                                </Typography>
                                <Grid container spacing={3}>
                                    
                                    
                                    <Grid item xs={9}>

                                      <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel id="label_produto">Produto</InputLabel>
                                        <Select
                                            labelId="produto"
                                            id="produto"
                                            value={produto_venda_compra}
                                            onChange={(event) => setProduto_venda_compra(event.target.value)}
                                        >
                                          <MenuItem value={'Areia Padrão'}>Areia A</MenuItem>
                                          <MenuItem value={'Areia B'}>Areia B</MenuItem>
                                          <MenuItem value={'Brita Padrão'}>Pedra A</MenuItem>
                                          <MenuItem value={'Pedra B'}>Pedra B</MenuItem>
                                        </Select>
                                      </FormControl>
                                    
                                    </Grid>

                                    <Grid item xs={3}>
                                      <TextField
                                      
                                        name="data"
                                        label="Data da Viajem: *"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={values.data}
                                        onChange={handleChange}
                                      
                                      />
                                    </Grid>
                                  
                                  <Grid item xs={4}>

                                    <FormControl fullWidth component="fieldset" className={classes.formControl}>
                                    <InputLabel id="lable_tipo_despesa">Cliente</InputLabel>
                                        <Select
                                        fullWidth
                                        value={cliente_venda}
                                        onChange={(event) => setCliente_venda(event.target.value)}
                                        >
                                            {listaClientes !== null  ?  listaClientes.map( (cliente,index) =>{
                                            return <MenuItem key={index} value={cliente}>{cliente.nome_cliente}</MenuItem>
                                            }):<MenuItem></MenuItem>
                                            }
                                        </Select>                      
                                    </FormControl>

                                  </Grid>

                                  <Grid item xs={2}>

                                    <TextField
                                      fullWidth
                                      placeholder="Qtd Venda (m³):"          
                                      label="Qtd Venda (m³):"
                                      type="number"
                                      name="quantidade_venda"
                                      className={classes.textField}
                                      value={values.quantidade_venda}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={(errors.quantidade_venda && touched.quantidade_venda) && errors.quantidade_venda}
                                      helperText={(errors.quantidade_venda && touched.quantidade_venda) && errors.quantidade_venda}
                                    
                                    /> 
                                    
                                  </Grid>

                                  <Grid item xs={3}>

                                    <TextField
                                      fullWidth
                                      placeholder="Valor de Venda (p/ m³):"          
                                      label="Valor de Venda (p/ m³):"
                                      type="number"
                                      name="valor_venda"
                                      className={classes.textField}
                                      value={values.valor_venda}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={(errors.valor_venda && touched.valor_venda) && errors.valor_venda}
                                      helperText={(errors.valor_venda && touched.valor_venda) && errors.valor_venda}
                                    
                                    />
                                  </Grid>

                                  <Grid item xs={2}>

                                    <TextField
                                      fullWidth
                                      placeholder="Valor Total Venda:"          
                                      label="Valor Total :"
                                      type="number"
                                      name="valor_total_venda"
                                      className={classes.textField}
                                      value={values.valor_venda*values.quantidade_venda}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={(errors.valor_total_venda && touched.valor_total_venda) && errors.valor_total_venda}
                                      helperText={(errors.valor_total_venda && touched.valor_total_venda) && errors.valor_total_venda}

                                    />
                                    </Grid>

                                  


                                  <Grid item xs={4}>

                                    <FormControl fullWidth component="fieldset" className={classes.formControl}>
                                    <InputLabel id="input_fornecedor">Fornecedor</InputLabel>
                                        <Select
                                        fullWidth
                                        value={fornecedor_compra}
                                        onChange={(event) => setFornecedor_compra(event.target.value)}
                                        >
                                            {listaFornecedores !== null  ?  listaFornecedores.map( (fornecedor,index) =>{
                                            return <MenuItem key={index} value={fornecedor}>{fornecedor.nome_fornecedor}</MenuItem>
                                            }):<MenuItem></MenuItem>
                                            }
                                        </Select>                      
                                    </FormControl>

                                  </Grid>


                                  <Grid item xs={2}>
                                      <TextField
                                        fullWidth
                                        placeholder="Qtd Compra (m³):"          
                                        label="Qtd Compra (m³):"
                                        type="number"
                                        name="quantidade_compra"
                                        className={classes.textField}
                                        value={values.quantidade_compra}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={(errors.quantidade_compra && touched.quantidade_compra) && errors.quantidade_compra}
                                        helperText={(errors.quantidade_compra && touched.quantidade_compra) && errors.quantidade_compra}

                                      /> 

                                      </Grid>

                                      <Grid item xs={3}>

                                      <TextField
                                        fullWidth
                                        placeholder="Valor de Compra por (m³):"          
                                        label="Valor de Compra por (m³):"
                                        type="number"
                                        name="valor_compra"
                                        className={classes.textField}
                                        value={values.valor_compra}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={(errors.valor_compra && touched.valor_compra) && errors.valor_compra}
                                        helperText={(errors.valor_compra && touched.valor_compra) && errors.valor_compra}

                                      />
                                      </Grid>
                                    <Grid item xs={2}>

                                    <TextField
                                      fullWidth
                                      placeholder="Valor Total Venda:"          
                                      label="Valor Total :"
                                      type="number"
                                      name="valor_total_compra"
                                      className={classes.textField}
                                      value={values.valor_compra*values.quantidade_compra}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={(errors.valor_total_compra && touched.valor_total_compra) && errors.valor_total_compra}
                                      helperText={(errors.valor_total_compra && touched.valor_total_compra) && errors.valor_total_compra}

                                    />
                                    </Grid>


                                      
                                      <Grid item xs={4}>

                                        <Button type="submit" variant="contained" color="primary" >
                                          Salvar
                                        </Button>
                                        <Button onClick={() => resetForm()} variant="contained" color="secondary" >
                                          Cancelar
                                        </Button>
                                      </Grid>


                                </Grid>                          
                              </CardContent>  
                              </Card>
                            </form>
                          );}}
            </Formik>  
          </React.Fragment> }
      </React.Fragment>
 );

}

CadViajem.propTypes = {
    className: PropTypes.string
  };
  
  export default CadViajem;