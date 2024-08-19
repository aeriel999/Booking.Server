export interface IDashboardState {
    currentBreadcrumbsItem: string;
    currentPaginationPage: number;
    loaderIsLoading: boolean;
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