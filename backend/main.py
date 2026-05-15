import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel

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
    whatsapp: str
    produto_servico: str
    participou_licitacoes: Optional[str] = None


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
