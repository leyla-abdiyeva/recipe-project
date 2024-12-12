import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';// START_EDIT is action and after = is identifier, and actions itself is not just these identifier, but it is a complete object based on classes we defined
export const STOP_EDIT = '[Shopping List] Stop Edit';// equal to value, these are string types, all actions
// each action needs to have type property to store string identifier for the action, we might also have payload so a property which can be set to attach data to that action
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  // @ts-ignore

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }// inside constructor is data
}// these are classes, and we need them as actions or for action objects

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {// number of ingredient we want to add

  }// need payload as we need to know which ingredient we need editing
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;// these are actions
