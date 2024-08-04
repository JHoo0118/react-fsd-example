import { z } from "zod";

export const UserDtoSchema = z.object({
  user: z.object({
    email: z.string(),
    token: z.string(),
    username: z.string(),
  }),
});

export const UpdateUserDtoSchema = z
  .object({
    email: z.string().email().optional().or(z.literal("")),
    username: z.string().min(5).optional().or(z.literal("")),
    password: z.string().min(8).optional().or(z.literal("")),
  })
  .partial()
  .refine((args) => Object.values(args).some(Boolean), {
    path: ["root"],
    message: "하나의 필드 이상 작성되어야 합니다.",
  });

export const CreateUserDtoSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "최소 5자 이상으로 입력해 주세요." }),
    email: z.string().email({
      message: "이메일 형식에 맞게 입력해 주세요.",
    }),
    password: z.string().min(8, {
      message: "최소 8자 이상으로 입력해 주세요.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const LoginUserDtoSchema = z.object({
  email: z.string().email({
    message: "이메일 형식에 맞게 입력해 주세요.",
  }),
  password: z.string().min(8, {
    message: "최소 8자 이상으로 입력해 주세요.",
  }),
});
