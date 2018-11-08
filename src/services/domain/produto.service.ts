import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.model';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findByCategoria(categoriaId: string) {

        return this.http.get<ProdutoDTO>(
            `${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}`)
    }
}