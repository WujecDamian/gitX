import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import Jobs from "./Jobs";

vi.mock("../../Contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Jobs", () => {
  it("asks the user to pick a status when they have none", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    render(<Jobs />);

    expect(screen.getByText("Pick status on your profile")).toBeInTheDocument();
  });
});
