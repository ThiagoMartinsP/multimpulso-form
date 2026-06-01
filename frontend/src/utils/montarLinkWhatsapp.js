// número da empresa, só dígitos (55 + DDD + número)
const WHATSAPP_NUMERO = "5521993364221";

export default function montarLinkWhatsapp(dados) {
  const mensagem = `Olá! Sou ${dados.nome.split(' ')[0]}, preenchi o formulário e tenho interesse na análise de licitações para meu negócio.`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
