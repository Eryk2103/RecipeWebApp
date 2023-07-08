import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeResponse } from '../models/recipeResponse';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly url = environment.api_url + "recipes";


  constructor(private http: HttpClient, private authService: AuthService) {
   }

  getRecipes(search: string, page: number = 1) {
    const params = new HttpParams()
      .set('page', page)
      .set('search', search);
    return this.http.get<RecipeResponse>(this.url);
  }
  getRecipe(id: string){
    return this.http.get<Recipe>(this.url + '/' + id);
  }
  addRecipe(recipe: Recipe){
    return this.http.post<Recipe>(this.url, recipe);
  }
}
