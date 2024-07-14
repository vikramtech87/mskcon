import { type MealPreference } from "@/lib/meal-preference";
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

type MealStore = {
  isLoaded: boolean;
  mealState?: {
    preference: MealPreference;
  };
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

  mealStore: MealStore;
  isMealLoaded: () => boolean;
  setMealLoading: () => void;
  setMeal: (preference?: "veg" | "non-veg") => void;
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

  mealStore: {
    isLoaded: false,
    mealState: undefined,
  },
  isMealLoaded: () => get().mealStore.isLoaded,
  setMealLoading: () =>
    set((state) => ({
      mealStore: {
        isLoaded: false,
        mealState: undefined,
      },
    })),
  setMeal: (preference?: "veg" | "non-veg") =>
    set(() => {
      if (preference === undefined) {
        return {
          mealStore: {
            isLoaded: true,
            mealState: undefined,
          },
        };
      }
      return {
        mealStore: {
          isLoaded: true,
          mealState: {
            preference,
          },
        },
      };
    }),
}));
