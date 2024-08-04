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
import { useRegisterMutation } from "./register.mutation";

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const RegisterForm = enhance(() => {
  const navigate = useNavigate();

  const form = useForm<authTypesDto.CreateUserDto>({
    mode: "onTouched",
    resolver: zodResolver(authContractsDto.CreateUserDtoSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = form;

  const { mutate: createUser, isPending } = useRegisterMutation({
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

  const onSubmit = (createUserDto: authTypesDto.CreateUserDto) =>
    createUser(createUserDto);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormItem>
          <FormLabel>사용자명</FormLabel>
          <FormControl>
            <Input
              type="username"
              {...register("username")}
            />
          </FormControl>
          <FormFixedMessage>{errors.username?.message}</FormFixedMessage>
        </FormItem>
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
        <FormItem>
          <FormLabel>비밀번호 확인</FormLabel>
          <FormControl>
            <Input
              type="password"
              {...register("confirmPassword")}
            />
          </FormControl>
          <FormFixedMessage>{errors.confirmPassword?.message}</FormFixedMessage>
        </FormItem>
        <Button
          className="w-full"
          type="submit"
          disabled={!canSubmit}
        >
          회원가입
        </Button>
        <FormFixedMessage>{errors.root?.message}</FormFixedMessage>
      </form>
    </Form>
  );
});
