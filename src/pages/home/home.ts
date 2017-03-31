import { Component } from '@angular/core';
import { NavController, ModalController,
AlertController, LoadingController } from 'ionic-angular';
import { ArticleProvider } from '../../providers/article-provider'
import { ArticlePage } from '../article/article';
import { CommentsPage } from '../comments/comments';
//import { LoginPage } from '../login/login'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private articles:any[]
  private loader
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private articledb: ArticleProvider,private loadingCtrl:LoadingController,
    private alertCtrl:AlertController) {
     this.articles = []
     this.getAddedArticles()
  }
  article(){
    this.navCtrl.push(ArticlePage);
  }

  comments(){
    let commentsModal = this.modalCtrl.create(CommentsPage);
    commentsModal.present();
  }
  getAddedArticles(){
    this.showLoading()
    this.articledb.getAddedArticles()
          .subscribe(article=> {
            console.log(article)
            this.articles.push(article)
          },
          err =>{
             console.error("Unable to add user - ", err)
          })
    this.loader.dismiss()

  }


  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }



}
