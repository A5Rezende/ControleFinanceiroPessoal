import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import api from "../../api";

const mesesRegistrados = [
    "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Categorias() {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [anosRegistrados, setAnosRegistrados] = useState([]);
    const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
    const [ano, setAno] = useState(2026);
    const [mes, setMes] = useState(1);
    const [colors, setColors] = useState([]);

    const gerarCores = (quantidade) =>
        Array.from({ length: quantidade }, (_, i) =>
            `hsl(${(i * 360) / quantidade}, 70%, 50%)`
        );

    const carregarMeses = async (ano) => {
        const resposta = await api.get(`/record/meses-informados/${ano}/`);
        setMesesDisponiveis(resposta.data);
        return resposta.data;
    };

    const carregarCategorias = async (ano, mes) => {
        const resposta = await api.get(`/record/categorias-mes/${ano}/${mes}/`);

        setEntradas(resposta.data.entradas);
        setSaidas(resposta.data.saidas);

        const qtd = Math.max(
            resposta.data.entradas.length,
            resposta.data.saidas.length
        );

        setColors(gerarCores(qtd));
    };

    const handleAno = async (e) => {
        const novoAno = Number(e.target.value);
        setAno(novoAno);

        const meses = await carregarMeses(novoAno);

        const novoMes = meses.includes(mes) ? mes : meses[0];

        setMes(novoMes);
        carregarCategorias(novoAno, novoMes);
    };

    const handleMes = (e) => {
        const novoMes = Number(e.target.value);
        setMes(novoMes);
        carregarCategorias(ano, novoMes);
    };

    const carregarAnos = async () => {
        const resposta = await api.get(`/record/anos-informados/`);
        setAnosRegistrados(resposta.data);
    };

    useEffect(() => {
        async function load() {
            await carregarAnos();
            await carregarMeses(ano);
            await carregarCategorias(ano, mes);
        }
        load();
    }, []);

    return (
        <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
            
            {/* Gráfico de Entradas */}
            <div style={{ textAlign: "center" }}>
                <h3>Entradas</h3>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="total"
                        nameKey="categoria"
                        data={entradas}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {entradas.map((_, index) => (
                            <Cell key={index} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            {/* Gráfico de Saídas */}
            <div style={{ textAlign: "center" }}>
                <h3>Saídas</h3>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="total"
                        nameKey="categoria"
                        data={saidas}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {saidas.map((_, index) => (
                            <Cell key={index} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            {/* Filtros */}
            <div>
                <label>Ano</label>
                <select value={ano} onChange={handleAno} className="form-control m-2">
                    {anosRegistrados.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>

                <label>Mês</label>
                <select value={mes} onChange={handleMes} className="form-control m-2">
                    {mesesDisponiveis.map((m) => (
                        <option key={m} value={m}>
                            {mesesRegistrados[m]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}