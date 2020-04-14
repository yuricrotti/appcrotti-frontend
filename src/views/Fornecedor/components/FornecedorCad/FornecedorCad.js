import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Formik,
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



const FornecedorCad = props => {
    const { className,salvar,listar, ...rest } = props;
    const classes = useStyles();


    const [open, setOpen] = useState(false);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
    

    

    const salvar_forncedor = (values) => {

      const fornecedor = {
        id_fornecedor: parseInt(Date.now()),
        nome_fornecedor:values.nome_fornecedor,
        registro_fornecedor:values.registro_fornecedor,
        cidade_fornecedor:values.cidade_fornecedor,
        status_fornecedor:"A",
      }
      salvar(fornecedor)
     
  
  }


  return ( 
    <React.Fragment>
      {!isSubmitionCompleted &&
        <React.Fragment>
          <Formik
            initialValues={{ nome_fornecedor: '', registro_fornecedor: '', cidade_fornecedor: '' }}
            onSubmit={(values, { resetForm }) => {
              salvar_forncedor(values);
              resetForm();
              }}
            validationSchema={Yup.object().shape({
              nome_fornecedor: Yup.string()
                .required('Obrigatório'),
              registro_fornecedor: Yup.string()
                .required('Obrigatório'),
                cidade_fornecedor: Yup.string()
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
                        Cadastro de Fornecedor
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Nome Fornecedor"
                            name="nome_fornecedor"
                            className={classes.textField}
                            value={values.nome_fornecedor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={(errors.nome_fornecedor && touched.nome_fornecedor) && errors.nome_fornecedor}
                            helperText={(errors.nome_fornecedor && touched.nome_fornecedor) && errors.nome_fornecedor}
                            margin="normal"
                          />
                        
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Registro Fornecedor"
                            name="registro_fornecedor"
                            className={classes.textField}
                            value={values.registro_fornecedor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={(errors.registro_fornecedor && touched.registro_fornecedor) && errors.registro_fornecedor}
                            helperText={(errors.registro_fornecedor && touched.registro_fornecedor) && errors.registro_fornecedor}
                            margin="normal"
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label="Cidade do Fornecedor"
                            name="cidade_fornecedor"
                            className={classes.textField}
                            value={values.cidade_fornecedor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error = {(errors.cidade_fornecedor && touched.cidade_fornecedor) && errors.cidade_fornecedor}
                            helperText={(errors.cidade_fornecedor && touched.cidade_fornecedor) && errors.cidade_fornecedor}
                            margin="normal"
                          />

                        </Grid>

                        <Grid item xs={3}>
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
        </React.Fragment>}
    </React.Fragment>
  );
}

FornecedorCad.propTypes = {
    className: PropTypes.string
  };
  
  export default FornecedorCad;