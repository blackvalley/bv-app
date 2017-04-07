import { Component } from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { ArticleProvider } from '../../providers/article-provider'


/*
  Generated class for the Comments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html'
})
export class CommentsPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
    private articledb: ArticleProvider) {
  }

  ionViewDidLoad() {
    this.articledb.getArticleDetail(this.navParams.get('articleId'))
    .on('value', snapshot => {
    this.article = snapshot.val();
    });
    console.log('ionViewDidLoad CommentsPage')
  }


  closeComments(){
    this.viewCtrl.dismiss();
  }

  article(){
    this.navCtrl.push(ArticlePage);
  }

}
