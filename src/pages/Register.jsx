// src/pages/Register.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalAuth } from "@/lib/LocalAuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useLocalAuth();
  const redirectTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    const username = formData.username.trim();
    const email = formData.email.trim();
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();

    if (!username) {
      setError("Ingresá un nombre de usuario.");
      return;
    }

    if (!email) {
      setError("Ingresá un email.");
      return;
    }

    if (!formData.password) {
      setError("Ingresá una contraseña.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        "America/Argentina/Buenos_Aires";

      await register({
        username,
        email,
        firstName,
        lastName,
        password: formData.password,
        timezone,
      });

      setRegistrationCompleted(true);
      setSuccessMessage(
        "Tu cuenta fue creada correctamente y queda pendiente de aprobación. Te redirigimos al login en unos segundos."
      );

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create account"
      subtitle="Register your user to request access"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="h-12"
              disabled={loading || registrationCompleted}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="h-12"
              disabled={loading || registrationCompleted}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="usuario"
            value={formData.username}
            onChange={(e) => updateField("username", e.target.value)}
            className="h-12"
            required
            disabled={loading || registrationCompleted}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@empresa.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="h-12"
            required
            disabled={loading || registrationCompleted}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="h-12 pr-10"
              required
              disabled={loading || registrationCompleted}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              disabled={loading || registrationCompleted}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="h-12 pr-10"
              required
              disabled={loading || registrationCompleted}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
              aria-label={
                showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              disabled={loading || registrationCompleted}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-medium"
          disabled={loading || registrationCompleted}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : registrationCompleted ? (
            "Account created"
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}