import api from '../services/api'

const ACTIONS = {
    CRIAR: 'DESPESA_CRIAR',
    LIMPAR: 'DESPESA_LIMPAR',
    SALVAR: 'DESPESA_SALVAR',
    LISTAR_FILTRO: 'DESPESA_LISTAR_FILTRO',
    STATUS: 'DESPESA_STATUS',

}

const ESTADO_INICIAL={
    despesa:[]
}

export const despesaReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
        case ACTIONS.SALVAR:
            return {...state,despesa:action.despesa}    
        case ACTIONS.CRIAR:
            return {...state,despesa:action.despesa}
        case ACTIONS.LIMPAR:
                return {...state,despesa:action.despesa}
        case ACTIONS.LISTAR_FILTRO:
                return {...state,despesa:action.despesa}
        case ACTIONS.STATUS:
                 return {...state,despesa:action.despesa}
        default:
            return state;
        }

}

export function criar_despesa(despesas){
    return dispatch =>{
            dispatch({
                type: ACTIONS.CRIAR,
                despesa : despesas
            })   
    }
}  


    
export function salvar_despesa(despesa){
    
    return dispatch =>{
        api.post('/despesa/save', despesa)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                despesa : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}


export function limpar_despesa(){
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                despesa : []
            })   
    }
}  
    


export function alterar_status_despesa(id,status){
 
    return dispatch =>{
        api.put('/despesa/updatestatus/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERARSTATUS,
                fornecedor : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}

export function listar_despesas_filtros(filtros){
   
    return dispatch =>{
    
        api.get('/despesa/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                despesa : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}