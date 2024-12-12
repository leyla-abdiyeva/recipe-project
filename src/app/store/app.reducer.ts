import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import {ActionReducerMap} from "@ngrx/store";

import * as fromRecipes from '../recipes/store/recipe.reducer'


export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

// @ts-ignore
export const appReducer: ActionReducerMap<AppState> = {
// @ts-ignore
  shoppingList: fromShoppingList.shoppingListReducer,
  // @ts-ignore
  auth: fromAuth.authReducer,
  // @ts-ignore
  recipes: fromRecipes.recipeReducer
}
