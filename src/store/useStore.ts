import { ProfileFormData } from "@/schemas/profile";
import { User } from "firebase/auth";
import { create } from "zustand";

export type AuthState = {
  authUser: User;
};

type AuthStore = {
  isLoaded: boolean;
  authState?: AuthState;
};

type ProfileStore = {
  isLoaded: boolean;
  profileState?: ProfileFormData;
};

type Store = {
  authStore: AuthStore;
  isAuthLoaded: () => boolean;
  isAuthenticated: () => boolean;
  setAuth: (state?: AuthState) => void;

  profileStore: ProfileStore;
  isProfileLoaded: () => boolean;
  setProfileLoading: () => void;
  setProfile: (state?: ProfileFormData) => void;
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

  profileStore: {
    isLoaded: false,
    profileState: undefined,
  },
  isProfileLoaded: () => get().profileStore.isLoaded,
  setProfileLoading: () =>
    set((state) => ({
      profileStore: {
        isLoaded: false,
        profileState: undefined,
      },
    })),
  setProfile: (state?: ProfileFormData) =>
    set(() => ({
      profileStore: {
        isLoaded: true,
        profileState: state,
      },
    })),
}));
