import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PlayerComponent} from "./components/player/player.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UploadComponent} from "./components/upload/upload.component";
import {LogInComponent} from "./components/log-in/log-in.component";
import {SearchComponent} from "./components/search/search.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }, {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'playlist',
    component: PlaylistComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
