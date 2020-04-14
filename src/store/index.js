import {combineReducers} from 'redux'
import {chequeReducer} from './chequeReducer'
import {clienteReducer} from './clienteReducer'
import {compraReducer} from './compraReducer'
import {dinheiroReducer} from './dinheiroReducer'
import {fornecedorReducer} from './fornecedorReducer'
import {despesaReducer} from './despesaReducer'
import {parcelaReducer} from './parcelaReducer'
import {pagamentoReducer} from './pagamentoReducer'
import {recebimentoReducer} from './recebimentoReducer'
import {vendaReducer} from './vendaReducer'

import {viajemReducer} from './viajemReducer'

 


const mainReducer = combineReducers({
    cliente: clienteReducer,
    fornecedor : fornecedorReducer,
    despesa: despesaReducer,
    parcela: parcelaReducer,
    pagamento: pagamentoReducer,
    venda: vendaReducer,
    compra: compraReducer,
    viajem: viajemReducer,
    cheque: chequeReducer,
    dinheiro:dinheiroReducer,
    recebimento:recebimentoReducer,
  
})


export default mainReducer;