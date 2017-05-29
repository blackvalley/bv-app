import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArticleProvider } from '../../providers/article-provider'

/*
  Generated class for the Article page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage {
  private article

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private articledb: ArticleProvider) {

  }


  ionViewDidLoad() {
    this.article = this.navParams.get('article')
    console.log(this.article);
    console.log('Program Ran')


  }


}
