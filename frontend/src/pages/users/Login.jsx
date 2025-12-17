/**
 * Componente responsável pela autenticação do usuário.
 *
 * Funcionalidades:
 * - Realizar login via API
 * - Armazenar tokens JWT (access e refresh)
 * - Redirecionar o usuário após autenticação
 *
 * Projeto: Controle Financeiro Pessoal
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api";

export default function Login() {

  /**
   * Estado do formulário de login
   * username → Nome de usuário
   * password → Senha
   */
  const [form, setForm] = useState({ username: "", password: "" });

  /**
   * Envia os dados de login para a API
   * Em caso de sucesso:
   * - Salva os tokens JWT no localStorage
   * - Redireciona o usuário para o dashboard
   */
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await api.post("/login/", form);

      // Armazena os tokens de autenticação
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Redireciona após login bem-sucedido
      window.location.href = "/dashboard";
    } catch (error) {
      // Tratamento de erro de autenticação
      if (error.response && error.response.status === 401) {
        alert("Usuário ou senha incorretos");
      } else {
        alert("Erro desconhecido");
      }
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "aqua" }}
    >
      <div className="card shadow p-4" style={{ width: "570px" }}>
        {/* Cabeçalho */}
        <div className="row">
          <div className="col-3"></div>

          <div className="col-6">
            <h2 className="text-center mb-4">Login</h2>
          </div>

          <div className="col-3">
            <Link className="btn btn-primary m-1" to={`/`}>
              Home
            </Link>
          </div>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="m-3 d-flex align-items-center flex-column">
          <input
            className="form-control mb-3"
            placeholder="Usuário"
            autoComplete="off"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Senha"
            autoComplete="off"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
