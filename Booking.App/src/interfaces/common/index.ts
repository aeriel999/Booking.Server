import { IListForCombobox } from "../post";

export interface IDashboardState {
    currentBreadcrumbsItem: string;
    currentPaginationPage: number;
    loaderIsLoading: boolean;
    savedPath: string;
}

export interface CustomizedDialogsProps {
    isOpen: boolean;
    message: string;
    setOpen: (arg: boolean) => void;
    navigate: string;
    action?: () => Promise<void>;
    lable: string;
    menuItem?: string;
}

export interface IDashboardMenuItem {
    name: string;
    isActive: boolean;
    image: string;
    activeImage: string;
    link: string;
}

export interface ComboBoxProps {
    options: IListForCombobox[];
    onChange: (newValue: IListForCombobox | null) => void;
    label: string;
    defaultValue?: string;
    isValid?: (isValid: boolean) => void;
}