/**
 * Componente responsável pela criação e edição de categorias.
 *
 * Funcionalidades:
 * - Criar nova categoria
 * - Editar categoria existente
 * - Selecionar tipo da categoria (Entrada ou Saída)
 *
 * Projeto: Controle Financeiro Pessoal
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Show() {

  /**
   * Estado do formulário de categoria
   * name → Nome da categoria
   * type → Tipo da categoria ("1" = Entrada, "0" = Saída)
   */
  const [form, setForm] = useState({ name: "", type: "" });

  /**
   * Parâmetro de rota para identificar edição
   * Se existir ID, o formulário entra em modo de edição
   */
  const { id } = useParams();

  /**
   * Carrega os dados da categoria quando estiver em modo edição
   */
  useEffect(() => {
    if (id) {
      api.get(`/category/${id}`).then((resposta) => {
        setForm({
          name: resposta.data.name,
          type: resposta.data.type ? "1" : "0"
        });
      });
    }
  }, [id]);

  /**
   * Submete o formulário para criação ou edição
   * - POST → Criação
   * - PUT → Edição
   */
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      // Validação simples dos campos obrigatórios
      if (form.name !== "" && form.type !== "") {

        if (id) {
          // Atualiza categoria existente
          await api.put(`/category/${id}/`, form);
        } else {
          // Cria nova categoria
          await api.post("/category/", form);
        }

        // Redireciona para a listagem após sucesso
        window.location.href = "/categories/list";
      }
    } catch (error) {
      // Tratamento básico de erros da API
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        alert("Falta parâmetros");
      } else {
        alert("Erro desconhecido");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="m-5 d-flex align-items-center flex-column">
      <div className="col-8 d-flex align-items-center flex-column">
        <h1>Cadastro de Categoria</h1>

        {/* Campo nome da categoria */}
        <input
          className="form-control m-2"
          placeholder="Nome"
          autoComplete="off"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Seleção do tipo da categoria */}
        <select
          className="form-control m-2"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          value={form.type}
        >
          <option value="" disabled>Selecione o tipo</option>
          <option value="0">Saída</option>
          <option value="1">Entrada</option>
        </select>

        <button className="btn btn-primary m-1">Cadastrar</button>
      </div>
    </form>
  );
}
