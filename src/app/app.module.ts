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
import { Signup3Page } from '../pages/signup3/signup3'
import { PwresetPage } from '../pages/pwreset/pwreset'
import { CreateEventPage } from '../pages/create-event/create-event';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EditChatPage } from '../pages/edit-chat/edit-chat';
import { CreateOppPage } from '../pages/create-opp/create-opp';
import { OppDetailPage } from '../pages/opp-detail/opp-detail'
import { AuthProvider } from '../providers/auth.provider'
import { ProfileData } from '../providers/profile.data'
import { EventData } from '../providers/event.provider'
import { EventDetailPage } from '../pages/event-detail/event-detail'
import { ArticleProvider } from '../providers/article-provider'
import { CreateChatPage } from '../pages/create-chat/create-chat'
import { CreateMessagePage } from '../pages/create-message/create-message'
import { GroupchatPage } from '../pages/groupchat/groupchat'
import { OpportunityData } from '../providers/opportunity.provider'
import { Camera } from '@ionic-native/camera';
import { ChatProvider } from '../providers/chat.provider'
import { MyOppsPage } from '../pages/my-opps/my-opps'
import { MyEventsPage } from '../pages/my-events/my-events'
import { ViewProfilePage } from '../pages/view-profile/view-profile'
import { GeoLocationPage } from '../pages/geo-location/geo-location'
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AboutPage } from '../pages/about/about';


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
    Signup3Page,
    TabsPage,
    CreateEventPage,
    CreateOppPage,
    OppDetailPage,
    CreateChatPage,
    GroupchatPage,
    CreateMessagePage,
    EditProfilePage,
    EditChatPage,
    ViewProfilePage,
    MyEventsPage,
    MyOppsPage,
    GeoLocationPage,
    AboutPage,
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
    Signup3Page,
    TabsPage,
    CreateEventPage,
    CreateOppPage,
    OppDetailPage,
    CreateChatPage,
    GroupchatPage,
    CreateMessagePage,
    EditProfilePage,
    EditChatPage,
    ViewProfilePage,
    MyEventsPage,
    MyOppsPage,
    GeoLocationPage,
    AboutPage,

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
      FirebaseConfigService,
      UserProvider, ProfileData,
      AuthProvider, EventData,
      DummyData, ArticleProvider,
      OpportunityData, Camera,
      ChatProvider, Geolocation,
      InAppBrowser]

})
export class AppModule {}
