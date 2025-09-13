import { AuthService } from "@/api/services/auth";
import { setIsLoggedIn, setToken, useAppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(data.auth.access_token));
    },
  });
};
