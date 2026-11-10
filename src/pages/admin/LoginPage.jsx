import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { checkSession, login } from "../../api/client";

export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

export function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState("checking");

  useNoIndex();

  useEffect(() => {
    let live = true;
    checkSession().then((ok) => {
      if (live) setSession(ok ? "in" : "out");
    });
    return () => {
      live = false;
    };
  }, []);

  if (session === "checking") {
    return <main className="admin-login" />;
  }

  if (session === "in") {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(password);
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
        <p className="muted">The public site is read-only. Sign-in works only on the private editor.</p>
        <label className="admin-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            minLength={8}
            maxLength={200}
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
