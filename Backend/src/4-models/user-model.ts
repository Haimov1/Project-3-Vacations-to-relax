import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static registerValidationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        email: Joi.string().required().min(10).max(50),
        password: Joi.string().required().min(4).max(30),
        role: Joi.string().optional().min(5)
    });

    public validateRegister(): void {
        const result = UserModel.registerValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default UserModel;