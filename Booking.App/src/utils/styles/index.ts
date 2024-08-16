import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { TableCell, tableCellClasses, TableRow } from "@mui/material";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#23A1A0",
        color: theme.palette.common.white,
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
        whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));