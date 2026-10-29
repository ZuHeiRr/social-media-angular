import { IUser } from './../../../../../../../core/models/iposts.interface';
import { Component, inject, OnInit, output, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../../../core/services/posts/posts.service';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  loggedUserData: WritableSignal<IUser> = signal({} as IUser);
  imgToDisplay: WritableSignal<string | ArrayBuffer | null | undefined> = signal(null);

  selectedImg!: File;
  bodyInput = new FormControl(' ');
  privacyInput = new FormControl('public');
  postCreated = output<void>();

  ngOnInit(): void {
    this.saveUserData();
  }

  saveUserData() {
    this.loggedUserData.set(JSON.parse(localStorage.getItem('user')!));
  }

  selecteImg(e: Event): void {
    if (e.target) {
      let target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        this.selectedImg = target.files[0];

        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.selectedImg);
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          this.imgToDisplay.set(e.target?.result);
        };
      }
    }
  }

  submitCreate(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();

    let formData = new FormData();
    if (this.selectedImg) {
      formData.append('image', this.selectedImg);
    }
    if (this.bodyInput.value) {
      formData.append('body', this.bodyInput.value);
    }
    if (this.privacyInput.value) {
      formData.append('privacy', this.privacyInput.value);
    }
    form.reset();
    this.imgToDisplay.set(null);

    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.postCreated.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
