import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import api from "../../api";

export default function ValoresAno() {
    const [valores, setValores] = useState([]);
    const [valorTotal, setValorTotal] = useState();

    const carregarValores = async () => {
        const resposta = await api.get("/record/valores-anos/");
        const dados = resposta.data;
        setValores(dados);

        const totalEntradas = dados.reduce((acc, item) => acc + Number(item.entradas), 0);
        const totalGastos = dados.reduce((acc, item) => acc + Number(item.gastos), 0);

        setValorTotal(totalEntradas - totalGastos);
    };

    useEffect(() => {
        async function fetch() {
            await carregarValores();
        }
        fetch();
    }, []);

    return (
        <div className="m-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-primary text-white text-center">
                    <h5 className="mb-0">Resumo por Ano</h5>
                </div>

                <div className="card-body p-0">
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="text-center">Ano</th>
                                <th className="text-center">Entrada</th>
                                <th className="text-center">Saída</th>
                                <th className="text-center">Resultado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {valores.map((valor) => (
                                <tr key={valor.ano}>
                                    <td className="text-center fw-semibold">{valor.ano}</td>
                                    <td className="text-success text-center fw-bold">
                                        R$ {Number(valor.entradas).toFixed(2)}
                                    </td>
                                    <td className="text-danger text-center fw-bold">
                                        R$ {Number(valor.gastos).toFixed(2)}
                                    </td>
                                    <td className="text-secondary text-center fw-bold">
                                        R$ {Number((Number(valor.entradas).toFixed(2)) - (Number(valor.gastos).toFixed(2))).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                                <tr>
                                    <td className="text-end fw-semibold" colSpan={3}>Total:</td>
                                    <td className="text-center fw-semibold">R$ {Number(valorTotal).toFixed(2)}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}