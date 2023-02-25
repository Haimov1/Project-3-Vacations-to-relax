import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import { FollowingActionType, followingStore } from "../Redux/FollowingState";
import appConfig from "../Utils/AppConfig";

class FollowingService {
    public async addFollow(vacationId: number): Promise<void> {
        const response = await axios.post<FollowerModel>(appConfig.followingVacationsUrl + vacationId);
        const addedFollow = response.data;
        followingStore.dispatch({ type: FollowingActionType.AddFollower, payload: addedFollow });
    }

    public async deleteFollow(id: number): Promise<void> {
        await axios.delete(appConfig.followingVacationsUrl + id);
        followingStore.dispatch({ type: FollowingActionType.DeleteFollowing, payload: id });
    }
}

const followingService = new FollowingService();

export default followingService;