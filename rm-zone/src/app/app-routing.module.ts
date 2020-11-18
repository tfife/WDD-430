import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PeopleComponent } from './people/people.component';
import { ProfileAboutComponent } from './profile/profile-about/profile-about.component';
import { ProfileMissionComponent } from './profile/profile-mission/profile-mission.component';
import { ProfilePhotosComponent } from './profile/profile-photos/profile-photos.component';
import { ProfilePostsComponent } from './profile/profile-posts/profile-posts.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/newsfeed', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, children: [
        { path: '', redirectTo: '/profile/posts', pathMatch: 'full' },
        { path: 'posts', component: ProfilePostsComponent },
        { path: 'photos', component: ProfilePhotosComponent },
        { path: 'about', component: ProfileAboutComponent },
        { path: 'mission', component: ProfileMissionComponent }
    ] },
    { path: 'newsfeed', component: NewsfeedComponent },
    { path: 'people', component: PeopleComponent }
    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}