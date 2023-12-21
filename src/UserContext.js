import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// Trong UserProvider
export const UserProvider = ({ children }) => {
  const login = (userData) => {
    setUser(userData);
    // Lưu thông tin đăng nhập vào cookie
    setCookie("user", JSON.stringify(userData), 30); // 30 là số ngày có thể thay đổi
  };

  const logout = () => {
    setUser(null);
    // Xóa thông tin đăng nhập từ cookie khi đăng xuất
    deleteCookie("user");
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  };

  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const [user, setUser] = useState(() => {
    // Kiểm tra xem có thông tin đăng nhập trong cookie không
    const storedUser = getCookie("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
