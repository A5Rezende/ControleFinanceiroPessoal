/**
 * Componente responsável pelo cadastro e edição de registros financeiros.
 * 
 * Funcionalidades:
 * - Criar novo registro financeiro (entrada ou saída)
 * - Editar um registro existente
 * - Carregar categorias disponíveis
 * - Marcar registro como pago / recebido
 * 
 * Projeto: Controle Financeiro Pessoal
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Show() {

    // Estado do formulário de cadastro/edição
    const [form, setForm] = useState({
        name: "",
        date: "",
        category_id: "",
        paid: false,
        value: "",
    });

    // Lista de categorias disponíveis para seleção
    const [categorias, setCategorias] = useState([]);

    // ID do registro (usado para edição)
    const { id } = useParams();

    // Carrega todas as categorias cadastradas e ordena por nome
    const carregarCategorias = async () => {
        const resposta = await api.get("/category/");
        const listaOrdenada = [...resposta.data]
            .sort((a, b) => a.name.localeCompare(b.name));
        setCategorias(listaOrdenada);
    };

    // Busca os dados do usuário logado
    const loadProfile = async () => {
        const response = await api.get("/profile");
        return response.data;
    };

    // Carregamento inicial da tela
    useEffect(() => {
        async function fetch() {
            const data = await loadProfile();
            await carregarCategorias();
        }
        fetch();
    }, []);

    // Caso exista um ID, carrega os dados do registro para edição
    useEffect(() => {
        if (!id) return;

        api.get(`/record/${id}`).then((resposta) => {
            setForm({
                name: resposta.data.name,
                date: resposta.data.date,
                category_id: resposta.data.category.id,
                paid: resposta.data.paid ? "1" : "0",
                value: resposta.data.value,
            });
        });
    }, [id]);

    /**
     * Envia os dados do formulário para criação ou edição do registro
     */
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            // Validação simples dos campos obrigatórios
            if (
                form.name !== "" &&
                form.date !== "" &&
                form.category_id !== "" &&
                form.value !== ""
            ) {
                // Atualiza registro existente
                if (id) {
                    await api.put(`/record/${id}/`, form);
                }
                // Cria novo registro
                else {
                    await api.post("/record/", form);
                }

                // Redireciona para a listagem após sucesso
                window.location.href = "/records/list";
            }
        } catch (error) {
            // Tratamento básico de erros da API
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                alert("Faltam parâmetros obrigatórios");
            } else {
                alert("Erro desconhecido ao salvar o registro");
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="m-5 d-flex align-items-center flex-column"
        >
            <div className="col-8 d-flex align-items-center flex-column">
                <h1>Cadastro de Registro</h1>

                {/* Descrição */}
                <input
                    className="form-control m-2"
                    placeholder="Descrição"
                    autoComplete="off"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                {/* Data */}
                <input
                    className="form-control m-2"
                    type="date"
                    autoComplete="off"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />

                {/* Valor */}
                <input
                    className="form-control m-2"
                    type="number"
                    placeholder="Valor"
                    autoComplete="off"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                />

                {/* Categoria */}
                <select
                    className="form-control m-2"
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                    <option value="" disabled>Selecione a categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.name} | {categoria.type ? "Entrada" : "Saída"}
                        </option>
                    ))}
                </select>

                {/* Checkbox de pagamento / recebimento */}
                <div className="form-check m-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="paidCheckbox"
                        checked={form.paid === "1"}
                        onChange={(e) =>
                            setForm({ ...form, paid: e.target.checked ? "1" : "0" })
                        }
                    />

                    <label className="form-check-label" htmlFor="paidCheckbox">
                        Valor já pago / recebido
                    </label>
                </div>

                <button className="btn btn-primary m-1">
                    {id ? "Atualizar" : "Cadastrar"}
                </button>
            </div>
        </form>
    );
}
