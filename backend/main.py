import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from typing import Literal, Optional
from pydantic import BaseModel, Field

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Multimpulso API", version="1.0.0", docs_url=None, redoc_url=None)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
    nome: str = Field(min_length=2, max_length=100)
    whatsapp: str = Field(pattern=r"^\(\d{2}\)\s\d{4,5}-\d{4}$")
    produto_servico: str = Field(min_length=5, max_length=500)
    participou_licitacoes: Optional[Literal[
        "Nunca participou.",
        "Sim, mas sem sucesso.",
        "Sim, mas gostaria de aumentar o faturamento.",
    ]] = None
    website: str = Field(default="", max_length=200)  # honeypot


# ---------------------------------------------------------------------------
# Rotas
# ---------------------------------------------------------------------------
@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/api/contato")
@limiter.limit("5/minute")
def criar_contato(request: Request, payload: ContatoPayload):
    if payload.website:
        return {"sucesso": True}
    # TODO: salvar no banco, enviar e-mail, etc.
    return {"sucesso": True}
