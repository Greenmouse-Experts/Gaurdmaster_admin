import useAuthStore from "../store/userStore";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const userId = user.id;
  const token = user.token;
  const role = user.role
  const signOut = () => {
    localStorage.clear();
    clearUser();
    window.location.replace("/login");
  };
  return {
    user,
    role,
    userId,
    token,
    saveUser,
    signOut,
  };
};

export default useAuth;
