import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
        a.active{
            color:#00aaaa;
            text-decoration:underline;
        }
        header{
            position:sticky;
            top:0;
            z-index:100;
        }
        #mobile-menu {
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
}

#mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

        `]

})
export class HeaderComponent {
  @Input() userName: string = "john"
  isAuthenticated: boolean = false;
  isMenuOpen = false;


  constructor(private router: Router, private route: ActivatedRoute) { }
  toggleDarkMode() { }


  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
  }

  onSearch(event: Event) { }

  logout() { }



}