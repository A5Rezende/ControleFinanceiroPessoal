/**
 * Componente responsável pelo cadastro de novos usuários.
 *
 * Funcionalidades:
 * - Criar conta de usuário
 * - Validar preenchimento dos campos obrigatórios
 * - Enviar dados para a API
 * - Redirecionar para a tela inicial após cadastro
 *
 * Projeto: Controle Financeiro Pessoal
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function Register() {

  /**
   * Estado do formulário de cadastro
   * username → Nome de usuário
   * email → Email do usuário
   * password → Senha
   */
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  /**
   * Submete o formulário de cadastro
   * - Valida campos obrigatórios
   * - Envia dados para a API
   * - Redireciona após sucesso
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!form.username || !form.email || !form.password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Criação do usuário
      await api.post("/register/", form);

      // Redireciona para a tela inicial (login)
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "aqua" }}
    >
      <div className="card shadow p-4" style={{ width: "760px" }}>
        {/* Cabeçalho */}
        <div className="row">
          <div className="col-3"></div>

          <div className="col-6">
            <h2 className="text-center mb-4">Cadastro</h2>
          </div>

          <div className="col-3">
            <Link className="btn btn-primary m-1" to={`/`}>
              Home
            </Link>
          </div>
        </div>

        {/* Formulário de Cadastro */}
        <form onSubmit={handleSubmit} className="m-3 d-flex align-items-center flex-column">
          <input
            className="form-control m-2"
            placeholder="Usuário"
            autoComplete="off"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="form-control m-2"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="form-control m-2"
            type="password"
            placeholder="Senha"
            autoComplete="off"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-primary m-1">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
