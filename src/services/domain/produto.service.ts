import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findByCategoria(categoriaId: string) {
        return this.http.get<Array<ProdutoDTO>>(`${API_CONFIG.baseUrl}/products/?categorias=${categoriaId}`);
    }
}