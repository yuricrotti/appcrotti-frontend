import api from '../services/api'

const ACTIONS = {

    SALVAR: 'VENDA_SALVAR',
    LISTAR: 'VENDA_LISTAR',
    LISTAR_FILTRO: 'VENDA_LISTAR_FILTRO',
    ALTERARSTATUS: 'VENDA_ALTERARSTATUS',

}

const ESTADO_INICIAL={
    venda:[]
}

export const vendaReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
            return {...state,venda:[...state.venda,action.venda]} 
        
        case ACTIONS.LISTAR_FILTRO:
                return {...state,venda:action.venda}
        case ACTIONS.LISTAR:
                return {...state,venda:action.venda}   
        case ACTIONS.ALTERARSTATUS:
                    return {...state,venda:action.venda} 
        
        default:
            return state;
        }

}

export function listar_venda(){
    return dispatch =>{
        api.get('/venda/showall')
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                venda : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_venda(venda){
    return dispatch =>{
        console.log(venda)
        api.post('/venda/save', venda)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                venda : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}


export function listar_vendas_filtros(filtros){

    return dispatch =>{
       
        
        api.get('/venda/show', { params: filtros}
        )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                venda : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}

export function alterarstatus_venda(id,status){
 
    return dispatch =>{
        api.put('/venda/updatestatus/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERARSTATUS,
                venda : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}