import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() searchTermValue = new EventEmitter<string>();
  @Input() count:number=0;

  onSearchTermChange(searchTerm: string) {        
    this.searchTermValue.emit(searchTerm);
  }
}
