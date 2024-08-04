// import { useSuspenseQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
// import { SessionQueries } from "@/shared/session";
import { SessionQueries } from "@/shared/session";
import { useLogoutMutation } from "@/shared/session/session.mutation";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
// export function Footer() {
//   return (
//     <footer>
//       <div className="container">
//         <NavLink
//           className="logo-font"
//           to={pathKeys.home()}
//         >
//           conduit
//         </NavLink>
//         <span className="attribution">
//           An interactive learning project from{' '}
//           <a
//             href="https://thinkster.io"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Thinkster
//           </a>
//           . Code &amp; design licensed under MIT.
//         </span>
//       </div>
//     </footer>
//   )
// }

export function BrandLink() {
  return <NavLink to={pathKeys.home()}>React FSD</NavLink>;
}

export function HomeLink() {
  return <NavLink to={pathKeys.home()}>홈</NavLink>;
}

export function SignInLink() {
  return <NavLink to={pathKeys.login()}>로그인</NavLink>;
}

export function SignUpLink() {
  return <NavLink to={pathKeys.register()}>회원가입</NavLink>;
}

export function SettingsProfileLink() {
  return (
    <NavLink
      className=""
      to={pathKeys.settings()}
    >
      <Settings size={16} />
      &nbsp;설정
    </NavLink>
  );
}

export function ProfileLink() {
  const { data: user } = useSuspenseQuery(SessionQueries.currentSessionQuery());
  const navigate = useNavigate();

  const { mutate } = useLogoutMutation({
    onSuccess: () => {
      navigate(pathKeys.home());
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user.username}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleClick}
            className="cursor-pointer"
          >
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
