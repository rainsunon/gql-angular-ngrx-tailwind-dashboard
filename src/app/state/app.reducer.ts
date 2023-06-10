import {createReducer, on} from '@ngrx/store';
import {
  appInit,
  closeProfileMenu, logout,
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
  } catch (Error) {
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
  refreshToken?: string;
}

export const appState: AppState = {
  sideBarClosed: false,
  darkMode: false,
  profileMenuOpen: false,
  isLoggedIn: false,
  token: undefined,
  user: undefined,
  loginFormOpen: false,
  refreshToken: undefined,
};

export const appReducer = createReducer(
  appState,
  on(appInit, (state) => {
    const darkMode = JSON.parse(localStorage.getItem('dark') ?? 'true');
    const jwt: string = localStorage.getItem('jwt') as string;
    const isLoggedIn = JSON.parse(jwt ? 'true' : 'false');
    const rt = localStorage.getItem('refreshToken') as string;
    const sideBarClosed = JSON.parse(localStorage.getItem('sideBarClosed') ?? 'false');
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    const user = getDecodedAccessToken(jwt);
    return {
      ...state,
      darkMode: darkMode,
      token: jwt,
      isLoggedIn: isLoggedIn,
      loginFormOpen: !isLoggedIn,
      sideBarClosed: sideBarClosed ?? false,
      user,
      refreshToken: rt
    };
  }),

  on(logout, (state) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    return {
      ...state,
      isLoggedIn: false,
      user: undefined,
      loginFormOpen: true,
      refreshToken: undefined,
      token: undefined
    }
  }),
  on(postLogin, (state, action) => {
    const user = getDecodedAccessToken(action.token);
    localStorage.setItem('jwt', action.token);
    localStorage.setItem('refreshToken', action.refreshToken ?? (user?.refreshToken ?? ''));

    if(action.reload) {
      window.location.reload();
    }
    return {
      ...state,
      token: action.token,
      isLoggedIn: true,
      loginFormOpen: false,
      user,
      refreshToken: action.refreshToken
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
    localStorage.setItem('sideBarClosed', JSON.stringify(!state.sideBarClosed));
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
