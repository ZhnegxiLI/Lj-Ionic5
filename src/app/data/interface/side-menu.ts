export interface SideMenu {
    title?: string;
    children?: SideMenu[];
    url?: string;
    icon?: string;
    params?: any;
    open?: boolean;
}
