import { EstadoDTO } from './estado.model';

export interface CidadeDTO {

    id: string;
    nome: string;
    estado?: EstadoDTO;
}