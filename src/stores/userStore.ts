// src/stores/userStore.ts
import { create } from 'zustand';

interface UserState {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  email: '',
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
}));

export default useUserStore;
