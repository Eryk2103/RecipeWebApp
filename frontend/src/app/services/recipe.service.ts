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
  private token : string | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user$.pipe(map(user => user?.access_token), tap( token => this.token = token)).subscribe();
   }

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
