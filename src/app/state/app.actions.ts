import {createAction, props} from '@ngrx/store';

export const toggleSidebar = createAction('[APP] Toggle Sidebar')
export const login = createAction('[APP] Login', props<{ userName: string, password: string; }>());
export const postLogin = createAction('[APP] Post Login', props<{ token: string; refreshToken?: string; }>());
export const appInit = createAction('[APP] Init')
export const toggleDarkMode = createAction('[APP] Toggle DarkMode')
export const toggleProfileMenu = createAction('[APP] Toggle ProfileMenu')
export const closeProfileMenu = createAction('[APP] Close ProfileMenu')


export const toggleLoginForm = createAction('[APP] Toggle Login Form')
