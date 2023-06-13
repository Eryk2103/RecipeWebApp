import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
  recipes: Recipe[] = [];
  page: number = 1;
  lastPage: number = 1;
  @Input()
  searchStr : string = '';

  constructor(private recipeService: RecipeService){}

  ngOnInit(){
    this.loadData(this.searchStr);
  }
  ngOnChanges(){
    this.loadData(this.searchStr);
  }
  loadData(search: string, page: number = 1){
    
    this.recipeService.getRecipes(search, page).subscribe( res => {
      this.recipes = res.data;
      this.page = res.currentPage;
      this.lastPage = res.totalPages;
      console.log(res)
    });
  }
  onPageChange(e: number){
    this.loadData(this.searchStr, e)
  }
}
