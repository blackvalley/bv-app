import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { MultiChatPage } from '../multichat/multichat';
import { OpportunitiesPage } from '../opportunities/opportunities';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = OpportunitiesPage;
  tab3Root: any = ProfilePage;
  tab4Root: any = EventsPage;
  tab5Root: any = MultiChatPage;

  constructor() {

  }
}
