import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App state - Application level state.
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data.
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacations = "UpdateVacations",
    DeleteVacations = "DeleteVacations"
}

// 3. Action - a single object describing single operation on the data.
export interface VacationsAction {
    type: VacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function).
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.FetchVacations: // Here the payload is vacation list fetch by the server.
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here the payload is the added vacation.
            if (newState.vacations.length > 0) {
                newState.vacations.push(action.payload);
            }
            break;

        case VacationsActionType.UpdateVacations: // Here the payload is the updated vacation.
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.vacationId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacations: // Here the payload is id to delete.
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
    }
    return newState;
}

// 5. Store - Redux manger:
export const vacationsStore = createStore(vacationsReducer);
