import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { IFetchData, IPostInfoForRealtor } from "../../interfaces/post";
import {
    archivePost,
    getListPostsForRealtor,
} from "../../store/post/post.actions";
import ErrorHandler from "../../components/common/ErrorHandler";
import CustomizedDialogs from "../../components/common/Dialog";
import { TablePaginationActions } from "../../components/realtorDashboard/TablePagination";
import { StyledTableCell, StyledTableRow } from "../../utils/styles";

export default function AllPostList() {
    const [page, setPage] = React.useState(0); // 0-based index for MUI TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IPostInfoForRealtor[]>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [postName, setPostName] = useState<string>();
    const [postId, setPostId] = useState<string>();

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
            const response = await dispatch(getListPostsForRealtor(model));
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
    }, [page, rowsPerPage, isDialogOpen]);

    return (
        <>
            {isDialogOpen && postName && postId && (
                <CustomizedDialogs
                    message={`You want to archive post ${postName}. Are you sure?`}
                    isOpen={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    action={async () => {
                        await dispatch(archivePost(postId!));
                    }}
                    navigate={"/dashboard/archive"}
                    lable="Archived action"
                    menuItem="Archive"
                />
            )}

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
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Adress</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Discount</StyledTableCell>
                            <StyledTableCell>Is Active</StyledTableCell>
                            <StyledTableCell>Is Archived</StyledTableCell>
                            <StyledTableCell>Edit </StyledTableCell>
                            <StyledTableCell> Archive</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows?.map((row) => {
                            return (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        {row.category}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.adress}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.category === "Hotel"
                                            ? "-"
                                            : "$" + row.price}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.discount
                                            ? row.discount + "%"
                                            : "-"}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.isActive ? "Yes" : "No"}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {row.isArhive ? "Yes" : "No"}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Button
                                            onClick={() => {
                                                navigate(
                                                    `/dashboard/edit-post/${row.id}`
                                                );
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Button
                                            onClick={() => {
                                                setPostName(row.name);
                                                setPostId(row.id);
                                                setIsDialogOpen(true);
                                            }}
                                            disabled={row.isArhive}
                                        >
                                            Archive
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
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
