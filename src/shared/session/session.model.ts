import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { cookieStorage } from "../lib/universal-cookie";
import { createSelectors } from "../lib/zustand";
import { Session } from "./session.types";

type State = {
  session: Session | null;
};

type Actions = {
  setSession: (session: Session) => void;
  resetSession: () => void;
};

function createSessionSlice() {
  const sessionSlice: StateCreator<
    State & Actions,
    [["zustand/devtools", never], ["zustand/persist", unknown]],
    [],
    State & Actions
  > = (set) => ({
    session: null,
    setSession: (session: Session) => set({ session }, false, "setSession"),
    resetSession: () => {
      set({ session: null }, false, "resetSession");
      cookieStorage<State & Actions>("sessionData").removeItem("session");
    },
  });
  return sessionSlice;
}

const slice = createSessionSlice();
const withPersist = persist(slice, {
  name: "session",
  storage: cookieStorage<State & Actions>("sessionData"), // 쿠키 스토리지 사용
});
const withDevtools = devtools(withPersist, { name: "Session Service" });
const store = create(withDevtools);
export const useSessionStore = createSelectors(store);
