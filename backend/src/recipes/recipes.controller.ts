import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipe.model";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('recipes')
export class RecipesController {

    constructor(private recipesService: RecipesService){}
    @UseGuards(AuthGuard)
    @Get()
    async getRecipes(@Query('page') pageParam, @Query('search') searchParam, @Req() req){
        const limit = 2;
        const page = Number(pageParam);
        const res = await this.recipesService.getRecipes(page, limit, searchParam, req.user.username);
        const totalPages = await this.recipesService.getTotalPages(limit, searchParam, req.user.username);
        return {totalPages, currentPage: page, data: res};
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getRecipe(@Param('id') id: string){
        const res = await this.recipesService.getRecipe(id);
        return res;
    }
    @UseGuards(AuthGuard)
    @Post()
    async addRecipe(@Body() body: Recipe, @Req() req){
        const res = await this.recipesService.addRecipe(body, req.user.username);
        return res;
    }

}