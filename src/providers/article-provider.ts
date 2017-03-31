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

  private articledb = this.fire.getDatabase().ref('/articles')

  constructor(public http: Http, private fire: FirebaseConfigService) {
    console.log('Hello ArticleProvider Provider');
  }
  getAddedArticles():Observable<any>{
    return Observable.create(obs=>{
      this.articledb.on('child_added', article =>{
        obs.next(article.val())//gets data from article and converts to json
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


}
