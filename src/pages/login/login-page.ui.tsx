import { Link } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { LoginForm } from "@/features/session";

export function LoginPage() {
  return (
    <main className="m-auto flex h-full w-full max-w-md flex-col justify-center">
      <section
        className="space-y-6 rounded-md bg-card p-8 shadow-md dark:bg-secondary"
        aria-labelledby="login-title"
      >
        <header>
          <h1
            id="login-title"
            className="text-xl sm:text-3xl"
          >
            로그인
          </h1>
        </header>
        <p className="text-center text-sm text-gray-500">
          <Link to={pathKeys.register()}>계정이 없으신가요?</Link>
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
