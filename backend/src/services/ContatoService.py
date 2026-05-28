from src.infrastructure.repository.IContatoRepository import IContatoRepository
from src.infrastructure.notification.INotificacaoService import INotificacaoService
from src.infrastructure.entity.ContatoPayload import ContatoPayload


class ContatoService:
    def __init__(self, repository: IContatoRepository, notificacao: INotificacaoService):
        self.repository = repository
        self.notificacao = notificacao

    def salvarContato(self, payload: ContatoPayload) -> None:
        self.repository.add(payload)
        self.notificacao.enviar(payload)