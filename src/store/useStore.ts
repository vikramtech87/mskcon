import { User } from "firebase/auth";
import { create } from "zustand";

export type AuthState = {
  authUser: User;
};

type AuthStore = {
  isLoaded: boolean;
  authState?: AuthState;
};

type Store = {
  authStore: AuthStore;
  isAuthLoaded: () => boolean;
  isAuthenticated: () => boolean;
  setAuth: (state?: AuthState) => void;
};

export const useStore = create<Store>()((set, get) => ({
  authStore: {
    isLoaded: false,
    authState: undefined,
  },
  isAuthLoaded: () => get().authStore.isLoaded,
  isAuthenticated: () => get().authStore.authState !== undefined,
  setAuth: (state?: AuthState) => {
    set(() => ({
      authStore: {
        isLoaded: true,
        authState: state,
      },
    }));
  },
}));
