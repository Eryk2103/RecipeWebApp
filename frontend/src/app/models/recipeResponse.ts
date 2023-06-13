import { Recipe } from "./recipe";

export interface RecipeResponse{
    totalPages: number;
    currentPage: number;
    data: Recipe[];
}