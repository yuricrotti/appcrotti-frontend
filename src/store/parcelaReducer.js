import api from '../services/api'

const ACTIONS = {
    CRIAR: 'PARCELA_CRIAR',
    SALVAR: 'PARCELA_SALVAR',
    LIMPAR: 'PARCELA_LIMPAR',
    LISTAR_FILTRO: 'PARCELA_LISTAR_FILTRO',
    ALTERAR_STATUS: 'PARCELA_ALTERAR_STATUS',
  

}
const ESTADO_INICIAL={
    parcela:[]
}

export const parcelaReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
        case ACTIONS.CRIAR:
            return {...state,parcela:[...state.parcela,action.parcela]}
        
        case ACTIONS.SALVAR:
                return {...state,parcela:[...state.parcela,action.parcela]}
        case ACTIONS.ALTERAR_STATUS:
                return {...state,parcela:action.parcela}
        case ACTIONS.LISTAR_FILTRO:
                return {...state,parcela:action.parcela}
 
        case ACTIONS.LIMPAR:
                    return {state,parcela:action.parcela}
                    
        default:
            return state;
        }

}



export function listar_parcelas_filtros(filtros){
   
    return dispatch =>{
    
        api.get('/parcela/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                parcela : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}

    

export function criar_parcela(parcela){
    return dispatch =>{
            dispatch({
                type: ACTIONS.CRIAR,
                parcela : parcela
            })   
    }
}  

export function limpar_parcela(){
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                parcela : []
            })   
    }
}  
    

export function alterar_status_parcela(obj){
  

    return dispatch =>{
        api.put('/parcela/updatestatus/'+obj.parcela,{
            parcela : obj.parcela,
            lista_parcelas : obj.lista_parcelas,
            id_despesa : obj.despesa ,
            status_atual : obj.status_atual,
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERARSTATUS,
                parcela : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}
    
export function salvar_parcela(parcela){
    
    return dispatch =>{
        api.post('/parcela/save', parcela)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                parcela : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}





