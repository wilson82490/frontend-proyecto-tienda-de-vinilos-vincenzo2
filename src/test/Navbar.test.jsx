import {describe, it, expect} from 'vitest';
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

describe("Navbar", () => {
    it ("espero que muestre el registro y el login", () => {
        render (
            <MemoryRouter>
                <AuthContext.Provider value = {{user: null, logout:()=>{} }}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /registro/i })).toBeInTheDocument();
   
    });

   it("espero que muestre el logout cuando tenga un usuario", () => {
        const user = { name: "Test", email: "test@test.com", admin: false };

        render(
            <MemoryRouter>
            <AuthContext.Provider value={{ user, logout: () => {} }}>
                <Navbar />
            </AuthContext.Provider>
            </MemoryRouter>
        );

  expect(screen.getByText("Logout")).toBeInTheDocument();
  expect(screen.queryByText("Admin")).not.toBeInTheDocument();
});

it("espero que muestre el admin cuando el usuario sea admin", () => {
  const user = { name: "Admin", email: "admin@test.com", admin: true };

  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, logout: () => {} }}>
        <Navbar />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("Logout")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /admin/i })).toBeInTheDocument();
});
})