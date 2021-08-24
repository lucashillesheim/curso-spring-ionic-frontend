import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<Array<EstadoDTO>> {
        return this.http.get<Array<EstadoDTO>>(`${API_CONFIG.baseUrl}/states`);
    }
}