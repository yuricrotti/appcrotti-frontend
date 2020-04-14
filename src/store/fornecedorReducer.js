import api from '../services/api'

const ACTIONS = {
    LISTAR: 'FORNECEDOR_LISTAR',
    SALVAR: 'FORNECEDOR_SALVAR',
    ALTERARSTATUS: 'FORNECEDOR_ALTERARSTATUS',
    DELETAR: 'FORNECEDOR_DELETAR'
}

const ESTADO_INICIAL={
    fornecedor:[]
}

export const fornecedorReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
        case ACTIONS.LISTAR:
            return {...state,fornecedor:action.fornecedor}
        case ACTIONS.ALTERARSTATUS:
            return {...state,fornecedor:action.fornecedor}
        case ACTIONS.SALVAR:
            return {...state,fornecedor:[...state.fornecedor,action.fornecedor]}    
        case ACTIONS.DELETAR:
                return {...state,fornecedor:action.fornecedor}    
        default:
            return state;
        }

}

export function salvar_fornecedor(fornecedor){
    return dispatch =>{
        api.post('/fornecedor/save', fornecedor)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                fornecedor : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}

export function listar_fornecedor(){
    return dispatch =>{
        api.get('/fornecedor/showall')
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                fornecedor : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function alterarstatus_fornecedor(id,status){
 
    return dispatch =>{
        api.put('/fornecedor/updatestatus/'+id,{
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


export function deletar_fornecedor(id){
 
    return dispatch =>{
        api.delete('/fornecedor/delete/'+id)
        .then(response => {
            dispatch({
                type: ACTIONS.DELETAR,
                fornecedor : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}
