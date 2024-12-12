import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {switchMap, map, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {Store} from "@ngrx/store";

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer'


@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-4c09e-default-rtdb.firebaseio.com/recipes.json'
        );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')), // allows us to merge a value from another observable into this observable stream here
    switchMap(([actionData, recipesState]) => {
      return this.http
        .put(
          'https://ng-course-recipe-book-4c09e-default-rtdb.firebaseio.com/recipes.json',
          recipesState.recipes
        )
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {
  }
}


// use switchMap() here to send our HTTP request to fetch the recipes
