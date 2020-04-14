import api from '../services/api'

const ACTIONS = {

    SALVAR: 'COMPRA_SALVAR',
    LISTAR: 'COMPRA_LISTAR',
    LISTAR_FILTRO: 'COMPRA_LISTAR_FILTRO',
    ALTERAR_STATUS: 'VENDA_ALTERAR_STATUS',

}

const ESTADO_INICIAL={
    compra:[]
}

export const compraReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
            return {...state,compra:[...state.compra,action.compra]} 

        case ACTIONS.LISTAR:
            return {...state,compra:action.compra}   

        case ACTIONS.LISTAR_FILTRO:
            return {...state,compra:action.compra}
        
        case ACTIONS.ALTERAR_STATUS:
                return {...state,compra:action.compra} 
    
        
        default:
            return state;
        }

}

export function listar_compra(){
    return dispatch =>{
        api.get('/compra/showall')
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                compra : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}

export function listar_compras_filtros(filtros){

    return dispatch =>{
        
        api.get('/compra/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                compra : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_compra(compra){
    return dispatch =>{
        api.post('/compra/save', compra)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                compra : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}

export function alterarstatus_compra(id,status){
 
    return dispatch =>{
        api.put('/compra/updatestatus/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERAR_STATUS,
                compra : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}