/**
 * Componente responsável por listar as categorias cadastradas.
 * Permite:
 * - Filtrar categorias por tipo (Entrada / Saída / Todas)
 * - Navegar para criação e edição
 * - Excluir categorias existentes
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function List() {
    /**
     * Estado que armazena a lista de categorias
     */
    const [categorias, setCategorias] = useState([]);

    /**
     * Busca as categorias na API e aplica filtro por tipo.
     * @param {string} filtro
     *  - '0' → Todas
     *  - '1' → Entradas
     *  - '2' → Saídas
     */
    const carregarCategorias = async (filtro = "0") => {
        const resposta = await api.get("/category/");

        if (filtro === "1") {
            // Apenas categorias do tipo Entrada
            const entradas = resposta.data.filter(item => item.type === true);
            setCategorias(entradas);
        } else if (filtro === "2") {
            // Apenas categorias do tipo Saída
            const saidas = resposta.data.filter(item => item.type === false);
            setCategorias(saidas);
        } else {
            // Todas as categorias
            setCategorias(resposta.data);
        }
    };

    /**
     * Busca os dados do perfil do usuário autenticado.
     * (mantido por padrão de segurança e autenticação do projeto)
     */
    const loadProfile = async () => {
        const response = await api.get("/profile");
        return response.data;
    };

    /**
     * Executa na montagem do componente:
     * - Valida sessão do usuário
     * - Carrega a lista inicial de categorias
     */
    useEffect(() => {
        async function fetch() {
            const data = await loadProfile();
            await carregarCategorias();
        }
        fetch();
    }, []);

    /**
     * Remove uma categoria após confirmação do usuário
     * @param {number} id - ID da categoria
     */
    const deletar = async (id) => {
        if (window.confirm("Você tem certeza que deseja excluir?")) {
            await api.delete(`/category/${id}/`);
            carregarCategorias();
        }
    };

    return (
        <div className="container">
            {/* Cabeçalho com filtro, título e botão de criação */}
            <div className="m-5 row">
                <div className="col-3">
                    <select
                        className="form-control m-2"
                        onChange={(e) => carregarCategorias(e.target.value)}
                    >
                        <option value="0">Todos</option>
                        <option value="2">Saída</option>
                        <option value="1">Entrada</option>
                    </select>
                </div>

                <div className="col-6 d-flex align-items-center flex-column">
                    <h1>Listar Categorias</h1>
                </div>

                <div className="col-3 d-flex align-items-center justify-content-center">
                    <Link className="btn btn-primary m-1" to="/categories/show">
                        Criar
                    </Link>
                </div>
            </div>

            {/* Tabela de categorias */}
            <div className="row">
                <div className="card-body d-flex justify-content-center">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id} className="text-center">
                                    <td>{categoria.id}</td>
                                    <td>{categoria.name}</td>
                                    <td>
                                        {categoria.type ? (
                                            <span className="badge bg-success">Entrada</span>
                                        ) : (
                                            <span className="badge bg-danger">Saída</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                className="btn btn-sm btn-primary m-1"
                                                to={`/categories/show/${categoria.id}`}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger m-1"
                                                onClick={() => deletar(categoria.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
