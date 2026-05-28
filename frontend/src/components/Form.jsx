import { useState } from "react";
import { User, Package, FileText } from "lucide-react";
import "./Form.css";
import { FaWhatsapp } from "react-icons/fa"
import LogotipoMultimpulsoSvg from "../assets/logotipo-multimpulso-escuro.svg"
const API_URL = "/api/contato";

// PREENCHA: número da empresa, só dígitos (55 + DDD + número).
const WHATSAPP_NUMERO = "5521993364221";

// AJUSTE o texto-base da mensagem. Os dados do lead chegam em `dados`.
function montarLinkWhatsapp(dados) {
  const mensagem = `Olá! Sou ${dados.nome.split(' ')[0]}, preenchi o formulário e tenho interesse na análise de licitações para meu negócio.`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

const LICITACAO_OPTIONS = [
  "Nunca participou.",
  "Sim, mas sem sucesso.",
  "Sim, mas gostaria de aumentar o faturamento.",
];

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const INITIAL_FORM = {
  nome: "",
  whatsapp: "",
  produto_servico: "",
  participou_licitacoes: "",
  website: "",
};

export default function Form() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showLicitacaoHint, setShowLicitacaoHint] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "whatsapp") {
      setFormData((prev) => ({ ...prev, whatsapp: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleOption(value) {
    setFormData((prev) => ({ ...prev, participou_licitacoes: value }));
    setShowLicitacaoHint(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.participou_licitacoes) {
      setShowLicitacaoHint(true);
      return;
    }
    // não espera o backend; keepalive mantém a requisição viva mesmo após a navegação pro WhatsApp
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      keepalive: true,
    }).catch(() => {});
    window.location.href = montarLinkWhatsapp(formData);
  }

  return (
    <div className="form-card">

      <div className="card-header">
        <div className="logotipo">
          <img src={LogotipoMultimpulsoSvg}></img>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #7a8c85' }} />
        <header class="body-header">
          <p class="eyebrow">
            Análise gratuita
          </p>
          <h3 class="headline">
            Sua empresa tem potencial no mercado de licitações?
          </h3>
          <p class="subheadline">
            Preencha o formulário e receba uma análise gratuita sobre as oportunidades de licitação para o seu negócio.
          </p>
        </header>
        <p className="card-tagline"></p>
      </div>

      <div className="card-body">
        <form className="contact-form" onSubmit={handleSubmit}>

          {/* Nome label */}
          <div className="form-group">
            <label htmlFor="nome" className="icon-title-input">
              <User size={16} />
              <p>Nome</p>
            </label>
            <div className="input-wrapper">
              <input
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* WhatsApp label*/}
          <div className="form-group">
            <label htmlFor="whatsapp" className="icon-title-input">
              <FaWhatsapp size={16} />
              <p>WhatsApp</p>
            </label>
            <div className="input-wrapper">
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                placeholder="(21) 99999-0000"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Produto/serviço label */}
          <div className="form-group">
            <label htmlFor="produto_servico" className="icon-title-input">
              <Package size={16} />
              <p>Qual o produto ou serviço que sua empresa oferece?</p>
            </label>
            <div className="input-wrapper">
              <input
                id="produto_servico"
                name="produto_servico"
                type="text"
                required
                placeholder="ex: Papelaria"
                value={formData.produto_servico}
                onChange={handleChange}
              />
            </div>
            <p className="field-hint">
              Cada análise é preparada do zero para o seu negócio. Com essa
              informação, já chegamos com oportunidades reais levantadas
              especificamente para o seu produto/serviço.
            </p>
          </div>

          {/* Empresa já participou de licitações label*/}
          <div className="form-group">
            <label htmlFor="participacao-licitacoes" className="icon-title-input">
              <FileText size={16} />
              <p>Sua empresa já participou de licitações?</p>
            </label>
            <div className="options-group">
              {LICITACAO_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`option-card${formData.participou_licitacoes === option ? " selected" : ""}`}
                  onClick={() => handleOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {showLicitacaoHint && (
              <p className="field-hint field-hint--error">Selecione uma opção para continuar.</p>
            )}
          </div>

          <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit btn-whatsapp">
            <FaWhatsapp size={18} />Quero minha análise no WhatsApp
          </button>
        </form>
      </div >
    </div >
  );
}
