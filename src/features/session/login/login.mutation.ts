import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { AuthService, authTypesDto } from "@/shared/api/auth";
import { sessionLib, useSessionStore } from "@/shared/session";

export function useLoginMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.loginUserMutation>>, // 응답 타입
      DefaultError, // 실패시 에러 타입
      authTypesDto.LoginUserDto, // 요청 타입
      unknown // 추가적인 옵션 타입
    >,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  >,
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {};

  return useMutation({
    mutationKey: ["session", "login-user", ...mutationKey],

    mutationFn: async (loginUserDto: authTypesDto.LoginUserDto) =>
      AuthService.loginUserMutation({ loginUserDto }),

    onMutate,

    onSuccess: async (response, variables, context) => {
      const { user } = response.data;
      const { setSession } = useSessionStore.getState();

      const session = sessionLib.transformUserDtoToSession({ user });
      setSession(session);

      await onSuccess?.(response, variables, context);
    },

    onError,

    onSettled,
  });
}
