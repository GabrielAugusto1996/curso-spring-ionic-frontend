import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.model';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoriaId: string) {

        return this.http.get<ProdutoDTO>(
            `${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}`)
    }

    getSmallImageFromBucket(id: string): Observable<any> {

        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;

        return this.http.get(url, {responseType: 'blob'});

    }

    getImageFromBucket(id: string): Observable<any> {

        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;

        return this.http.get(url, {responseType: 'blob'});

    }
}