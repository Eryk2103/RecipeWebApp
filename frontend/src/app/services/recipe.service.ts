import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeResponse } from '../models/recipeResponse';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly url = "http://localhost:3000/recipes";
  constructor(private http: HttpClient) { }

  getRecipes(search: string, page: number = 1) {
    const params = new HttpParams()
      .set('page', page)
      .set('search', search);
    return this.http.get<RecipeResponse>(this.url, {params});
  }
  addRecipe(recipe: Recipe){
    return this.http.post<Recipe>(this.url, recipe);
  }
}
