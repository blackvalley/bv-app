import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseConfigService } from '../core/service/service'
import { Observable } from 'rxjs/Observable'
/*
  Generated class for the ArticleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ArticleProvider {

  private articledb :firebase.database.Reference

  constructor(public http: Http, private fire: FirebaseConfigService) {
    console.log('Hello ArticleProvider Provider');
    this.articledb= this.fire.getDatabase().ref('/articles')
  }
  getAddedComments(articleid:string):Observable<any>{
    return Observable.create(obs=>{
      this.articledb.child(articleid).child('comments').on('child_added', comment =>{
        obs.next(comment.val())//gets data from article and converts to json
      },
      err =>{

      })
    })
  }

  getArticles():firebase.database.Reference{
    return this.articledb
  }
  getArticleDetail(articleId): firebase.database.Reference {
  return this.articledb.child(articleId);
  }
  addComment(articleid:string,comment:string,sender):firebase.Promise<any>{
    let timestamp=Date.now()
    return this.articledb.child(articleid).update({
      latestUpdate:timestamp,
      latestComment:comment
    }).then(()=>{
      this.articledb.child(articleid).child('comments').push({
          timestamp:timestamp,
          sender:sender,
          comment:comment
      })
    })

  }
  addLike(articleid:string, sender):firebase.Promise<any>{
    return this.articledb.child(articleid).child('likes').
      child(sender.id).set({
      sender:sender
    })
  }


}
