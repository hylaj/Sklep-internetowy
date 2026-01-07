import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Lista dozwolonych użytkowników (Mock)
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
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username, password) => {
    // Prosta symulacja rejestracji (dodaje do lokalnej zmiennej tymczasowo)
    usersDB.push({ username, password, role: "student" });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
