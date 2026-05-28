from abc import ABC, abstractmethod
from src.infrastructure.entity.ContatoPayload import ContatoPayload

class IContatoRepository(ABC):

    @abstractmethod
    def add(self, contato: ContatoPayload) -> None:
        pass