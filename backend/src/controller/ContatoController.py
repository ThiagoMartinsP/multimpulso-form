from fastapi import APIRouter, Request, BackgroundTasks
from slowapi import Limiter
from src.infrastructure.entity.ContatoPayload import ContatoPayload
from src.infrastructure.repository.IContatoRepository import IContatoRepository
from src.infrastructure.notification.INotificacaoService import INotificacaoService
from src.services.ContatoService import ContatoService


class ContatoController:

    def __init__(self, limiter: Limiter, repository: IContatoRepository, notificacao: INotificacaoService):
        self._limiter = limiter
        self.service = ContatoService(repository=repository, notificacao=notificacao)
        self.router = APIRouter(prefix="/api")
        self.router.add_api_route(
            "/contato",
            self._limiter.limit("5/minute")(self.salvarContato),
            methods=["POST"]
        )

    def salvarContato(self, request: Request, payload: ContatoPayload, background_tasks: BackgroundTasks):
        if payload.website:
            return {"sucesso": True}
        background_tasks.add_task(self.service.salvarContato, payload)
        return {"sucesso": True}
