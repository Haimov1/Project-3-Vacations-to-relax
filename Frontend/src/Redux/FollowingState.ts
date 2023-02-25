import { createStore } from "redux";
import FollowerModel from "../Models/FollowerModel";

// 1. App state - Application level state.
export class FollowerState {
    public follower: FollowerModel[] = [];
}

// 2. Action Type - list of actions needed on the data.
export enum FollowingActionType {
    AddFollower = "AddFollower",
    DeleteFollowing = "DeleteFollowing"
}

// 3. Action - a single object describing single operation on the data.
export interface FollowingAction {
    type: FollowingActionType;
    payload: any;
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function).
export function followingReducer(currentState = new FollowerState(), action: FollowingAction): FollowerState {

    const newState = { ...currentState };

    switch (action.type) {
        case FollowingActionType.AddFollower:
            const indexToFollow = newState.follower.findIndex(f => f.vacationId === action.payload.vacationId);
            if (indexToFollow >= 0) {
                newState.follower[indexToFollow] = action.payload;
            }
            newState.follower.push(action.payload);
            break;
        case FollowingActionType.DeleteFollowing:
            const indexToDelete = newState.follower.findIndex(follow => follow.userId === action.payload);
            if (indexToDelete >= 0) {
                newState.follower[indexToDelete] = action.payload;
            }
    }
    return newState;
}

// 5. Store - Redux manger:
export const followingStore = createStore(followingReducer);
