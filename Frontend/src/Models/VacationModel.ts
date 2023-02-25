import { RegisterOptions } from "react-hook-form";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startVacation: string;
    public endVacation: string;
    public price: number;
    public image: FileList;
    public imageName: string;
    public followersCount: number;
    public isFollowing: number;

    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "Destination must be minimum 2 chars" },
        maxLength: { value: 30, message: "Destination can't exceeds 30 chars" }
    };
    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 10, message: "Description must be minimum 10 chars" },
        maxLength: { value: 450, message: "Destination can't exceeds 450 chars" }
    };

    public static startVacationValidation: RegisterOptions = {
        required: { value: true, message: "Missing date" }
    };

    public static endVacationValidation: RegisterOptions = {
        required: { value: true, message: "Missing date" }
    };

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 20, message: "Price can't be negative or less than 20" },
        max: { value: 10000, message: "Price can't exceeds 10000" }
    };

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" },
    };
}

export default VacationModel;