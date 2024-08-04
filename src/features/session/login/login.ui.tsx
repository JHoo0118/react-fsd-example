import { zodResolver } from "@hookform/resolvers/zod";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authContractsDto, authTypesDto } from "@/shared/api/auth";
import { compose } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { Button } from "@/shared/ui/button";
import { ErrorHandler, logError } from "@/shared/ui/error-handler";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormFixedMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useLoginMutation } from "./login.mutation";

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const LoginForm = enhance(() => {
  const navigate = useNavigate();

  const form = useForm<authTypesDto.LoginUserDto>({
    mode: "onTouched",
    resolver: zodResolver(authContractsDto.LoginUserDtoSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = form;

  const { mutate, isPending } = useLoginMutation({
    onSuccess: async () => {
      // const { username } = respone.data.user;
      // navigate(pathKeys.profile.byUsername({ username }));
      navigate(pathKeys.home());
    },

    onError(error) {
      setError("root", { message: error.message });
    },
  });

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean);

  const onSubmit = (loginUserDto: authTypesDto.LoginUserDto) =>
    mutate(loginUserDto);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input
              type="email"
              {...register("email")}
            />
          </FormControl>
          <FormFixedMessage>{errors.email?.message}</FormFixedMessage>
        </FormItem>
        <FormItem>
          <FormLabel>비밀번호</FormLabel>
          <FormControl>
            <Input
              type="password"
              {...register("password")}
            />
          </FormControl>
          <FormFixedMessage>{errors.password?.message}</FormFixedMessage>
        </FormItem>
        <Button
          className="w-full"
          type="submit"
          disabled={!canSubmit}
        >
          로그인
        </Button>
        <FormFixedMessage>{errors.root?.message}</FormFixedMessage>
      </form>
    </Form>
  );
});
