import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { makeStyles } from '@material-ui/styles';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Button,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  TextField,
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



const CadCheque = props => {
  const {className} = props;

  const classes = useStyles();
  
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [status_form, setStatus_form] = useState(false)
 

  
  function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth() +1 ).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+(mesF)+"-"+diaF;
}
const salvar_cheque = (values) => {

  setStatus_form(true)

const cheque = {
    id_cheque: parseInt(Date.now()),
    nome_cheque:values.nome_cheque,
    valor_cheque:values.valor_cheque,
    data_cheque: values.data_cheque,
    status_cheque: props.tipo,
  }  
 // console.log(cheque)
  props.adicionar_lista_cheque(cheque)
   
}

   

  
  return (

    <React.Fragment>
    {!isSubmitionCompleted &&
      <React.Fragment>
        <Formik
          initialValues={{ nome_cheque:'', valor_cheque: 0, data_cheque: dataAtualFormatada(), id_cheque:props.id_cheque + 1 }}
          onSubmit={(values, { resetForm }) => {
            salvar_cheque(values); 
            
            }}
          validationSchema={Yup.object().shape({
            nome_cheque: Yup.string()
            .required('Obrigatório'),
            valor_cheque: Yup.number()
              .required('Obrigatório'),
            data_cheque: Yup.string()
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
  
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
      <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Cheque {values.id_cheque}
            </Typography>
            <Grid container spacing={3}>
                 
                <Grid item xs={3}>
                    <TextField  
                        fullWidth
                        disabled  = {status_form}
                        placeholder="Nome :" 
                        label="Nome :*" 
                        name="nome_cheque"
                        value={values.nome_cheque}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(errors.nome_cheque && touched.nome_cheque) && errors.nome_cheque}
                        helperText={(errors.nome_cheque && touched.nome_cheque) && errors.nome_cheque}      
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField  
                        fullWidth
                        disabled  = {status_form}
                        placeholder="Valor Cheque :" 
                        label="Valor Cheque:*" 
                        name="valor_cheque"
                        value={values.valor_parcela}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(errors.valor_cheque && touched.valor_cheque) && errors.valor_cheque}
                        helperText={(errors.valor_cheque && touched.valor_cheque) && errors.valor_cheque}      
                    />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    disabled  = {status_form}
                    name="data_cheque"
                    label="Data do Cheque *"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={values.data_cheque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.data_cheque && touched.data_cheque) && errors.data_cheque}
                    helperText={(errors.data_cheque && touched.data_cheque) && errors.data_cheque} 
                  />
                </Grid>

                <Grid item xs={3}>   
                    <IconButton aria-label="save"  type="submit" >
                       <DoneAllIcon />
                   </IconButton>  
                      
                   
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

CadCheque.propTypes = {
  className: PropTypes.string,

};

export default CadCheque;