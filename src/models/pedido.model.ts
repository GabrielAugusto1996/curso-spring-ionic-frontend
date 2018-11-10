import { ItemPedidoDTO } from './item-pedido.model';
import { PagamentoDTO } from './pagamento.model';
import { RefDTO } from './ref.model';
export interface PedidoDTO {

    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];


}