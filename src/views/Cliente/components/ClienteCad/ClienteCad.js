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



const ClienteCad = props => {
  const { className,salvar,listar, ...rest } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  
  const salvar_cliente = (values) => {

    const cliente = {
      id_cliente: parseInt(Date.now()),
      nome_cliente:values.nome_cliente,
      registro_cliente:values.registro_cliente,
      cidade_cliente:values.cidade_cliente,
      status_cliente:"A",
    }
    props.salvar_cliente(cliente)
  }

    return ( 
      <React.Fragment>
        {!isSubmitionCompleted &&
          <React.Fragment>
            <Formik
              initialValues={{ nome_cliente: '', registro_cliente: '', cidade_cliente: '' }}
              onSubmit={(values, { resetForm }) => {
                salvar_cliente(values);
                resetForm();
                }}
              validationSchema={Yup.object().shape({
                nome_cliente: Yup.string()
                  .required('Obrigatório'),
                registro_cliente: Yup.string()
                  .required('Obrigatório'),
                cidade_cliente: Yup.string()
                  .required('Obrigatório'),
              })}
            >
            {(props) => {const {
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
                      Cadastro de Cliente
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label="Nome Cliente"
                          name="nome_cliente"
                          className={classes.textField}
                          value={values.nome_cliente}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={(errors.nome_cliente && touched.nome_cliente) && errors.nome_cliente}
                          helperText={(errors.nome_cliente && touched.nome_cliente) && errors.nome_cliente}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label="Registro Cliente"
                          name="registro_cliente"
                          className={classes.textField}
                          value={values.registro_cliente}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={(errors.registro_cliente && touched.registro_cliente) && errors.registro_cliente}
                          helperText={(errors.registro_cliente && touched.registro_cliente) && errors.registro_cliente}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label="Cidade do Cliente"
                          name="cidade_cliente"
                          className={classes.textField}
                          value={values.cidade_cliente}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error = {(errors.cidade_cliente && touched.cidade_cliente) && errors.cidade_cliente}
                          helperText={(errors.cidade_cliente && touched.cidade_cliente) && errors.cidade_cliente}
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

ClienteCad.propTypes = {
    className: PropTypes.string
  };
  
  export default ClienteCad;