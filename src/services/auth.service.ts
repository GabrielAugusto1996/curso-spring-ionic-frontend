import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.model';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private storageService: StorageService) {}

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    loginSucess(authorizationValue : string) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.removeLocalUser();
    }

}