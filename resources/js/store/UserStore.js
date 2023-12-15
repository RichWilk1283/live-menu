import { create } from "zustand";

export const useUserStore = create((set) => ({
  loggedInUser: "",
  setLoggedInUser: (userName) => set({loggedInUser: userName})
}))