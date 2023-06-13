import { Ingredient } from "./ingredient";

export interface Recipe{
    id?: string;
    name: string;
    description: string;
    instructions: string[];
    ingredients: Ingredient[];
}