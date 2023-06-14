import { Ingredient } from "./ingredient";

export interface Recipe{
    _id?: string;
    name: string;
    description: string;
    instructions: string[];
    ingredients: Ingredient[];
}