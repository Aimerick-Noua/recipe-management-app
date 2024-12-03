import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipes } from '../../models/recipe.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() searchTermValue = new EventEmitter<string>();
  @Input() count:Recipes[]=[];

  onSearchTermChange(searchTerm: string) {        
    this.searchTermValue.emit(searchTerm);
  }
}
