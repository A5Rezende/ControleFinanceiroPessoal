import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Meu Financeiro
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Cadastro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO / TELA PRINCIPAL */}
      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Controle Financeiro Pessoal</h1>
          <p className="lead mt-3">
            Organize, monitore e gerencie suas finanças de forma simples e eficiente.
          </p>

          <div className="mt-4">
            <Link className="btn btn-primary btn-lg mx-2" to="/login">
              Entrar no Sistema
            </Link>
            <Link className="btn btn-outline-primary btn-lg mx-2" to="/register">
              Criar Conta
            </Link>
          </div>
        </div>
      </header>

      {/* SEÇÃO DE BENEFÍCIOS */}
      <section className="container my-5">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">📊 Relatórios Automáticos</h5>
                <p>Analise entradas, saídas e resultados por mês e ano com gráficos e tabelas.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">💰 Controle Detalhado</h5>
                <p>Registre gastos, categorias e acompanhe sua evolução financeira em tempo real.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">🔒 Segurança e Privacidade</h5>
                <p>Seus dados protegidos com autenticação e camadas modernas de segurança.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-primary text-white py-3 text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Meu Financeiro — Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
