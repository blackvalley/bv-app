import { Component } from '@angular/core';
import { ActionSheetController, Platform, NavController, ModalController,
AlertController, LoadingController } from 'ionic-angular';
import { ArticleProvider } from '../../providers/article-provider'
import { ArticlePage } from '../article/article';
import { CommentsPage } from '../comments/comments';
import { ProfileData } from '../../providers/profile.data'
import { AboutPage } from '../about/about';

//import { LoginPage } from '../login/login'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private articles:any[]
  private loader
  private user: any;
  private numOfLikes:number = 0
  private lastArticle: any[]


  constructor(public actionSheetCtrl: ActionSheetController, public platform: Platform, public navCtrl: NavController, public modalCtrl: ModalController,
    private articledb: ArticleProvider,private loadingCtrl:LoadingController,
    private alertCtrl:AlertController, private profile: ProfileData) {
     this.articles = []
     this.showLoading()
     this.getArticles()
     this.profile;


     this.profile.getUserProfile().on('value', (data) => {
       this.user = {
         id:data.key,
         firstname:data.val().firstName,
         lastname:data.val().lastName,
         pic:data.val().profilePic
       }
           });
      this.loader.dismiss()

  }

  goToArticle(articleId):void{
    this.navCtrl.push(ArticlePage, {
      articleId:articleId,

    })
    console.log(articleId);
    console.log('articleid ^')

  }
  openComments(articleKey){
    let commentsModal = this.modalCtrl.create(CommentsPage, {
      articleKey:articleKey
    });
    commentsModal.present();
  }

  openAbout(){
    let commentsModal = this.modalCtrl.create(AboutPage);
    commentsModal.present();
  }


  getArticles(){
    this.articledb.getArticles().on('value',snapshot =>{
      this.articles = snapshot.val();
      console.log(this.articles);
      this.lastArticle = this.articles[this.articles.length-1];

    })

  }


  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'You\'re The Best!...'
    });
    this.loader.present();
  }

  shareOptions(articleid:string) {
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

  addLike(articleid:string){
    this.articledb.addLike(articleid,this.user)
  }



}
