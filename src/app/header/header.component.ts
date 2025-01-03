import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

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
  @Output() useLang = new EventEmitter<string>


  constructor( private router: Router, private route: ActivatedRoute) { }
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

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast EventTarget to HTMLSelectElement
    const selectedLanguage = target?.value; 
    this.useLang.emit(selectedLanguage);
  }
  languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' }
  ];
  selectedLanguage = 'fr';
}