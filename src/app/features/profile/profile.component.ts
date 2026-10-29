import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { IPosts, IUseProfile, IUser } from '../../core/models/iposts.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  userInfo: WritableSignal<IUseProfile> = signal({} as IUseProfile);
  userPosts: WritableSignal<IPosts[]> = signal([]);
  private readonly route = inject(ActivatedRoute);

  activeTap: WritableSignal<string> = signal('myPosts');
  bookmarksPosts: WritableSignal<IPosts[]> = signal([]);

  selectedProfileFile!: File;
  profilIimgToDisplay: WritableSignal<string | ArrayBuffer | null | undefined> = signal(null);
  isPopUpOpen = signal<boolean>(false);
  @ViewChild('ProfilePopUp') ProfilePopUp!: ElementRef;

  router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');

      if (userId) {
        this.getUserProfile(userId);
      } else {
        this.getMyProfile();
      }
    });
  }
  getMyProfile() {
    this.profileService.getMyProfile().subscribe({
      next: (res: any) => {
        this.userInfo.set(res.data.user);
        this.getUserPosts();
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
  getUserPosts() {
    this.profileService.getUserPosts(this.userInfo()._id).subscribe({
      next: (res: any) => {
        this.userPosts.set(res.data.posts);
        console.log(this.userPosts());
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
  getUserProfile(userId: string) {
    this.profileService.getUserProfile(userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userInfo.set(res.data.user);
        this.getUserPosts();
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
  getSavedPosts() {
    this.activeTap.set('saved');
    this.profileService.getSavedPosts().subscribe({
      next: (res: any) => {
        this.bookmarksPosts.set(res.data.bookmarks);
        console.log('bookmarks', this.bookmarksPosts());
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
  selecteProfileFile(e: Event): void {
    if (e.target) {
      let target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        this.selectedProfileFile = target.files[0];

        this.isPopUpOpen.set(true);

        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.selectedProfileFile);
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          this.profilIimgToDisplay.set(e.target?.result);
        };
      }
    }
  }
  changeProfileImg() {
    let formData = new FormData();
    if (this.selectedProfileFile) {
      formData.append('photo', this.selectedProfileFile);
    }
    this.profileService.changeProfilePhoto(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        user.photo = res.data.photo;

        localStorage.setItem('user', JSON.stringify(user));
        this.getMyProfile();

        this.isPopUpOpen.set(false);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  @HostListener('document:click', ['$event'])
  closeProfilePopUp(event: MouseEvent) {
    if (
      this.isPopUpOpen() &&
      this.ProfilePopUp &&
      !this.ProfilePopUp.nativeElement.contains(event.target)
    ) {
      this.isPopUpOpen.set(false);
    }
  }
}
