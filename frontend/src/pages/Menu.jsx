import { Link } from "react-router-dom"

export default function Menu() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">Finanças Pessoais</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/records/list">Registro</Link>
                    <Link className="nav-link" to="/categories/list">Categorias</Link>
                    <button
                        className="btn btn btn-danger"
                        onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                        }}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    )
}