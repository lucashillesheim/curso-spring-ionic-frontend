import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produtoId: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/products/${produtoId}`);
    }

    findByCategoria(categoriaId: string, page: number = 0, perPage: number = 24) {
        return this.http
            .get(`${API_CONFIG.baseUrl}/products/?categorias=${categoriaId}&page=${page}&perPage=${perPage}`);
    }

    getThumbnailFromBucket(id: string): Observable<any> {
        return this.getFromBucket(`prod${id}-small.jpg`)
    }

    getImageFromBucket(id: string): Observable<any> {
        return this.getFromBucket(`prod${id}.jpg`)
    }

    getFromBucket(param: string) {
        let url = `${API_CONFIG.bucketBaseUrl}/${param}`
        return this.http.get(url, { responseType: 'blob' });
    }
}