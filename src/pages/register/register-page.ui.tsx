import { Link } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { RegisterForm } from "@/features/session";

export function RegisterPage() {
  return (
    <main className="m-auto flex h-full w-full max-w-md flex-col justify-center">
      <section
        className="space-y-6 rounded-md bg-card p-8 shadow-md dark:bg-secondary"
        aria-labelledby="register-title"
      >
        <header>
          <h1
            id="register-title"
            className="text-xl sm:text-3xl"
          >
            회원가입
          </h1>
        </header>
        <p className="text-center text-sm text-gray-500">
          <Link to={pathKeys.login()}>이미 계정이 있으신가요?</Link>
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
