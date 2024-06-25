import { create } from "zustand";

export type AuthState = {
  email: string;
  userId: string;
  isEmailVerified: boolean;
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

// type CurrentStep =
//   | "Authentication"
//   | "VerifyEmail"
//   | "EnterDetails"
//   | "Purchase";

// type AuthState = {
//   userId: string;
//   email: string;
//   emailVerified: boolean;
// };

// type ProfileState = {
//   title: string;
//   firstName: string;
//   lastName: string;
//   designation: "Postgraduate" | "Consultant";
//   college: string;
//   medicalCouncil: string;
//   medicalCouncilNumber: string;
//   address1: string;
//   address2: string;
//   city: string;
//   postalCode: string;
//   country: string;
//   mobileNumber: string;
// };

// type Store = {
//   auth: {
//     isLoaded: boolean;
//     state?: AuthState;
//   };
//   profile: {
//     isLoaded: boolean;
//     state?: ProfileState;
//   };
//   setAuth: (authState: AuthState) => void;
//   setProfile: (profileState: ProfileState) => void;
//   signOut: () => void;
//   currentStep: () => CurrentStep;
// };

// export const useStore = create<Store>()((set, get) => ({
//   auth: {
//     isLoaded: false,
//     state: undefined,
//   },
//   profile: {
//     isLoaded: false,
//     state: undefined,
//   },
//   setAuth: (authState: AuthState) =>
//     set(() => ({
//       auth: {
//         isLoaded: true,
//         state: authState,
//       },
//     })),
//   setProfile: (profileState: ProfileState) =>
//     set(() => ({
//       profile: {
//         isLoaded: true,
//         state: profileState,
//       },
//     })),
//   signOut: () =>
//     set(() => ({
//       auth: {
//         isLoaded: true,
//         state: undefined,
//       },
//       profile: {
//         isLoaded: true,
//         state: undefined,
//       },
//     })),
//   currentStep: () => {
//     const currentAuth = get().auth;
//     if (currentAuth.state === undefined) {
//       return "Authentication";
//     }

//     if (!currentAuth.state.emailVerified) {
//       return "VerifyEmail";
//     }

//     const currentProfile = get().profile;
//     if (currentProfile.state === undefined) {
//       return "EnterDetails";
//     }

//     return "Purchase";
//   },
// }));
