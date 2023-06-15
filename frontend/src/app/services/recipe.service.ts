import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeResponse } from '../models/recipeResponse';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly url = "http://15.236.90.107:3000/recipes";
  private readonly token = this.authService.getToken();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes(search: string, page: number = 1) {
    const params = new HttpParams()
      .set('page', page)
      .set('search', search);
    return this.http.get<RecipeResponse>(this.url, {params, headers: { Authorization: 'Bearer '+ this.token}});
  }
  getRecipe(id: string){
    return this.http.get<Recipe>(this.url + '/' + id, {headers: { Authorization: 'Bearer '+ this.token}});
  }
  addRecipe(recipe: Recipe){
    return this.http.post<Recipe>(this.url, recipe, {headers: { Authorization: 'Bearer '+ this.token}});
  }
}
