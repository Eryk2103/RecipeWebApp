import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipes-filters',
  templateUrl: './recipes-filters.component.html',
  styleUrls: ['./recipes-filters.component.css']
})
export class RecipesFiltersComponent {
    filterForm = this.fb.group({
      search: ['']
    })
    @Output()
    onSearch : EventEmitter<string> = new EventEmitter();
    constructor(private fb: FormBuilder){}

    search(){
      const searchValue = this.filterForm.get('search')?.value;
      if(searchValue != null)
      {
        this.onSearch.emit(searchValue);
      }
    }
}
