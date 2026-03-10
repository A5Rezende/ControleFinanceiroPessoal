# 📊 Controle Financeiro Pessoal

Sistema web para **controle financeiro pessoal**, permitindo o gerenciamento de **entradas, saídas, categorias e pagamentos**, com visualização de dados organizada por período.

Projeto desenvolvido com **backend em Django REST Framework** e **frontend em React**, seguindo boas práticas de organização, autenticação e consumo de API.

---

## 🚀 Funcionalidades

### 👤 Autenticação

* Cadastro de usuário
* Login com JWT
* Proteção de rotas autenticadas

### 💰 Registros Financeiros

* Cadastro de entradas e saídas
* Edição e exclusão de registros
* Marcação de registros como pagos / recebidos
* Filtros por:

  * Ano
  * Mês
  * Tipo (Entrada / Saída)
  * Categoria
  * Status de pagamento

### 🏷️ Categorias

* Cadastro de categorias
* Separação por tipo (Entrada ou Saída)
* Edição e exclusão
* Filtro por tipo

### 📈 Relatórios

* Anos com registros disponíveis
* Meses disponíveis por ano
* Totais mensais de entradas e gastos
* Totais por categoria em um determinado mês

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Python
* Django
* Django REST Framework
* JWT (SimpleJWT)
* PostgreSQL
* django-cors-headers
* python-decouple

### Frontend

* React
* React Router
* Axios
* Bootstrap

---

## 🏗️ Arquitetura

Frontend (React)
↓
API REST (Django REST Framework)
↓
PostgreSQL

---

## 📁 Estrutura do Projeto

```text
CONTROLEFINANCEIROPESSOAL/
├── backend/
│   ├── categories/
│   ├── records/
│   ├── users/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## ⚙️ Conceitos aplicados

- Autenticação JWT
- Consumo de API REST
- Filtros dinâmicos no backend
- Organização modular no Django
- Separação frontend/backend
- Gerenciamento de estado no React

---

## ⚙️ Como Rodar o Projeto Localmente

### 🔹 Backend

```bash
# Acesse a pasta do backend
cd backend

# Crie o ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Rode as migrações
python manage.py migrate

# Inicie o servidor
python manage.py runserver
```

---

### 🔹 Frontend

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

## 🎥 Demonstração

📌 **Vídeo de apresentação do projeto:**
*https://www.loom.com/share/1d5d1f8fb0754ff9aa4839e702b7660f*


📌 **Vídeo de apresentação do codigo:**

*Frontend:*
*https://www.loom.com/share/5519d975f7d748b188a55fcd8f43ebe0*

*Backend:*
*https://www.loom.com/share/08ef19fa41f44505b1e1bf49bd463e57*

---

## 📌 Observações

* O projeto foi desenvolvido com foco em **organização, clareza de código e boas práticas**.
* Todo o backend utiliza autenticação JWT.
* O frontend consome a API de forma desacoplada.
* Código comentado para facilitar manutenção e estudo.

---

## 👨‍💻 Autor

**Antônio Gabriel Cardoso de Rezende Orlandini**

* Desenvolvedor Full Stack
* Backend: Python / Django / PHP / Laravel
* Frontend: JavaScript / React 
* Banco de Dados: PostgreSQL / MySQL / MongoDB

📫 *Entre em contato pelo GitHub ou LinkedIn*

---

## ⭐ Considerações Finais

Este projeto faz parte do meu portfólio pessoal e foi desenvolvido com o objetivo de **praticar arquitetura full stack, autenticação, filtros avançados e relatórios financeiros**.
