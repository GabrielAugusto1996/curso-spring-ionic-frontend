import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from '../../models/cliente.model';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient, private storageService: StorageService) { }

    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`, 
            {
                'headers': authHeader});

    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}