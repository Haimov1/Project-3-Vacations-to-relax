import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationsService {
    public async getAllVacation(): Promise<VacationModel[]> {

        // Take vacations form global state:
        let vacations = vacationsStore.getState().vacations;
        
        // If we don't have vacations:
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        // Take vacations form global state:
        let vacations = vacationsStore.getState().vacations;

        // Find needed vacation from global state:
        let vacation = vacations.find(vacation => vacation.vacationId === vacationId);

        // If vacation not found:
        if (!vacation) {
            // Get vacation from server:
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            vacation = response.data;
        }

        // Return vacation:
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startVacation", vacation.startVacation);
        formData.append("endVacation", vacation.endVacation);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image.item(0));
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData);
        const addedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startVacation", vacation.startVacation);
        formData.append("endVacation", vacation.endVacation);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image.item(0));
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, formData);
        const updatedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacations, payload: updatedVacation });
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id);
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacations, payload: id });
    }
}

const vacationsService = new VacationsService();

export default vacationsService;
