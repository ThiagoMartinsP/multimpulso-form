from abc import ABC, abstractmethod
from src.infrastructure.entity.ContatoPayload import ContatoPayload

class INotificacaoService(ABC):

    @abstractmethod
    def enviar(self, contato: ContatoPayload) -> None:
        ...
