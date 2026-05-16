import { useState } from "react";
import { User, Phone, Package, FileText, Send } from "lucide-react";
import "./Form.css";
import { FaWhatsapp } from "react-icons/fa"
import LogotipoMultimpulsoSvg from "../assets/logotipo-multimpulso-escuro.svg"
const API_URL = "http://localhost:8000/api/contato";

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

export default function Form() {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    produto_servico: "",
    participou_licitacoes: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.participou_licitacoes) {
      setShowLicitacaoHint(true);
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.sucesso) {
        setStatus("success");
        setFormData({ nome: "", whatsapp: "", produto_servico: "", participou_licitacoes: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
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
                placeholder="ex: Vendo uniformes profissionais para empresas"
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

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Enviando…" : <><Send size={16} />Quero minha análise gratuita</>}
          </button>

          {status === "success" && (
            <p className="msg msg-success">Mensagem enviada com sucesso!</p>
          )}
          {status === "error" && (
            <p className="msg msg-error">Erro ao enviar. Tente novamente.</p>
          )}
        </form>
      </div >
    </div >
  );
}
