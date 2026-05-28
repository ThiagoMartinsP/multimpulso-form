from pydantic import BaseModel, Field
from typing import Optional, Literal

class ContatoPayload(BaseModel):
    nome: str = Field(min_length=2, max_length=100)
    whatsapp: str = Field(pattern=r"^\(\d{2}\)\s\d{4,5}-\d{4}$")
    produto_servico: str = Field(min_length=5, max_length=500)
    participou_licitacoes: Optional[Literal[
        "Nunca participou.",
        "Sim, mas sem sucesso.",
        "Sim, mas gostaria de aumentar o faturamento.",
    ]] = None
    website: str = Field(default="", max_length=200)  # honeypot anti-spam