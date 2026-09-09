import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientLandingPage from "./pages/patient/PatientLandingPage";

function DashboardPlaceholder() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-light p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200/80 bg-white p-8 shadow-card text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">
          Welcome, {user?.fullName}
        </h1>
        <p className="text-sm text-slate-500">
          Role: <span className="font-medium text-clinical-600">{user?.role}</span>
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-2 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PatientLandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/ehr"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pharmacy/queue"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/overview"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
