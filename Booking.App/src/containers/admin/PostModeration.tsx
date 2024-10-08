import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";
import { StyledTableCell, StyledTableRow } from "../../utils/styles";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { IFetchData, IModaratePost } from "../../interfaces/post";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { activatePost, getListOfPostsForModeration } from "../../store/post/post.actions";

export default function PostModeration() {
    const [page, setPage] = React.useState(0); // 0-based index for MUI TablePagination
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalCount, setTotalCount] = useState<number>(0);
    //const [numberOfPostsForModeration, setNumberOfPostsForModeration] = useState<number>(0);
    const [rows, setRows] = useState<IModaratePost[]>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

 

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    const getDataForPage = async (model: IFetchData) => {
        try {
            const response = await dispatch(getListOfPostsForModeration(model));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
         }
    };

    useEffect(() => {
        const model: IFetchData = {
            page: page + 1, // Convert to 1-based index for backend
            sizeOfPage: rowsPerPage,
        };

        getDataForPage(model).then((history) => {
            setRows(history?.payload.items.$values);
            setTotalCount(history?.payload.totalCount);
        });
    }, [page, rowsPerPage]);

    return (
        <>
            {errorMessage && (
                <OutlinedErrorAlert message={errorMessage} textColor="#000" />
            )}

            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Realtor</StyledTableCell>

                            <StyledTableCell>Post Category</StyledTableCell>

                            <StyledTableCell>Show Post</StyledTableCell>

                            <StyledTableCell>Post Date</StyledTableCell>
                            <StyledTableCell>Activate</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            
                                <StyledTableRow key={row.postId}>
                                    <StyledTableCell>
                                    <Button
                                            onClick={() => {
                                                navigate(
                                                    `/post/${row.postId}/realtor/${row.realtorId}`
                                                );
                                            }}
                                        >
                                             {row.realtorName}
                                        </Button>
                                       
                                    </StyledTableCell>

                                    <StyledTableCell>
                                    <Button
                                            onClick={() => {
                                                navigate(
                                                    `/post/${row.postId}`
                                                );
                                            }}
                                        >
                                             {row.postName}
                                        </Button>
                                       
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.postCategoryName}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.postedDate}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Button
                                            onClick={async () => {
                                                try {
                                                    await dispatch(activatePost(row.postId));
                                                    // Remove the activated post from the rows state
                                                    setRows((prevRows) => 
                                                        prevRows?.filter((post) => post.postId !== row.postId)
                                                    );
                                                } catch (error) {
                                                    setErrorMessage(ErrorHandler(error));
                                                }
                                            }}
                                        >
                                            Activate
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={6}
                                count={totalCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            "aria-label": "rows per page",
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
