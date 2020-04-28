import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import timezone from '../../../../services/timezone'
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  IconButton,
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



const PacelaCad = props => {
    const { className } = props;
    const classes = useStyles();

    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);


    const [status_form, setStatus_form] = useState(false)


   
  function data_atual_formatada(){
      var data = new Date(),
          dia  = data.getDate().toString(),
          diaF = (dia.length === 1) ? '0'+dia : dia,
          mes  = (data.getMonth() + (props.id_parcela+1) ).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length === 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return anoF+"-"+(mesF)+"-"+diaF;
  }

  const salvar_parcela = (values) => {

    setStatus_form(true)
      const parcela = {
        id_parcela: parseInt(Date.now()),
        datapagamento_parcela:timezone.add_timezone_offset(values.datapagamento_parcela),
        valor_parcela:values.valor_parcela,
        fornecedor_parcela: props.despesa.fornecedor_despesa,
        status_parcela:"E",
      }  
      props.salvar_parcelas(parcela)
     
  }


  return ( 
    <React.Fragment>
      {!isSubmitionCompleted &&
        <React.Fragment>
          <Formik
            initialValues={{ valor_parcela: props.despesa.valortotal_despesa/props.despesa.numeroparcela_despesa, datapagamento_parcela: data_atual_formatada(), id_parcela:props.id_parcela + 1 }}
            onSubmit={(values, { resetForm }) => {
              salvar_parcela(values); 
              
              }}
            validationSchema={Yup.object().shape({
              valor_parcela: Yup.number()
                .required('Obrigatório'),
              datapagamento_parcela: Yup.string()
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
              Parcela {values.id_parcela}
              </Typography>
              <Grid container spacing={3}>
                   
                  <Grid item xs={3}>
                      <TextField  
                          fullWidth
                          disabled  = {status_form}
                          placeholder="Valor da Parcela" 
                          label="Valor da Parcela *" 
                          name="valor_parcela"
                          value={values.valor_parcela}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={(errors.valor_parcela && touched.valor_parcela) && errors.valor_parcela}
                          helperText={(errors.valor_parcela && touched.valor_parcela) && errors.valor_parcela}      
                      />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      disabled  = {status_form}
                      name="datapagamento_parcela"
                      label="Data do Pagamento *"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.datapagamento_parcela}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(errors.datapagamento_parcela && touched.datapagamento_parcela) && errors.datapagamento_parcela}
                      helperText={(errors.datapagamento_parcela && touched.datapagamento_parcela) && errors.datapagamento_parcela} 
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

PacelaCad.propTypes = {
    className: PropTypes.string
  };
  
  export default PacelaCad;