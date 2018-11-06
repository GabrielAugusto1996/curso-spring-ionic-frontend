import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor (public storage: StorageService, public alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error;
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Error detectado pelo interceptor:");
                console.log(errorObj);

                switch(errorObj.status) {

                    case 403:
                        this.handle403();
                        break;
                    case 401:
                        this.handle401();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
            }) as any;

    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error ' + errorObj.status + ': ' + errorObj.console.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        alert.present();
    }

    handle403() {
        this.storage.removeLocalUser();
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Error 401: Falha de Autenticação',
            message: 'E-mail ou Senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
