import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLayout from "./components/PageLayout";
import AppLayout from "./pages/AppLayout";
import Authentication from "./pages/Authentication";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./features/auth/ForgotPassword";
import VerifyEmail from "./features/auth/VerifyEmail";
import ResetPassword from "./features/auth/ResetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});



export default function App() {

  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="left" />
      <BrowserRouter>
        <NextUIProvider>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<AppLayout />} />

              <Route element={<Authentication />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/verify-email" element={<VerifyEmail/>} />
              </Route>

              <Route element={<NotFound />} path="*" />

              <Route path="/home" element={<div className="">App</div>} />
            </Route>
          </Routes>
        </NextUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
