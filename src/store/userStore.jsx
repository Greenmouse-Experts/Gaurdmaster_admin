import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const userInitState = {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    image: '',
    phone: '',
    id: '',
    joined: ''
}
const useAuthStore = create()(
  persist(
    (set) => ({
      user: userInitState,
      saveUser: (data) =>
        set(() => ({
          user: data,
        })),
      clearUser: () =>
        set(() => ({
          user: userInitState,
        })),
    }),
    {
      name: "guard_admin",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;