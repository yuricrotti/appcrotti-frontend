import api from '../services/api'

const ACTIONS = {

    SALVAR: 'RECEBIMENTO_SALVAR',
    LIMPAR: 'RECEBIMENTO_LIMPAR',
    LISTAR_FILTRO: 'RECEBIMENTO_LISTAR_FILTRO'

}

const ESTADO_INICIAL={
    recebimento:[]
}

export const recebimentoReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
                return {...state,recebimento:[...state.recebimento,action.recebimento]} 
        case ACTIONS.LIMPAR:
                return {...state,recebimento:action.recebimento} 
        case ACTIONS.LISTAR_FILTRO:
                return {...state,recebimento:action.recebimento}
        default:
            return state;
        }

}

export function limpar_recebimento(){
    
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                recebimento : []
            })   
        
    }  
    
}


export function listar_recebimentos_filtros(filtros){

    return dispatch =>{
       
        api.get('/recebimento/show', { params: filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                recebimento : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_recebimento(recebimento){
    
    return dispatch =>{
        console.log(recebimento)
        api.post('/recebimento/save', recebimento)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                recebimento : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}
