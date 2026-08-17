import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AdminLoginPage from "./page";

const { push, refresh } = vi.hoisted(() => ({ push: vi.fn(), refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

describe("AdminLoginPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    push.mockClear();
    refresh.mockClear();
  });

  it("submits credentials to the login API and redirects to /admin on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<AdminLoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "correct-password" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/auth/login",
        expect.objectContaining({ method: "POST" })
      )
    );

    const [, requestInit] = fetchMock.mock.calls[0];
    const body = JSON.parse(requestInit.body as string);
    expect(body).toEqual({ email: "admin@example.com", password: "correct-password" });

    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin"));
  });

  it("shows the server's error message when login fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid email or password" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<AdminLoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "admin@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong-password" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
