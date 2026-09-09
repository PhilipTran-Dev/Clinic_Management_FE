import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";
import { DEMO_ACCOUNTS } from "../../types/auth";
import type { UserRole } from "../../types/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login({ email, password }, "PATIENT");
      toast.success(`Welcome back, ${user.fullName}`);
      navigate("/patient/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoSignin(role: UserRole) {
    const account = DEMO_ACCOUNTS.find((d) => d.role === role);
    if (!account) return;

    setLoading(true);
    try {
      const user = await login(
        { email: account.email, password: account.password },
        role,
      );
      toast.success(`Signed in as ${user.fullName} (${account.label})`);
      navigate(account.redirectPath);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter your credentials to access the clinical dashboard.
        </p>
      </div>

      {/* Quick Demo Sign-in */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-card">
        <p className="mb-3 text-xs font-medium text-slate-500">
          Quick Demo Sign-in
        </p>
        <div className="flex flex-wrap gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              disabled={loading}
              onClick={() => handleDemoSignin(account.role)}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 transition-all hover:border-clinical-300 hover:bg-clinical-50 hover:text-clinical-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinical-600 disabled:opacity-50"
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-light px-3 text-slate-400">or sign in with email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@clinic.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              className={`h-11 w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none ${
                errors.email
                  ? "border-triage-p1 focus:border-triage-p1 focus:ring-2 focus:ring-triage-p1/20"
                  : "border-slate-200 focus:border-clinical-600 focus:ring-2 focus:ring-clinical-500/20"
              }`}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-triage-p1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              className={`h-11 w-full rounded-lg border bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none ${
                errors.password
                  ? "border-triage-p1 focus:border-triage-p1 focus:ring-2 focus:ring-triage-p1/20"
                  : "border-slate-200 focus:border-clinical-600 focus:ring-2 focus:ring-clinical-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinical-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-triage-p1">{errors.password}</p>}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-clinical-600 focus:ring-clinical-500"
            />
            Remember me
          </label>
          <Link
            to="#"
            className="text-sm font-medium text-cta transition-colors hover:text-cta-hover"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-clinical-600 px-5 text-sm font-semibold text-white shadow-card transition-all hover:bg-clinical-700 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinical-600 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-medium text-cta transition-colors hover:text-cta-hover">
          Create Account
        </Link>
      </p>
    </div>
  );
}
