import { useEffect, useState } from "react";
import EntradasVsSaidas from "../components/charts/EntradasVsSaidas";
import Categorias from "../components/charts/Categorias";
import ValoresAno from "../components/charts/ValoresAno";
import api from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    const response = await api.get("/profile");
    setUser(response.data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="container my-5">

      {/* TÍTULO */}
      <div className="mb-4 text-center">
        <h1 className="fw-bold">Dashboard Financeiro</h1>
        <p className="text-muted">
          Visualize suas entradas, saídas e categorias de gastos
        </p>
      </div>

      <div className="row g-4">

        {/* ENTRADAS VS SAÍDAS */}
        <div className="col-lg-8 col-md-12">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white fw-semibold">
              📊 Entradas vs Saídas (Mensal)
            </div>
            <div className="card-body d-flex justify-content-center">
              <EntradasVsSaidas />
            </div>
          </div>
        </div>

        {/* RESUMO POR ANO */}
        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white fw-semibold">
              📅 Resumo Anual
            </div>
            <div className="card-body">
              <ValoresAno />
            </div>
          </div>
        </div>

        {/* CATEGORIAS */}
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-warning fw-semibold">
              🧾 Categorias (Entradas e Saídas)
            </div>
            <div className="card-body d-flex justify-content-center">
              <Categorias />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
