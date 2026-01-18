import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // ZMIANA: Inicjalizacja stanu z localStorage zamiast null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const usersDB = [
    { username: "student1", password: "123", role: "student" },
    { username: "student2", password: "123", role: "student" },
    { username: "admin", password: "admin", role: "teacher" },
  ];

  const login = (username, password) => {
    const foundUser = usersDB.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      // ZMIANA: Zapisanie użytkownika w przeglądarce
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // ZMIANA: Wyczyszczenie pamięci przeglądarki
    localStorage.removeItem("user");
  };

  const register = (username, password) => {
    usersDB.push({ username, password, role: "student" });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};