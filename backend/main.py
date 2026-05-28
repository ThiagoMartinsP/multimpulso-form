import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from src.controller.ContatoController import ContatoController
from src.infrastructure.repository.RepositorioFalso import RepositorioFalso
from src.infrastructure.notification.TelegramNotificacaoService import TelegramNotificacaoService

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Multimpulso API", version="1.0.0", docs_url=None, redoc_url=None)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

contatoController = ContatoController(
    limiter=limiter,
    repository=RepositorioFalso(),
    notificacao=TelegramNotificacaoService()
)
app.include_router(contatoController.router)


@app.get("/")
def health_check():
    return {"status": "ok"}