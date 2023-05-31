import {createReducer, on} from '@ngrx/store';
import {
  appInit,
  closeProfileMenu,
  postLogin,
  toggleDarkMode,
  toggleLoginForm,
  toggleProfileMenu,
  toggleSidebar
} from './app.actions';
import {UserGqlModel} from '../../sdk/gql';
import jwt_decode from 'jwt-decode';

function getDecodedAccessToken(token: string): UserGqlModel | undefined {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return undefined;
  }
}
interface AppState {
  sideBarClosed: boolean;
  darkMode: boolean;
  profileMenuOpen: boolean,
  isLoggedIn: boolean;
  token?: string;
  user?: UserGqlModel;
  loginFormOpen?: boolean;
}
export const appState: AppState = {
  sideBarClosed: false,
  darkMode: false,
  profileMenuOpen: false,
  isLoggedIn: false,
  token: undefined,
  user: undefined,
  loginFormOpen: false,
};

export const appReducer = createReducer(
  appState,
  on(appInit, (state) => {
    const darkMode = JSON.parse(localStorage.getItem('dark') ?? 'true');
    const jwt: string = localStorage.getItem('jwt') as string;
    const isLoggedIn = JSON.parse(jwt ?  'true' : 'false');
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    return {
      ...state,
      darkMode: darkMode,
      token: jwt,
      isLoggedIn: isLoggedIn,
      loginFormOpen: !isLoggedIn,
      user: getDecodedAccessToken(jwt)
    };
  }),
  on(postLogin, (state, action) =>  {
    console.log(action);
    localStorage.setItem('jwt', action.token);
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
      loginFormOpen: false,
      user: getDecodedAccessToken(action.token)
    }
  }),
  on(toggleDarkMode, (state) => {
    localStorage.setItem('dark', JSON.stringify(!state.darkMode));
    if (!state.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    return {
      ...state,
      darkMode: !state.darkMode
    }
  }),
  on(toggleSidebar, (state) => {
    return {
      ...state,
      sideBarClosed: !state.sideBarClosed
    };
  }),
  on(toggleLoginForm, (state) => {
    return {
      ...state,
      loginFormOpen: !state.loginFormOpen
    };
  }),
  on(toggleProfileMenu, (state) => {
    return {
      ...state,
      profileMenuOpen: !state.profileMenuOpen
    };
  }),
  on(closeProfileMenu, (state) => {
    return {
      ...state,
      profileMenuOpen: false
    };
  }),
);