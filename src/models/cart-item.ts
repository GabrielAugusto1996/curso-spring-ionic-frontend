import { ProdutoDTO } from './produto.model';

export interface CartItem {

    quantidade: number;
    produto: ProdutoDTO;

}