import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../features/auth/Register";
import { MemoryRouter } from "react-router-dom";

describe("Registration Component", () => {
  test("renders the registration form correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if all fields and buttons are present (using placeholder)
    expect(screen.getByPlaceholderText(/Firstname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Lastname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Telephone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error messages when fields are empty", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Click the submit button without filling the form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Check if error messages appear
    expect(
      await screen.findByText(/First Name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  test("submits the form when all fields are filled", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill the form fields (using placeholder)
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Telephone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "john_doe" },
    });

    // Click the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Check if form is submitted successfully (e.g., by checking for a success message)
    expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
  });
});
