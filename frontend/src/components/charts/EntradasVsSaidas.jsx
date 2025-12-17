import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import api from "../../api";

export default function EntradasVsSaidas () {
    const [anosRegistrados, setAnosRegistrados] = useState([]);
    const [ano, setAno] = useState(2025);
    const [dadosAno, setDadosAno] = useState([]);

    const meses = [
        "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const handleAno = (e) => {
        const novoAno = e.target.value;
        setAno(Number(novoAno));
        carregarAno(Number(novoAno));
    };

    const carregarAno = async (ano) => {
        const resposta = await api.get(`/record/valores-mensais-ano/${ano}/`);
        
        const grafico = resposta.data.map(item => ({
            name: meses[item.mes],
            gastos: item.gastos,
            entradas: item.entradas,
        }));

        setDadosAno(grafico);
    };

    const carregarAnos = async () => {
        const resposta = await api.get(`/record/anos-informados/`);
        console.log(resposta.data);
        setAnosRegistrados(resposta.data);
    }

    useEffect(() => {
        async function load() {
            await carregarAnos();
            await carregarAno(ano);
        }
        load();
    }, []);

    return (
        <div>
            <LineChart width={500} height={300} data={dadosAno}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="gastos" stroke="#e21c1cff" strokeWidth={3} />
                <Line type="monotone" dataKey="entradas" stroke="#0714caff" strokeWidth={3} />
            </LineChart>

            <div>
                <label htmlFor="ano">Ano</label>
                <select value={ano} onChange={handleAno} id="ano" className="form-control m-2">
                    {anosRegistrados.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
