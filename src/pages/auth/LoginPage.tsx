import { useState, type FormEvent } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";
import { DEMO_ACCOUNTS } from "../../types/auth";
import type { UserRole } from "../../types/auth";
import type { AuthOutletContext } from "../../config/roleThemes";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.62H1.27a12 12 0 0 0 0 10.76l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.98 11.98 0 0 0 1.27 6.62l4 3.1c.95-2.35 3.6-4.96 6.73-4.96Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { activeRole, setActiveRole, theme } = useOutletContext<AuthOutletContext>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function redirectFor(role: UserRole): string {
    return (
      DEMO_ACCOUNTS.find((d) => d.role === role)?.redirectPath ??
      "/patient/dashboard"
    );
  }

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

  function handleSelectRole(role: UserRole) {
    setActiveRole(role);
    const account = DEMO_ACCOUNTS.find((d) => d.role === role);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
    setErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login({ email, password }, activeRole);
      toast.success(`Welcome back, ${user.fullName}`);
      navigate(redirectFor(activeRole));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignin() {
    const account = DEMO_ACCOUNTS.find((d) => d.role === activeRole);
    if (!account) return;

    setLoading(true);
    try {
      const user = await login(
        { email: account.email, password: account.password },
        activeRole,
      );
      toast.success(`Signed in with Google as ${user.fullName} (${theme.portalLabel})`);
      navigate(account.redirectPath);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "h-11 w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2";
  const inputNormal = `border-slate-200 ${theme.focusClasses}`;
  const inputError =
    "border-triage-p1 focus:border-triage-p1 focus:ring-triage-p1/20";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-300 ease-in-out ${theme.badge}`}>
            {theme.portalLabel} Portal Mode
          </span>
        </div>
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
          {DEMO_ACCOUNTS.map((account) => {
            const isActive = account.role === activeRole;
            return (
              <button
                key={account.role}
                type="button"
                disabled={loading}
                onClick={() => handleSelectRole(account.role)}
                className={`inline-flex items-center rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinical-600 disabled:opacity-50 ${
                  isActive
                    ? theme.chipActive
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {account.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue with Google */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleSignin}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200/90 bg-white px-5 text-sm font-medium text-slate-700 shadow-card transition-colors duration-300 ease-in-out hover:bg-slate-50 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:opacity-50"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-light px-3 text-slate-400">
            or continue with email
          </span>
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
              className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
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
              className={`${inputBase} pr-11 ${errors.password ? inputError : inputNormal}`}
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
          className={`flex h-11 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-card transition-colors duration-300 ease-in-out hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clinical-600 disabled:opacity-50 ${theme.button}`}
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