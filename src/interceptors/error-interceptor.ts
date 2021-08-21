import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .catch((error) => {

                let errorObj = error
                if (errorObj.error) {
                    errorObj = errorObj.error
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj)
                }

                console.log("Error detected by interceptor:")
                console.log(errorObj)

                switch (errorObj.status) {
                    case 401:
                        this.handle401()
                        break;
                    case 403:
                        this.handle403()
                        break;

                    default:
                        this.handleDefaultError(errorObj)
                        break;
                }

                return Observable.throw(errorObj)
            }) as any
    }

    handleDefaultError(errorObj: any) {
        this.alert(`Error ${errorObj.status}: ${errorObj.error}`, errorObj.message)
    }

    handle403() {
        this.storage.setLocalUser(null)
    }

    handle401() {
        this.alert('Error 401: Authentication failure', 'Email or password invalid')
    }

    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title,
            message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        })
        alert.present()
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}