import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../api/client";

const TOKEN_KEY = "portfolio-admin-token";

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY) || "";
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const token = await login(password);
      sessionStorage.setItem(TOKEN_KEY, token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <p className="eyebrow">Content Studio</p>
        <h1>Sign in to edit content</h1>
        <p className="muted">Changes save to the server and appear on the public site immediately.</p>
        <label className="admin-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Continue"}
        </button>
        <Link to="/" className="admin-login-back">
          Back to portfolio
        </Link>
      </form>
    </main>
  );
}
