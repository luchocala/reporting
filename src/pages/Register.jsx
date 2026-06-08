import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import { useLocalAuth } from "@/lib/LocalAuthContext";

export default function Register() {
  const { register } = useLocalAuth();

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!formData.username.trim()) {
      setError("Ingresá un nombre de usuario.");
      return;
    }

    if (!formData.email.trim()) {
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

    setIsSubmitting(true);

    try {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        "America/Argentina/Buenos_Aires";

      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        timezone,
      });

      setSuccessMessage(
        "Tu cuenta fue creada correctamente y queda pendiente de aprobación."
      );

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Registrá tu usuario para solicitar acceso al panel."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Nombre
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              placeholder="Nombre"
              autoComplete="given-name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Apellido
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              placeholder="Apellido"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Usuario
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(event) => updateField("username", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            placeholder="usuario"
            autoComplete="username"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            placeholder="nombre@empresa.com"
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm outline-none focus:border-ring"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(event) =>
                updateField("confirmPassword", event.target.value)
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 pr-10 text-sm outline-none focus:border-ring"
              placeholder="Repetí la contraseña"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label={
                showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Iniciar sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}