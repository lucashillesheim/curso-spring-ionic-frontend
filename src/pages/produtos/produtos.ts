import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
    selector: 'page-produtos',
    templateUrl: 'produtos.html',
})
export class ProdutosPage {

    items: Array<ProdutoDTO>

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public produtoService: ProdutoService) {
    }

    ionViewDidLoad() {
        let categoriaId = this.navParams.get('categoriaId')
        this.produtoService.findByCategoria(categoriaId)
            .subscribe(response => {
                this.items = response['content']
                this.loadImageUrls()
            },
                error => { })
    }

    loadImageUrls() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            this.produtoService.getThumbnailFromBucket(item.id)
                .subscribe(response => {
                    item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
                },
                    error => { })
        }
    }

    showDetail(produtoId: String) {
        this.navCtrl.push('ProdutoDetailPage', { produtoId })
    }

}
