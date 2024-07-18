import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Breadcrumbs, Button, Divider, Typography } from "@mui/material";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { IFetchData, IPostInfoForRealtor } from "../../interfaces/post";
import {
    archivePost,
    getListPostsForRealtor,
} from "../../store/post/post.actions";
import ErrorHandler from "../../components/common/ErrorHandler";
import CustomizedDialogs from "../../components/common/Dialog";
import { TablePaginationActions } from "../../components/common/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

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
        event: React.MouseEvent<HTMLButtonElement> | null,
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
            console.log("history", history?.payload);
            setRows(history?.payload.items.$values);
            setTotalCount(history?.payload.totalCount);
        });
    }, [page, rowsPerPage, isDialogOpen]);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = date.toISOString().split("T")[0];
        return `${formattedTime} / ${formattedDate}`;
    };

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
                />
            )}

            <Breadcrumbs
                aria-label="breadcrumb"
                style={{ marginBottom: "20px" }}
            >
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Dashboard
                    </Typography>
                </Link>
                <Typography variant="h6" color="text.primary">
                    All Posts
                </Typography>
            </Breadcrumbs>
            <Divider />
            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

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

                            <StyledTableCell>Date of post</StyledTableCell>


                            <StyledTableCell>Is Booking</StyledTableCell>

                            <StyledTableCell >
                                Is Active
                            </StyledTableCell>
                            <StyledTableCell>
                                Is Archived
                            </StyledTableCell>
                            <StyledTableCell>More info</StyledTableCell>

                            <StyledTableCell align="center">
                                Edit
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Archive
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows?.map((row) => {
                            return (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.category}
                                    </StyledTableCell>
                                    
                                    <StyledTableCell align="right">
                                        {row.adress}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {"$" + row.price}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {formatTimestamp(row.dateOfPost)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.dateOfEdit === null
                                            ? "-"
                                            : formatTimestamp(row.dateOfEdit)}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.isActive ? "Yes" : "No"}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.isArhive ? "Yes" : "No"}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
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
                                    <StyledTableCell align="right">
                                        <Button
                                            onClick={() => {
                                                setPostName(row.name);
                                                setPostId(row.id);
                                                setIsDialogOpen(true);
                                            }}
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
                                rowsPerPageOptions={[
                                    5, 10, 25,
                                    // { label: "All", value: -1 },
                                ]}
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
