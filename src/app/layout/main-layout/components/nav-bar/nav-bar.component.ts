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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/auth/services/auth/auth.service';
import { IUser } from '../../../../core/models/iposts.interface';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  isMenuOpen = signal(false);
  loggedInUser: WritableSignal<IUser> = signal(JSON.parse(localStorage.getItem('user') || '{}'));
  ngOnInit(): void {
    initFlowbite();
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    console.log(this.isMenuOpen());
  }

  @ViewChild('menu') menu!: ElementRef;

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    if (this.isMenuOpen && this.menu && !this.menu.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
