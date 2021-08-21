import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToApi = req.url.startsWith(API_CONFIG.baseUrl)
        let localUser = this.storage.getLocalUser()

        if (localUser && requestToApi) {
            const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + localUser.token } })
            return next.handle(authReq)
        }
        return next.handle(req)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}