import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startVacation: string;
    public endVacation: string;
    public price: number;
    public image: UploadedFile;
    public imageName: string;
    public followersCount: number;
    public isFollowing: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startVacation = vacation.startVacation;
        this.endVacation = vacation.endVacation;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.followersCount = vacation.followersCount;
        this.isFollowing = vacation.isFollowing;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(30),
        description: Joi.string().required().min(10).max(450),
        startVacation: Joi.date().required(),
        endVacation: Joi.date().required(),
        price: Joi.number().required().min(20).max(10000),
        image: Joi.object().optional(),
        imageName: Joi.string(),
        followersCount: Joi.optional(),
        isFollowing: Joi.optional()
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(30),
        description: Joi.string().required().min(10).max(450),
        startVacation: Joi.date().required(),
        endVacation: Joi.date().required(),
        price: Joi.number().required().min(20).max(10000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional().min(38).max(50),
        followersCount: Joi.optional(),
        isFollowing: Joi.optional()
    });

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;