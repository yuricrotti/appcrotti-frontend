import api from '../services/api'

const ACTIONS = {

    SALVAR: 'DINHEIRO_SALVAR',
    LISTAR: 'DINHEIRO_LISTAR',
    LIMPAR: 'DINHEIRO_LIMPAR',
    LISTAR_FILTRO: 'DINHEIRO_LISTAR_FILTRO',

}

const ESTADO_INICIAL={
    dinheiro:[]
}

export const dinheiroReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
                return {...state,dinheiro:[...state.dinheiro,action.dinheiro]} 
        case ACTIONS.LIMPAR:
                return {...state,dinheiro:action.dinheiro} 
        case ACTIONS.LISTAR_FILTRO:
            return {...state,dinheiro:action.dinheiro}
        default:
            return state;
        }

}



export function limpar_dinheiro(){
    
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                dinheiro : []
            })   
        
    }  
    
}



export function salvar_dinheiro(dinheiro){
    
    return dispatch =>{
        console.log(dinheiro)
        api.post('/dinheiro/save', dinheiro)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                dinheiro : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}

export function listar_dinheiro_filtros(filtros){

    return dispatch =>{
       
        api.get('/dinheiro/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                dinheiro : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}