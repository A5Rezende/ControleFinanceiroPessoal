/**
 * Componente responsável pela listagem dos registros financeiros do usuário.
 *
 * Funcionalidades:
 * - Listar registros de entrada e saída
 * - Filtrar por ano, mês, tipo, categoria e status de pagamento
 * - Marcar registros como pagos
 * - Editar e excluir registros
 *
 * Projeto: Controle Financeiro Pessoal
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

// Lista de meses para exibição no select e na tabela
const mesesRegistrados = [
    "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function List() {

    // Lista de registros retornados pelo backend
    const [registros, setRegistros] = useState([]);

    // Controle de filtro por data (ano e mês)
    const [data, setData] = useState({ ano: 0, mes: 0 });
    
    // Anos e meses disponíveis nos registros do usuário
    const [anosRegistrados, setAnosRegistrados] = useState([]);
    const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
    
    // Estados dos filtros adicionais da página
    const [tipo, setTipo] = useState(2); // 0 = saída | 1 = entrada | 2 = todos
    const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
    const [categoria, setCategoria] = useState(0);
    const [pagamento, setPagamento] = useState(0); // 0 = todos | 1 = pago | 2 = não pago

    // Formata a data vinda da API (YYYY-MM-DD) para o padrão brasileiro (DD/MM/YYYY)
    function formatarData(dataISO) {
        if (!dataISO) return "-";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    // Busca os anos que possuem registros cadastrados
    const carregarAnos = async () => {
        const resposta = await api.get("/record/anos-informados/");
        setAnosRegistrados(resposta.data);
    };

    // Busca os meses disponíveis para o ano selecionado no filtro
    const carregarMeses = async (ano) => {
        const resposta = await api.get(`/record/meses-informados/${ano}/`);
        setMesesDisponiveis(resposta.data);
    };

    // Busca as categorias de acordo com o tipo selecionado (entrada ou saída)
    const carregarCategorias = async (tipo) => {
        const resposta = await api.get(`/category/categorias-tipo/${tipo}/`);
        setCategoriasDisponiveis(resposta.data);
    };

    // Carrega os registros vindos da API e ordena por data (mais recente primeiro)
    const carregarRegistros = async () => {
        const resposta = await api.get("/record/");
        const listaOrdenada = [...resposta.data]
            .sort((b, a) => a.date.localeCompare(b.date));
        setRegistros(listaOrdenada);
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
            await carregarRegistros();
            await carregarAnos();
        }
        fetch();
    }, []);

    // Atualiza os meses disponíveis quando o ano muda
    useEffect(() => {
        async function fetch() { 
            if (data.ano === 0) { 
                setMesesDisponiveis([]); 
                setData(prev => ({ ...prev, mes: 0 })); 
                return; 
            } 
            carregarMeses(data.ano); 
        } 
        fetch();
    }, [data.ano]);

    // Atualiza as categorias quando o tipo muda
    useEffect(() => {
        async function fetch() { 
            setCategoriasDisponiveis([]); 
            carregarCategorias(tipo); 
        } 
        fetch();
    }, [tipo]);

    // Remove um registro após confirmação do usuário
    const deletar = async (id) => {
        if (window.confirm("Você tem certeza que deseja excluir?")) {
            await api.delete(`/record/${id}/`);
            carregarRegistros();
        }
    };

    // Marca um registro como pago
    const pagar = async (id) => {
        const registro = registros.find(r => r.id === id);

        const novoRegistro = {
            ...registro,
            category_id: registro.category.id,
            paid: true,
        };

        await api.put(`/record/${id}/`, novoRegistro);
        carregarRegistros();
    };

    // Aplica os filtros selecionados pelo usuário sobre a lista de registros
    const registrosFiltrados = registros.filter((registro) => {
        const dataRegistro = new Date(registro.date);

        // Filtro por ano
        if (data.ano !== 0 && dataRegistro.getFullYear() !== data.ano) return false;

        // Filtro por mês
        if (data.mes !== 0 && dataRegistro.getMonth() + 1 !== data.mes) return false;

        // Filtro por tipo (entrada / saída)
        if (tipo !== 2 && registro.category.type !== Boolean(tipo)) return false;

        // Filtro por categoria
        if (categoria !== 0 && registro.category.id !== categoria) return false;

        // Filtro por status de pagamento
        if (pagamento !== 0) {
            const isPago = registro.paid === true;
            if ((pagamento === 1 && !isPago) || (pagamento === 2 && isPago)) return false;
        }

        return true;
    });

    return (
        <div className="container">
            <div className="m-5 row">
                <div className="col-3"></div>
                <div className="col-6 d-flex align-items-center flex-column">
                    <h1>Listar Registros</h1>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                    <Link className="btn btn-primary m-1" to="/records/show">Criar</Link>
                </div>
            </div>

            <div className="row">
                <div className="col-2 text-center">
                    <label className="fw-bold">Ano:</label>
                    <select
                        className="form-control m-2"
                        onChange={(e) =>
                            setData(prev => ({ ...prev, ano: Number(e.target.value), mes: 0 }))
                        }
                    >
                        <option value="0">Todos</option>
                        {anosRegistrados.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>

                <div className="col-2 text-center">
                    <label className="fw-bold">Mês:</label>
                    <select
                        className="form-control m-2"
                        value={data.mes}
                        onChange={(e) =>
                            setData(prev => ({ ...prev, mes: Number(e.target.value) }))
                        }
                        disabled={data.ano === 0}
                    >
                        <option value="0">Todos</option>
                        {mesesDisponiveis.map((m) => (
                            <option key={m} value={m}>
                                {mesesRegistrados[m]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-2 text-center">
                    <label className="fw-bold">Tipo:</label>
                    <select
                        className="form-control m-2"
                        onChange={(e) => {
                            setTipo(Number(e.target.value));
                            setCategoria(0);
                        }}
                    >
                        <option value="2">Todos</option>
                        <option value="1">Entrada</option>
                        <option value="0">Saída</option>
                    </select>
                </div>

                <div className="col-2 text-center">
                    <label className="fw-bold">Categoria:</label>
                    <select
                        className="form-control m-2"
                        onChange={(e) => setCategoria(Number(e.target.value))}
                    >
                        <option value="0">Todas</option>
                        {categoriasDisponiveis.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-2 text-center">
                    <label className="fw-bold">Pagamento:</label>
                    <select
                        className="form-control m-2"
                        onChange={(e) => setPagamento(Number(e.target.value))}
                    >
                        <option value="0">Todos</option>
                        <option value="1">Sim</option>
                        <option value="2">Não</option>
                    </select>
                </div>

                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button
                        className="btn btn-sm btn-secondary m-1"
                        onClick={() => {
                            setData({ ano: 0, mes: 0 });
                            setTipo(2);
                            setCategoria(0);
                            setPagamento(0);
                        }}
                    >
                        Limpar Filtros
                    </button>
                </div>
            </div>

            <div className="row mt-5">
                <div className="card-body d-flex justify-content-center">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Categoria</th>
                                <th>Pagamento / Recebimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrosFiltrados.map((registro) => (
                                <tr key={registro.id} className="text-center">
                                    <td>{registro.name}</td>
                                    <td>{registro.value}</td>
                                    <td>{formatarData(registro.date)}</td>
                                    <td>
                                        {registro.category.type ? (
                                            <span className="badge bg-success">Entrada</span>
                                        ) : (
                                            <span className="badge bg-danger">Saída</span>
                                        )}
                                    </td>
                                    <td>{registro.category.name}</td>
                                    <td>
                                        {registro.paid ? (
                                            <span className="badge bg-success">Sim</span>
                                        ) : (
                                            <span className="badge bg-danger">Não</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                className="btn btn-sm btn-primary m-1"
                                                to={`/records/show/${registro.id}`}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-success m-1"
                                                onClick={() => pagar(registro.id)}
                                            >
                                                Pagar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger m-1"
                                                onClick={() => deletar(registro.id)}
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
