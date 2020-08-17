export interface User {
   Group: string,
   Name: string,
   Password: string,
   Status: string;
}

export interface Modal {
   title: string,
   component: any,
   canClose: boolean
}
export interface Menu {
   title: string,
   icon: string,
   link: string,
   isFavorite: boolean
}