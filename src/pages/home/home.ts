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
     this.getArticles()
  }

  goToArticle(articleId):void{
    this.navCtrl.push(ArticlePage, {
      articleId:articleId
    })
  }


  comments(){
    let commentsModal = this.modalCtrl.create(CommentsPage);
    commentsModal.present();
  }
  getArticles(){
    this.showLoading()
    this.articledb.getArticles().on('value',snapshot =>{
        let rawData = [];
      snapshot.forEach(snap =>{
        rawData.push({
          id:snap.key,
          author:snap.val().author,
          date:snap.val().dateposted,
          intro:snap.val().intro,
          pg1:snap.val().parg1,
          pg2:snap.val().parg2,
          pg3:snap.val().parg3,
          qoute:snap.val().qoute,
          madeqoute:snap.val().madeqoute,
          title:snap.val().title
        })
        return false
      })
      this.articles=rawData
      this.loader.dismiss()

    })
  }


  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'You\'re The Best!...'
    });
    this.loader.present();
  }



}
