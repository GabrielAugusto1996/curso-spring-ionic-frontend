import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from '../../models/cliente.model';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) { }

    findByEmail(email: string) {

        return this.http.get( `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    inserirUsuario(obj: ClienteDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj, 
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }
}