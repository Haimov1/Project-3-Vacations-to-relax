import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacations(user: UserModel): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacationDetails AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startVacation`;

    const vacations = await dal.execute(sql, user.userId);
    return vacations;
}
// Get one vacation:
async function getOneVacation(vacationId: number): Promise<VacationModel[]> {

    // Create query:
    const sql = "SELECT * FROM vacationDetails WHERE vacationId = ?";

    // Execute query:
    const vacations = await dal.execute(sql, vacationId);

    // Extract he single vacation:
    const vacation = vacations[0];

    // If vacation not found:
    if (!vacation) throw new ResourceNotFoundError(vacationId);

    // Return data:
    return vacation;
}

async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sql, userId, vacationId);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validation:
    vacation.validatePost();
    vacation.imageName = await imageHandler.saveImage(vacation.image);
    const sql = "INSERT INTO vacationDetails VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startVacation, vacation.endVacation, vacation.price, vacation.imageName);
    vacation.vacationId = result.insertId;
    // delete vacation.image;
    return vacation;
}

// Update existing vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validate:
    vacation.validatePut();

    // Get image name form database:
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);

    // Update existing image:
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }
    // Create sql query:
    const sql = `UPDATE vacationDetails SET
    destination = ?,
    description = ?,
    startVacation = ?,
    endVacation = ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?`;

    // Execute query:
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startVacation, vacation.endVacation, vacation.price, vacation.imageName, vacation.vacationId);

    // If vacation not exist:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image file from vacation object:
    delete vacation.image;

    // Return updated vacation:
    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {

    // Get image name form database:
    const imageName = await getImageNameFromDB(vacationId);

    // Delete that image:
    imageHandler.deleteImage(imageName);

    const sql = "DELETE FROM vacationDetails WHERE vacationId = ?";

    const result: OkPacket = await dal.execute(sql, vacationId);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

async function getImageNameFromDB(vacationId: number): Promise<string> {

    // Create sql query:
    const sql = `SELECT imageName FROM vacationDetails WHERE vacationId = ?`;

    // Get object array:
    const vacations = await dal.execute(sql, vacationId);

    // Extract single vacation:
    const vacation = vacations[0];


    // If no such vacation:
    if (!vacation) return null;

    // Return image name:
    return vacation.imageName;
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    follow,
    unfollow,
    deleteVacation
};
