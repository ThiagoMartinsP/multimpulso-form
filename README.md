# Multimpulso — Fullstack (FastAPI + React)

Projeto fullstack com **FastAPI** no backend e **React + Vite** no frontend, pronto para deploy em VPS com Nginx.

---

## 🚀 Rodando localmente

### Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env          # ajuste as variáveis se necessário
uvicorn main:app --reload     # http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

---

## 🌐 Deploy no VPS (Ubuntu + Nginx)

### 1. Backend — Python + systemd

```bash
# Instalar dependências
sudo apt update && sudo apt install python3 python3-venv python3-pip -y

cd /var/www/projeto/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # configure FRONTEND_URL com o domínio real
```

Crie o serviço systemd em `/etc/systemd/system/projeto-api.service`:

```ini
[Unit]
Description=Multimpulso FastAPI
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/projeto/backend
ExecStart=/var/www/projeto/backend/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
EnvironmentFile=/var/www/projeto/backend/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable projeto-api
sudo systemctl start projeto-api
```

### 2. Frontend — Build do React

```bash
cd /var/www/projeto/frontend
npm install
npm run build                 # gera a pasta dist/
```

### 3. Nginx

```bash
sudo cp nginx/projeto.conf /etc/nginx/sites-available/projeto.conf
sudo ln -s /etc/nginx/sites-available/projeto.conf /etc/nginx/sites-enabled/
sudo nginx -t                 # valida a configuração
sudo systemctl reload nginx
```

> **Dica:** para HTTPS, use o [Certbot](https://certbot.eff.org/) com `sudo certbot --nginx`.

---

## 📁 Estrutura do projeto

```
projeto/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/          (React + Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   │       └── Form.jsx
│   └── ...
├── nginx/
│   └── projeto.conf
├── .gitignore
└── README.md
```
