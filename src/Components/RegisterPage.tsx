"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../Components/ThemeToggle";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      console.log("Usuário registrado com sucesso:", user);
      router.push("/"); // Redireciona para a tela de login
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao registrar:", error.message);
        alert(error.message);
      } else {
        console.error("Erro desconhecido ao registrar:", error);
        alert("Erro desconhecido ao registrar.");
      }
    }
  };

  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors px-4">
             <div className="absolute top-4 right-4">
               <ThemeToggle />
             </div>
       
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
               <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Login</h1>
       
               {error && (
                 <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center dark:bg-red-200">
                   {error}
                 </div>
               )}

    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-4 shadow-md rounded bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">Criar Conta</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition">
        Criar Conta
      </button>
      <a href="/" className="text-sm text-center text-blue-500 hover:underline dark:text-blue-300">
        Já tem conta? Faça login
      </a>
    </form>
    </div>
    </div>
    
  );
};

export default Register;
