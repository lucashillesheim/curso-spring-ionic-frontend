import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { FieldMessage } from "../models/fieldMessage";
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
                    case 422:
                        this.handl422(errorObj)
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

    handle401() {
        this.alert('Error 401: Authentication failure', 'Email or password invalid')
    }

    handle403() {
        this.storage.setLocalUser(null)
    }

    handl422(errorObj: any) {
        this.alert('Error 422: Validation Error', this.listErrors(errorObj.errors))
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

    private listErrors(messages: Array<FieldMessage>): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}