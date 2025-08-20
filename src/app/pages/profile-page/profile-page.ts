import {Component, inject} from '@angular/core';
import {ProfileHeader} from '../../common-ui/profile-header/profile-header';
import {ProfileService} from '../../data/services/profile';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {SvgIcon} from '../../common-ui/svg-icon/svg-icon';
import {SubscriberCard} from '../../common-ui/sidebar/subscriber-card/subscriber-card';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';
import {PostFeed} from './post-feed/post-feed';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeader,
    AsyncPipe,
    RouterLink,
    SvgIcon,
    SubscriberCard,
    ImgUrlPipe,
    PostFeed
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  subscribers$ = this.profileService.getSubscribersShortList(5)

  me$ = toObservable(this.profileService.me)

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$

      return this.profileService.getAccount(id)
    })
  )
}
