import { Component } from '@angular/core';
import { ActionSheetController, Platform, NavController, ModalController,
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
  constructor(public actionSheetCtrl: ActionSheetController, public platform: Platform, public navCtrl: NavController, public modalCtrl: ModalController,
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
  openComments(articleId){
    let commentsModal = this.modalCtrl.create(CommentsPage, {
      articleId:articleId
    });
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

  shareOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share via...',
      cssClass: 'share-action-sheet',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Text',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'text' : null,
          handler: () => {
            console.log('Text clicked');
          }
        },
        {
          text: 'Email',
          icon: !this.platform.is('ios') ? 'mail' : null,
          handler: () => {
            console.log('Email clicked');
          }
        },
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'facebook' : null,
          handler: () => {
            console.log('Facebook clicked');
          }
        },
        {
          text: 'Twitter',
          icon: !this.platform.is('ios') ? 'twitter' : null,
          handler: () => {
            console.log('Twitter clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
