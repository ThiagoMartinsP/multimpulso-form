import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

load_dotenv()

app = FastAPI(title="Multimpulso API", version="1.0.0")

# ---------------------------------------------------------------------------
# CORS — libera o domínio do frontend (definido em .env)
# ---------------------------------------------------------------------------
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Modelos Pydantic
# ---------------------------------------------------------------------------
class ContatoPayload(BaseModel):
    nome: str
    email: str
    mensagem: str


# ---------------------------------------------------------------------------
# Rotas
# ---------------------------------------------------------------------------
@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/api/contato")
def criar_contato(payload: ContatoPayload):
    # TODO: salvar no banco, enviar e-mail, etc.
    return {"sucesso": True}
