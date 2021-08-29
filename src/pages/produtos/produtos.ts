import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
    selector: 'page-produtos',
    templateUrl: 'produtos.html',
})
export class ProdutosPage {

    items: Array<ProdutoDTO> = []

    page = 0

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public produtoService: ProdutoService,
        public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.loadData();
    }

    private loadData() {
        let categoriaId = this.navParams.get('categoriaId');
        let loader = this.presentLoading();
        this.produtoService.findByCategoria(categoriaId, this.page, 10)
            .subscribe(response => {
                let start = this.items.length
                this.items = this.items.concat(response['content']);
                let end = this.items.length - 1
                loader.dismiss();
                this.loadImageUrls(start, end);
            },
                error => { loader.dismiss(); });
    }

    loadImageUrls(start: number, end: number) {
        for (let i = start; i <= end; i++) {
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

    presentLoading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        return loader;
    }

    doRefresh(refresher) {
        this.resetPageAndItems()
        this.loadData()
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    doInfinite(infiniteScroll) {
        this.page++
        this.loadData()
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000)
    }

    resetPageAndItems() {
        this.page = 0
        this.items = []
    }

}
