import { RegisterOptions } from "react-hook-form";
import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    // Validation:
    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing First name" },
        minLength: { value: 2, message: "Name must be minimum 2 chars" },
        maxLength: { value: 25, message: "Name can't exceeds 25 chars" }
    };

    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing Last name" },
        minLength: { value: 2, message: "Name must be minimum 2 chars" },
        maxLength: { value: 25, message: "Name can't exceeds 25 chars" }
    };

    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing Email" },
        minLength: { value: 10, message: "Name must be minimum 10 chars" },
        maxLength: { value: 50, message: "Name can't exceeds 50 chars" },
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Please insert/enter a valid email address.." }
    };

    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing Password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 30, message: "Password can't exceeds 30 chars" }
    }
}

export default UserModel;
