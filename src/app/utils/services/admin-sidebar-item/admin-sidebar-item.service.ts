import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class AdminSidebarItemService {
  constructor(private _router: Router) {}

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      link: '/admin',
    },
    {
      title: 'User Transactions',
      icon: 'fa fa-user',
      linkActive: ['/admin/users', '/admin/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fa fa-address-book',
          link: '/admin/users',
        },
        {
          title: 'User Add',
          icon: 'fa fa-user-plus',
          link: '/admin/user/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
    {
      title: 'Blog Transactions',
      icon: 'fa fa-exchange-alt',
      linkActive: ['/admin/blogs', '/admin/blog/add', '/admin/blog-menus'],
      submenuShowHide: this.getChildUrlActiveState([
        'blogs',
        'blog',
        'blog-menus',
      ]),
      submenu: [
        {
          title: 'Blog List',
          icon: 'fa fa-list',
          link: '/admin/blogs',
        },
        {
          title: 'Add Blog',
          icon: 'fa fa-plus-square',
          link: '/admin/blog/add',
        },
        {
          title: 'Blog Menu List',
          icon: 'fa fa-ellipsis-v',
          link: '/admin/blog-menus',
          authorize: [Roles.Root, Roles.Administrator],
        },
      ],
    },
    {
      title: 'Project Transactions',
      icon: 'fa fa-globe',
      linkActive: ['/admin/project/add', '/admin/projects'],
      submenuShowHide: this.getChildUrlActiveState(['project', 'projects']),
      submenu: [
        {
          title: 'Project List',
          icon: 'fa fa-list',
          link: '/admin/projects',
        },
        {
          title: 'Add Project',
          icon: 'fa fa-plus-square',
          link: '/admin/project/add',
        },
      ],
    },
    {
      title: 'Team Transactions',
      icon: 'fa fa-users',
      linkActive: ['/admin/team-member/add', '/admin/team-members'],
      submenuShowHide: this.getChildUrlActiveState([
        'team-members',
        'team-member',
      ]),
      submenu: [
        {
          title: 'Team Member List',
          icon: 'fa fa-list',
          link: '/admin/team-members',
        },
        {
          title: 'Add Team Member',
          icon: 'fa fa-plus-square',
          link: '/admin/team-member/add',
        },
      ],
    },
    {
      title: 'Slide List',
      icon: 'fa fa-window-restore',
      link: '/admin/slides',
    },
    {
      title: 'Message List',
      icon: 'fa fa-inbox',
      link: '/admin/messages',
      authorize: [Roles.Root, Roles.Administrator],
    },
    ,
    {
      title: 'Site Setting',
      icon: 'fa fa-cogs',
      link: '/admin/footer/edit',
      authorize: [Roles.Root, Roles.Administrator],
    }
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
