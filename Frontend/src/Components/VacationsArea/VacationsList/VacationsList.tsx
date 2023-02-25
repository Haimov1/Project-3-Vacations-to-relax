import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationsState";
import vacationsService from "../../../Services/VacationsService";
import Menu from "../../LayoutArea/Menu/Menu";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    // Saving the vacations.
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Saves the vacations that filter.
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);

    // Saves the length of the array to display.
    const [displayLength, setDisplayLength] = useState(Boolean);

    // Saves the vacations the user is follow.
    const [followChecked, setFollowChecked] = useState<boolean>(false);

    // Saves the vacations that haven't started yet.
    const [hasNotStartedYetChecked, setHasNotStartedYetChecked] = useState<boolean>(false);

    // Saves the vacations that are happening now.
    const [happeningNowChecked, setHappeningNowChecked] = useState<boolean>(false);
    const [disabledFutureCheckbox, setDisabledFutureCheckbox] = useState<boolean>(null);
    const [disabledHappeningNowCheckbox, setDisabledHappeningNowCheckbox] = useState<boolean>(null);

    // Boolean variable when there are no vacation to show.
    const [missingVacations, setMissingVacations] = useState<boolean>(null);
    const [role, setRole] = useState<string>("");
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10;

    // Index per page.
    const offset = currentPage * perPage;
    // New array page.
    let currentPageVacation = filteredVacations.slice(offset, offset + perPage)
        .map(vacation => <VacationCard key={vacation.vacationId} vacation={vacation} deleteVacation={deleteClickedVacation} />);
    // Calculate count page.
    const pageCount = Math.ceil(vacations.length / perPage);

    const handlePageClick = ({ selected: selected }: { selected: number }) => {
        setCurrentPage(selected);
        localStorage.setItem("selectedPage", JSON.stringify(selected));
    }

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        vacationsService.getAllVacation()
            .then(dbVacations => {
                setVacations(dbVacations)
                setFilteredVacations(dbVacations)
                if (dbVacations.length > 10) {
                    setDisplayLength(true);
                }
            }
            )
            .catch(err => {
                alert("to watch vacations, you must first log in or register");
                navigate("/login");
            });

    }, []);

    // Listens for filter changes.
    useEffect(() => {
        filterAndDisplayTheVacations();
        setCurrentPage(0);
    }, [followChecked, hasNotStartedYetChecked, happeningNowChecked])


    async function deleteClickedVacation(vacationId: number) {
        try {
            await vacationsService.deleteVacation(vacationId);
            // Refresh list:
            const duplicatedVacation = [...vacations]
            const index = duplicatedVacation.findIndex(vacation => vacation.vacationId === vacationId);
            duplicatedVacation.splice(index, 1);
            setVacations(duplicatedVacation);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    function filterAndDisplayTheVacations() {
        let vacationToShow = vacationsStore.getState().vacations;
        const date = new Date().toISOString().substring(0, 10);

        // If the filter user follows vacations is on it will display the follow vacation.
        if (followChecked) {
            vacationToShow = vacationToShow.filter(v => v.isFollowing);
        }
        // If the filter vacations not started yet is on it will display the vacations not started.
        if (hasNotStartedYetChecked) {
            vacationToShow = vacationToShow.filter(v => v.startVacation > date);
            setDisabledHappeningNowCheckbox(true);
        }
        // Changes the box to be able to choose a different filter.
        else {
            setDisabledHappeningNowCheckbox(false);
        }

        // If the filter vacations happening now is on it will display the vacations happening now.
        if (happeningNowChecked) {
            vacationToShow = vacationToShow.filter(v => v.startVacation < date && date < v.endVacation);
            setDisabledFutureCheckbox(true);
        }
        // Changes the box to be able to choose a different filter.
        else {
            setDisabledFutureCheckbox(false);
        }
        setFilteredVacations(vacationToShow)

        // Checks whether the length of the vacations for display or also the length of the filtered vacations is small equal to 10.
        if ((vacationToShow?.length || filteredVacations.length) <= 10) {
            setDisplayLength(false);
        }
        // returns back.
        else {
            setDisplayLength(true);
        }

        // Checks whether the length of the vacations for the show is equal to 0 and also the length of the vacations is different from 0.              
        if (vacationToShow.length === 0 && vacations.length !== 0) {
            setMissingVacations(true);
        }
        else {
            setMissingVacations(false);            
            // Divides the vacations by pages.
            currentPageVacation = (vacationToShow || filteredVacations).slice(offset, offset + perPage)
                .map(vacation => <VacationCard key={vacation.vacationId} vacation={vacation} deleteVacation={deleteClickedVacation} />);
        }
    };

    return (
        <>
            <div>
                <Menu />
            </div>

            {role === "User" &&
                <>
                    <span className="Checkbox">
                        <input type="checkbox" onChange={(e) => {
                            setFollowChecked(e.target.checked);
                        }} />
                        <label>Following</label>
                    </span>
                    <span className="Checkbox">
                        <input type="checkbox" disabled={disabledFutureCheckbox} onChange={(e) => {
                            setHasNotStartedYetChecked(e.target.checked);
                        }} />
                        <label>Future</label>
                    </span>
                    <span className="Checkbox">
                        <input type="checkbox" disabled={disabledHappeningNowCheckbox} onChange={(e) => {
                            setHappeningNowChecked(e.target.checked);
                        }} />
                        <label>Happening now</label>
                    </span>
                </>}

            {currentPageVacation}

            {missingVacations === true &&
                <div className="MissingVacationErr">
                    No suitable vacations found for your requests...
                </div>
            }

            {((hasNotStartedYetChecked || followChecked || happeningNowChecked) && filteredVacations?.length > 10) &&
                displayLength && <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="Pagination"
                    pageLinkClassName="Page-num"
                    previousLinkClassName="Page-num"
                    nextLinkClassName="Page-num"
                    activeLinkClassName="Active"
                    initialPage={0}
                />
            }

            {(!(hasNotStartedYetChecked || followChecked || happeningNowChecked) && filteredVacations?.length > 10) &&
                displayLength && <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="Pagination"
                    pageLinkClassName="Page-num"
                    previousLinkClassName="Page-num"
                    nextLinkClassName="Page-num"
                    activeLinkClassName="Active"
                    initialPage={JSON.parse(localStorage.getItem("selectedPage"))}
                />
            }
        </>
    );
}

export default VacationsList;


















