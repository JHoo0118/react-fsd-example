import Cookies from "universal-cookie";
import { PersistStorage, StorageValue } from "zustand/middleware";
import { pathKeys } from "../react-router";

export const cookieStorage = <T>(cookieName: string): PersistStorage<T> => {
  const cookies = new Cookies();

  return {
    getItem: (name: string): StorageValue<T> | null => {
      const item = cookies.get(cookieName);
      if (item && item[name]) {
        try {
          return JSON.parse(item[name]) as StorageValue<T>;
        } catch {
          return null;
        }
      }
      return null;
    },
    setItem: (name: string, value: StorageValue<T>) => {
      const currentCookies = cookies.get(cookieName) || {};
      currentCookies[name] = JSON.stringify(value);
      cookies.set(cookieName, currentCookies, {
        path: pathKeys.root,
        sameSite: "strict",
      });
    },
    removeItem: (name: string) => {
      const currentCookies = cookies.get(cookieName) || {};
      delete currentCookies[name];

      if (Object.keys(currentCookies).length === 0) {
        cookies.remove(cookieName, { path: "/" });
      } else {
        cookies.set(cookieName, currentCookies, {
          path: pathKeys.root,
          sameSite: "strict",
        });
      }
    },
  };
};
