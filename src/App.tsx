import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLayout from "./components/PageLayout";
import AppLayout from "./components/AppLayout";
import Authentication from "./pages/Authentication";
import NotFound from "./pages/NotFound";
import { FlowProvider } from "./features/auth/context/FlowContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";

// Dynamic Imports
const PaymentSuccessful = lazy(
  () => import("./features/dashboard/PaymentSuccessful")
);
const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));
const VerifyEmail = lazy(() => import("./features/auth/VerifyEmail"));
const ResetPassword = lazy(() => import("./features/auth/ResetPassword"));
const RequestPasswordReset = lazy(
  () => import("./features/auth/RequestPasswordReset")
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Cards = lazy(() => import("./pages/Cards"));
const SetTransactionPin = lazy(
  () => import("./features/wallet/SetTransactionPin")
);
const TransactionOverview = lazy(
  () => import("./features/transactions/TransactionOverview")
);
const Wallet = lazy(() => import("./pages/Wallet"));
const WalletSettings = lazy(() => import("./pages/WalletSettings"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const FundWallet = lazy(() => import("./features/wallet/FundWallet"));
const Withdraw = lazy(() => import("./features/wallet/Withdraw"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="left" />
      <BrowserRouter>
        <NextUIProvider>
          <AuthProvider>
            <FlowProvider>
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/checkout" element={<PaymentSuccessful />} />
                  <Route element={<PageLayout />}>
                    <Route element={<ProtectedRoute />}>
                      <Route path="/set-pin" element={<SetTransactionPin />} />
                      <Route element={<AppLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                          path="/transactions"
                          element={<Transactions />}
                        />
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
                        path="/request-reset"
                        element={<RequestPasswordReset />}
                      />
                      <Route
                        path="/auth/complete-reset"
                        element={<ResetPassword />}
                      />
                    </Route>
                    <Route element={<NotFound />} path="*" />
                  </Route>
                </Routes>
              </Suspense>
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
