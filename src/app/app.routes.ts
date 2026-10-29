import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FeedsComponent } from './features/feeds/feeds.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { isAllowedAuthGuard } from './core/auth/guards/is-allowed-auth-guard';
import { allreadyLoggedGuard } from './core/auth/guards/allready-logged-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { FollowSuggestionsComponent } from './features/feeds/components/feed-right-sidebar/components/follow-suggestions/follow-suggestions.component';
import { ChangePassComponent } from './features/change-pass/change-pass.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [allreadyLoggedGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [isAllowedAuthGuard],
    children: [
      { path: 'feed', component: FeedsComponent },
      { path: 'post-details/:id', component: PostDetailsComponent },
      { path: 'profile/:id', component: ProfileComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: 'notifications', component: NotificationComponent },
      { path: 'suggestions', component: FollowSuggestionsComponent },
      { path: 'settings', component: ChangePassComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
