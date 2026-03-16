import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import Account from "@/pages/Account";

describe("avatar initials", () => {
  it("shows NK in the topbar avatar", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/app"]}>
        <Routes>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const header = container.querySelector("header");

    expect(header).toBeTruthy();
    expect(header!).toHaveTextContent("NK");
  });

  it("shows NK on the account profile avatar", () => {
    render(<Account />);

    expect(screen.getByText("NK")).toBeInTheDocument();
  });
});
