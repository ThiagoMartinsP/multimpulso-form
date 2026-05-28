from src.infrastructure.repository.IContatoRepository import IContatoRepository
from src.infrastructure.entity.ContatoPayload import ContatoPayload

class RepositorioFalso(IContatoRepository):
    def add(self, contato: ContatoPayload) -> None:
        pass