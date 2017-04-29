import { Component } from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { ArticleProvider } from '../../providers/article-provider'
import { ProfileData } from '../../providers/profile.data'



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
  private profileData
  private me: any;
  private comments: any[]
  private articleid

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams,
    private articledb: ArticleProvider, private profile: ProfileData) {
      this.articleid = this.navParams.get('articleId');
      this.comments=[]
      this.profile.getUserProfile().on('value', (data) => {
              this.me ={
                id:data.key,
                firstname:data.val().firstName,
                lastname:data.val().lastName,
                pic:data.val().profilePic
              }
            });
      this.getArticle()
      this.getAddedComments()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage')
  }
  getArticle(){
    this.articledb.getArticleDetail(this.articleid)
    .on('value', snapshot => {
    this.article = snapshot.val();
    });
  }
  getAddedComments(){
    this.articledb.getAddedComments(this.articleid)
        .subscribe(comment => {
      this.comments.push(comment)
      console.log(this.comments)
    },
    err =>{
       console.error("Unable to add user - ", err)
    })
  }
  addComment(comment:string){
    this.articledb.addComment(this.articleid,comment,this.me).
    then(()=>{
      
    })
  }
  closeComments(){
    this.viewCtrl.dismiss();
  }

  article(){
    this.navCtrl.push(ArticlePage);
  }

}
