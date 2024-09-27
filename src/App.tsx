import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLayout from "./components/PageLayout";
import AppLayout from "./components/AppLayout";
import Authentication from "./pages/Authentication";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./features/auth/ForgotPassword";
import VerifyEmail from "./features/auth/VerifyEmail";
import ResetPassword from "./features/auth/ResetPassword";
import RequestPasswordReset from "./features/auth/RequestPasswordReset";
import { FlowProvider } from "./features/auth/context/FlowContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import SetTransactionPin from "./features/wallet/SetTransactionPin";
import TransactionOverview from "./features/transactions/TransactionOverview";
import Wallet from "./pages/Wallet";
import WalletSettings from "./pages/WalletSettings";
import AccountSettings from "./pages/AccountSettings";
import FundWallet from "./features/wallet/FundWallet";
import Withdraw from "./features/wallet/Withdraw";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
          <AuthProvider>
            <FlowProvider>
              <Routes>
                <Route element={<PageLayout />}>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/set-pin" element={<SetTransactionPin />} />
                    <Route element={<AppLayout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route
                        path="/transactions/:id"
                        element={<TransactionOverview />}
                      />
                      <Route
                        path="/create-payment-link"
                        element={<Dashboard />}
                      />
                      <Route path="/transfer" element={<Dashboard />} />
                      <Route path="/wallet" element={<Wallet />}>
                        <Route index element={<FundWallet />} />
                        <Route path="fund" element={<FundWallet />} />
                        <Route path="withdraw" element={<Withdraw />} />
                      </Route>
                      <Route path="/cards" element={<Cards />} />
                      <Route
                        path="/settings"
                        element={<Navigate replace to="/settings/account" />}
                      />
                      <Route
                        path="settings/wallet"
                        element={<WalletSettings />}
                      />
                      <Route
                        path="settings/account"
                        element={<AccountSettings />}
                      />
                    </Route>
                  </Route>
                  <Route element={<Authentication />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/request-reset"
                      element={<RequestPasswordReset />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                      path="/auth/complete-reset"
                      element={<Navigate replace to="/reset-password" />}
                    />
                  </Route>

                  <Route element={<NotFound />} path="*" />

                  <Route path="/home" element={<div className="">App</div>} />
                </Route>
              </Routes>
            </FlowProvider>
          </AuthProvider>
        </NextUIProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"light"}
          transition={Bounce}
          stacked
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
