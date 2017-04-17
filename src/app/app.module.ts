import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MultiChatPage } from '../pages/multichat/multichat';
import { EventsPage } from '../pages/events/events';
import { ConnectionsPage } from '../pages/connections/connections';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile'
import { FirebaseConfigService } from '../core/service/service'
import { UserProvider } from '../providers/user.provider'
import { DummyData } from '../providers/dummy.data'
import { ArticlePage } from '../pages/article/article';
import { CommentsPage } from '../pages/comments/comments';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { LoginPage } from '../pages/login/login'
import { SignupPage } from '../pages/signup/signup'
import { Signup2Page } from '../pages/signup2/signup2'
import { PwresetPage } from '../pages/pwreset/pwreset'
import { CreateEventPage } from '../pages/create-event/create-event';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { CreateOppPage } from '../pages/create-opp/create-opp';
import { OppDetailPage } from '../pages/opp-detail/opp-detail'
import { AuthProvider } from '../providers/auth.provider'
import { ProfileData } from '../providers/profile.data'
import { EventData } from '../providers/event.provider'
import { EventDetailPage } from '../pages/event-detail/event-detail'
import { ArticleProvider } from '../providers/article-provider'
import { CreateChatPage } from '../pages/create-chat/create-chat'
import { CreateMessagePage } from '../pages/create-message/create-message'
import { OpportunityData } from '../providers/opportunity.provider'
import { Camera } from '@ionic-native/camera';
import { ChatProvider } from '../providers/chat.provider'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArticlePage,
    CommentsPage,
    MultiChatPage,
    ConnectionsPage,
    EventDetailPage,
    EventsPage,
    LoginPage,
    OpportunitiesPage,
    ProfilePage,
    PwresetPage,
    SignupPage,
    Signup2Page,
    TabsPage,
    CreateEventPage,
    CreateOppPage,
    OppDetailPage,
    CreateChatPage,
    CreateMessagePage,
    EditProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArticlePage,
    CommentsPage,
    MultiChatPage,
    ConnectionsPage,
    EventDetailPage,
    EventsPage,
    LoginPage,
    OpportunitiesPage,
    ProfilePage,
    PwresetPage,
    SignupPage,
    Signup2Page,
    TabsPage,
    CreateEventPage,
    CreateOppPage,
    OppDetailPage,
    CreateChatPage,
    CreateMessagePage,
    EditProfilePage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
      FirebaseConfigService,
      UserProvider, ProfileData,
      AuthProvider, EventData,
      DummyData, ArticleProvider,
      OpportunityData, Camera,
      ChatProvider]

})
export class AppModule {}
