import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PeopleComponent } from './people/people.component';
import { HeaderComponent } from './header/header.component';
import { PersonListItemComponent } from './people/person-list-item/person-list-item.component';
import { PostComponent } from './shared/post/post.component';
import { ProfileAboutComponent } from './profile/profile-about/profile-about.component';
import { ProfilePhotosComponent } from './profile/profile-photos/profile-photos.component';
import { ProfilePostsComponent } from './profile/profile-posts/profile-posts.component';
import { ProfileMissionComponent } from './profile/profile-mission/profile-mission.component';
import { ProfileSubheaderComponent } from './profile/profile-subheader/profile-subheader.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NewsfeedComponent,
    PeopleComponent,
    HeaderComponent,
    PersonListItemComponent,
    PostComponent,
    ProfileAboutComponent,
    ProfilePhotosComponent,
    ProfilePostsComponent,
    ProfileMissionComponent,
    ProfileSubheaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
