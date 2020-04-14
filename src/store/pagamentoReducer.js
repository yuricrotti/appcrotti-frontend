import api from '../services/api'

const ACTIONS = {

    SALVAR: 'PAGAMENTO_SALVAR',
    LIMPAR: 'PAGAMENTO_LIMPAR',
    LISTAR_FILTRO: 'PAGAMENTO_LISTAR_FILTRO'

}

const ESTADO_INICIAL={
    pagamento:[]
}

export const pagamentoReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
                return {...state,pagamento:[...state.pagamento,action.pagamento]} 
        case ACTIONS.LIMPAR:
                return {...state,pagamento:action.pagamento} 
        case ACTIONS.LISTAR_FILTRO:
                return {...state,pagamento:action.pagamento}
        default:
            return state;
        }

}

export function limpar_pagamento(){
    
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                pagamento : []
            })   
        
    }  
    
}


export function listar_pagamento_filtros(filtros){

    return dispatch =>{
       
        api.get('/pagamento/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                pagamento : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_pagamento(pagamento){
    
    return dispatch =>{
        api.post('/pagamento/save', pagamento)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                pagamento : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}
