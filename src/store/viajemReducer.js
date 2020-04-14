import api from '../services/api'

const ACTIONS = {

    SALVAR: 'VIAJEM_SALVAR',
    LISTAR: 'VIAJEM_LISTAR',
    ALTERAR_STATUS: 'VIAJEM_ALTERAR_STATUS'

}

const ESTADO_INICIAL={
    viajem:[]
}

export const viajemReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.SALVAR:
            return {...state,viajem:[...state.viajem,action.viajem]} 

        case ACTIONS.LISTAR:
                return {...state,viajem:action.viajem}   
        
        case ACTIONS.ALTERAR_STATUS:
                return {...state,viajem:action.viajem}   
            
        default:
            return state;
        }

}

export function listar_viajem(){
    return dispatch =>{
        api.get('/viajem/showall')
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                viajem : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}


export function salvar_viajem(viajem){
    return dispatch =>{
        api.post('/viajem/save', viajem)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                viajem : response.data
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}

export function alterarstatus_viajem(id,status){
 
    return dispatch =>{
        api.put('/viajem/updatestatus/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERARSTATUS,
                viajem : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}
