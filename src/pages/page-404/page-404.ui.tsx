import { Bot } from "lucide-react";
import { NavLink } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { Button } from "@/shared/ui/button";

export function Page404() {
  return (
    <main className="container relative py-16 lg:py-20">
      <section
        aria-labelledby="error-title"
        className="mx-auto max-w-2xl space-y-7 text-center"
      >
        <Bot
          className="mx-auto"
          width={60}
          height={60}
        />
        <h1
          id="error-title"
          className="text-8xl font-semibold tracking-widest md:text-9xl"
        >
          404
        </h1>
        <p className="block text-sm font-medium tracking-wider text-neutral-800 dark:text-neutral-200 sm:text-base">
          페이지를 찾을 수 없습니다.
        </p>
        <Button
          variant="link"
          className="btn btn-sm btn-outline-primary"
        >
          <NavLink
            className="text-gray-600"
            to={pathKeys.home()}
          >
            홈으로 돌아가기
          </NavLink>
        </Button>
      </section>
    </main>
  );
}
