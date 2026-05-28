import os
import httpx
from src.infrastructure.entity.ContatoPayload import ContatoPayload
from src.infrastructure.notification.INotificacaoService import INotificacaoService

class TelegramNotificacaoService(INotificacaoService):

    def __init__(self):
        self._token = os.getenv("TELEGRAM_TOKEN")
        self._chat_id_Thiago = os.getenv("TELEGRAM_CHAT_ID_THIAGO")
        self._chat_id_Yuri = os.getenv("TELEGRAM_CHAT_ID_YURI")
        self._chat_id = os.getenv("TELEGRAM_CHAT_ID_GROUP")
        self._api_url = f"https://api.telegram.org/bot{self._token}/sendMessage"

    def enviar(self, contato: ContatoPayload) -> None:
        mensagem = (
            f"📋 Novo contato!\n"
            f"👤 Nome: {contato.nome}\n"
            f"📱 WhatsApp: {contato.whatsapp}\n"
            f"🏢 Produto/Serviço: {contato.produto_servico}\n"
            f"📄 Licitações: {contato.participou_licitacoes}"
        )
        httpx.post(self._api_url, json={
            "chat_id": self._chat_id,
            "text": mensagem
        })
