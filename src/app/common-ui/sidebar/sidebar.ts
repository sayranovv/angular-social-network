import {Component, inject, WritableSignal} from '@angular/core';
import {SvgIcon} from '../svg-icon/svg-icon';
import {SubscriberCard} from './subscriber-card/subscriber-card';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIcon,
    SubscriberCard,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chat'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
