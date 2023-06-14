import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.css']
})
export class RecipeDetailPageComponent implements OnInit{

  recipe: Recipe | undefined;
  error: boolean = false;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute){}

  ngOnInit(){
    this.loadRecipe();
  }
  loadRecipe(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.recipeService.getRecipe(id).subscribe(res => {
        this.recipe = res;
      },e => {
        if(e.status === 401){
          this.error = true;
        }
      })
    }
  }
  
}
