import { AuthService } from "@/api/services/auth";

import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
  });
};
