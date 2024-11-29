"use client";
import React, { FormEvent, useState, useEffect } from "react";
import * as z from "zod";
import Link from "next/link"; // Import Link here

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const updateState = (
  name: string,
  value: string,
  setValues: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
) => {
  setValues((prevValues) => ({ ...prevValues, [name]: value }));
  setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
};

const handleErrors = (
  error: unknown,
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
) => {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [err.path[0]]: err.message,
      }));
    });
  } else {
    console.error("Unexpected error:", error);
  }
};

const Form = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState(name, value, setValues, setErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Valider les données du formulaire
      const validationResult = FormSchema.safeParse(values);
      if (!validationResult.success) {
        throw new Error(validationResult.error.errors[0].message);
      }

      // Envoyer la requête au serveur
      const response = await fetch("/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // Vérifier la réponse du serveur
      if (response.ok) {
        console.log("Compte créé avec succès !");
        window.location.href = "/auth/signin";
      } else {
        // Gérer les erreurs de réponse
        const data = await response.json();
        console.error("Erreur API :", data.message);
      }
    } catch (error) {
      // Gérer les erreurs de validation ou de requête
      handleErrors(error, setErrors);
    }
  };

  if (!isClient) {
    return null; // Return null on the server
  }

  const emailInputClasses = `block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
    errors.email && "border-red-600 dark:border-red-400"
  }`;

  const passwordInputClasses = `block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
    errors.password && "border-red-600 dark:border-red-400"
  }`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Sign Up
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            name="email"
            className={emailInputClasses}
            type="email"
            placeholder="Entrez votre email..."
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Mot de passe:
          </label>
          <input
            name="password"
            className={passwordInputClasses}
            type="password"
            placeholder="Entrez votre mot de passe..."
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Signup
          </button>
        </div>
        <div className="mt-4 text-center text-gray-700 dark:text-gray-200">
          <p>Already have an account?</p>
          <Link
            href="/auth/signin"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login to your account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
