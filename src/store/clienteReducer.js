import api from '../services/api'

const ACTIONS = {

    SALVAR: 'CLIENTE_SALVAR',
    LISTAR: 'CLIENTE_LISTAR'

}

const ESTADO_INICIAL={
    cliente:[]
}

export const clienteReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
            return {...state,cliente:[...state.cliente,action.cliente]} 

        case ACTIONS.LISTAR:
                return {...state,cliente:action.cliente}   
        
        default:
            return state;
        }

}

export function listar_cliente(){
    return dispatch =>{
        api.get('/cliente/showall')
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                cliente : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_cliente(cliente){
    
    return dispatch =>{
        console.log(cliente)
        api.post('/cliente/save', cliente)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                cliente : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}
