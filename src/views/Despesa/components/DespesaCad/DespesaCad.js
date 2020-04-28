import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Formik,
} from 'formik';
import * as Yup from 'yup';

import timezone from '../../../../services/timezone'

import { Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Grid,
  FormHelperText,
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



const DespesaCad = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  
  const [tipo_despesa, setTipo_despesa] = useState('');
  const tipo_despesaSelect = event => {
    setTipo_despesa(event.target.value);
  };
  
  const [fornecedor_despesa, setFornecedor_despesa] = useState([])
  const fornecedor_despesaSelect = event => {
    setFornecedor_despesa(event.target.value);
  };

  const [status_form, setStatus_form] = useState(false)
  const [fornecedores, setFornecedores] = useState([])
  
  useEffect(() => {
    setFornecedores(props.fornecedores)
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
  const salvar_despesa = (values,resetForm) => {

    if(status_form == false){
      setStatus_form(true)
      const despesa = {
        id_despesa: parseInt(Date.now()),
        tipo_despesa:tipo_despesa,
        numeroparcela_despesa:values.numeroparcela_despesa,
        fornecedor_despesa:fornecedor_despesa,
        valortotal_despesa : values.valortotal_despesa,
        datacad_despesa : timezone.add_timezone_offset(values.data),
        descricao_despesa:values.descricao_despesa,
        status_despesa :"E",
      }
      props.criar(despesa)
      props.carregaParcelas(despesa)
    }else{
        props.despesa.parcelas_despesa = props.parcelas;
        console.log(props)
        setStatus_form(false)
        props.salvar(props.despesa)
        props.limpar_parcela()
        props.limpar_despesa()
        props.setParcelas([<h1></h1>])
        setFornecedor_despesa([])
        setTipo_despesa([])
        resetForm();
        }
     
  }


  return ( 
    <React.Fragment>
      {!isSubmitionCompleted &&
        <React.Fragment>
          <Formik
            initialValues={{valortotal_despesa: 0, fornecedor_despesa:[],numeroparcela_despesa:0 , descricao_despesa:'',data:data_atual_formata()}}
            onSubmit={(values, { resetForm }) => {
              salvar_despesa(values,resetForm);
              }}
            validationSchema={Yup.object().shape({
               
                valortotal_despesa: Yup.number()
                .required('Obrigatório'),
                data: Yup.string()
                .required('Obrigatório'),
                numeroparcela_despesa: Yup.number()
                .required('Obrigatório'),
                descricao_despesa: Yup.string()
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
          
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}  >
              
              <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Cadastro de Despesas
                    </Typography>
                    <Grid container spacing={3}>
              
                        <Grid item xs={3}>
                            
                              <FormControl fullWidth className={classes.formControl}>
                                <InputLabel id="label_tipo_despesa">Tipo Despesa</InputLabel>
                                <Select
                                    labelId="tipo_despesa"
                                    id="tipo_despesa"
                                    value={tipo_despesa}
                                    onChange={(e) => tipo_despesaSelect(e)}
                                >
                                  <MenuItem value={'Serviço'}>Serviço</MenuItem>
                                  <MenuItem value={'Produto'}>Produto</MenuItem>
                                  <MenuItem value={'Serviço e Produto'}>Serviço e Produto</MenuItem>
                                  <MenuItem value={'Outros'}>Outros</MenuItem>
                                </Select>
                                <FormHelperText>{(errors.tipo_despesa && touched.tipo_despesa) && errors.tipo_despesa}</FormHelperText>
                              </FormControl>
                        
                        
                        
                        </Grid>

                        <Grid item xs={2}>

                        <FormControl fullWidth className={classes.formControl}>
                              <InputLabel id="lable_tipo_despesa">Fornecedor</InputLabel>
                              <Select
                                  labelId="fornecedor_despesa"
                                  id="fornecedor_despesa"
                                  value={fornecedor_despesa}
                                  onChange={(e) => fornecedor_despesaSelect(e)}
                              >
                                {fornecedores != []  ?  fornecedores.map( (fornecedores,index) =>{
                                  return <MenuItem key={index} value={fornecedores}>{fornecedores.nome_fornecedor}</MenuItem>
                                }):<MenuItem></MenuItem>
                                }
                              </Select>
                              <FormHelperText>{(errors.tipo_despesa && touched.tipo_despesa) && errors.tipo_despesa}</FormHelperText>
                        </FormControl>
                    
                        </Grid>

                        <Grid item xs={2}>

                            <TextField
                                fullWidth
                                disabled  = {status_form}
                                placeholder="Número de Parcelas"          
                                label="Número de Parcelas "
                                type="number"
                                name="numeroparcela_despesa"
                                className={classes.textField}
                                value={values.numeroparcela_despesa}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={(errors.numeroparcela_despesa && touched.numeroparcela_despesa) && errors.numeroparcela_despesa}
                                helperText={(errors.numeroparcela_despesa && touched.numeroparcela_despesa) && errors.numeroparcela_despesa}
                               
                              />
                                   
                      
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Valor Total"
                                disabled  = {status_form}
                                name="valortotal_despesa"
                                className={classes.textField}
                                value={values.valortotal_despesa}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error = {(errors.valortotal_despesa && touched.valortotal_despesa) && errors.valortotal_despesa}
                                helperText={(errors.valortotal_despesa && touched.valortotal_despesa) && errors.valortotal_despesa}
                                
                             />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                name="data"
                                label="Data da Despesa: *"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={values.data}
                                onChange={handleChange}
                              
                             />
                        </Grid>

                     

                        <Grid item xs={12}>
                          
                        <TextField
                            disabled  = {status_form}
                            fullWidth
                            multiline
                            label="Descrição *"
                            rows="2"
                            defaultValue=""       
                            name="descricao_despesa"
                            className={classes.textField}
                            value={values.descricao_despesa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error = {(errors.descricao_despesa && touched.descricao_despesa) && errors.descricao_despesa}
                            helperText={(errors.descricao_despesa && touched.descricao_despesa) && errors.descricao_despesa}              
                        />

                      </Grid>

                      <Grid item xs={3}>
                            
                            <Button variant="contained" color="primary" type="submit" >
                              {props.despesa !== null ? <span>Avançar</span> :<span>Salvar</span>}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={null}>
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

DespesaCad.propTypes = {
    className: PropTypes.string
  };
  
  export default DespesaCad;