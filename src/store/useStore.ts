import { type MealPreference } from "@/lib/meal-preference";
import { TransactionStatus } from "@/lib/transaction-status";
import { UserTransactionData } from "@/lib/userTransactionData";
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
  profileState?: ProfileFormData & { registerNumber: string };
};

type MealStore = {
  isLoaded: boolean;
  mealState?: {
    preference: MealPreference;
  };
};

type WorkshopStore = {
  isLoaded: boolean;
  workshopState?: {
    workshopId: string;
  };
};

type TransactionStore = {
  isLoaded: boolean;
  transactionState: UserTransactionData[];
};

type Store = {
  authStore: AuthStore;
  isAuthLoaded: () => boolean;
  isAuthenticated: () => boolean;
  setAuth: (state?: AuthState) => void;

  profileStore: ProfileStore;
  isProfileLoaded: () => boolean;
  setProfileLoading: () => void;
  setProfile: (state?: ProfileFormData & { registerNumber: string }) => void;

  mealStore: MealStore;
  isMealLoaded: () => boolean;
  setMealLoading: () => void;
  setMeal: (preference?: "veg" | "non-veg") => void;

  workshopStore: WorkshopStore;
  isWorkshopLoaded: () => boolean;
  setWorkshopLoading: () => void;
  setWorkshop: (state?: { workshopId: string }) => void;

  transactionStore: TransactionStore;
  setTransactionLoading: () => void;
  setTransactions: (state: UserTransactionData[]) => void;
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
  setProfile: (state?: ProfileFormData & { registerNumber: string }) =>
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

  workshopStore: {
    isLoaded: false,
    workshopState: undefined,
  },
  isWorkshopLoaded: () => get().workshopStore.isLoaded,
  setWorkshopLoading: () =>
    set(() => ({
      workshopStore: {
        isLoaded: false,
        workshopState: undefined,
      },
    })),
  setWorkshop: (state?: { workshopId: string }) =>
    set(() => ({
      workshopStore: {
        isLoaded: true,
        workshopState: state,
      },
    })),

  transactionStore: {
    isLoaded: false,
    transactionState: [],
  },
  setTransactionLoading: () =>
    set(() => ({
      transactionStore: {
        isLoaded: false,
        transactionState: [],
      },
    })),
  setTransactions: (data) =>
    set(() => ({
      transactionStore: {
        isLoaded: true,
        transactionState: data,
      },
    })),
}));
