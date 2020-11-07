import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import { Roles } from './models';
import {
  HomepageComponent,
  DashboardComponent,
  LoginComponent,
  UserAddComponent,
  UserListComponent,
  SlideListComponent,
  BlogMenuListComponent,
  ProjectAddComponent,
  BlogDetailComponent,
  TeamMembersAddComponent,
  TeamMembersComponent,
  BlogsComponent,
  TeamMemberListComponent,
  ProjectsComponent,
  ProjectListComponent,
  BlogAddComponent,
  ContactComponent,
  BlogListComponent,
  MessageListComponent,
} from './pages';
import { AuthGuard } from './utils/guards';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        data: {
          title: 'Anasayfa',
        },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects',
        },
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        data: {
          title: 'Blogs',
        },
      },
      {
        path: 'team-members',
        component: TeamMembersComponent,
        data: {
          title: 'Team Members',
        },
      },
      {
        path: 'blog-detail/:BlogID',
        component: BlogDetailComponent,
        data: {
          title: 'Blog Detail',
        },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'Cantact',
        },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          icon: 'fa fa-2x fa-file-archive'
        },
      },
      {
        path: 'user/add',
        component: UserAddComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-user-plus',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/edit/:UserID',
        component: UserAddComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-user-tag',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
          icon: 'fa fa-2x fa-adress-book',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/profile',
        component: UserAddComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-user',
        },
      },
      {
        path: 'blog-menus',
        component: BlogMenuListComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-caret-square-down',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'slides',
        component: SlideListComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-sliders-h',
        },
      },
      {
        path: 'project/add',
        component: ProjectAddComponent,
        data: {
          title: 'Project Add',
          icon: 'fa fa-2x fa-globe',
        },
      },
      {
        path: 'project/edit/:ProjectID',
        component: ProjectAddComponent,
        data: {
          title: 'Project Update',
          icon: 'fa fa-2x fa-pen-square',
        },
      },
      {
        path: 'blog/add',
        component: BlogAddComponent,
        data: {
          title: 'Blog Add',
          icon: 'fa fa-2x fa-plus-square',
        },
      },
      {
        path: 'blog/edit/:BlogID',
        component: BlogAddComponent,
        data: {
          title: 'Project Update',
          icon: 'fa fa-2x fa-id-card',
        },
      },
      {
        path: 'blogs',
        component: BlogListComponent,
        data: {
          title: 'Blog List',
          icon: 'fa fa-2x fa-list',
        },
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        data: {
          title: 'Project Add',
          icon: 'fa fa-2x fa-hive',
        },
      },
      {
        path: 'team-members',
        component: TeamMemberListComponent,
        data: {
          title: 'Team Member List',
          icon: 'fa fa-2x fa-list',
        },
      },
      {
        path: 'team-member/add',
        component: TeamMembersAddComponent,
        data: {
          title: 'Team Member Add',
          icon: 'fa fa-2x fa-calendar-plus',
        },
      },
      {
        path: 'team-member/edit/:MemberID',
        component: TeamMembersAddComponent,
        data: {
          title: 'Team Member Update',
          icon: 'fa fa-2x fa-map-pin',
        },
      },
      {
        path: 'messages',
        component: MessageListComponent,
        data: {
          title: 'Message List',
          icon: 'fa fa-2x fa-user',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
