import { useState } from "react";
import { User, Phone, Package, FileText } from "lucide-react";
import "./Form.css";
import { FaWhatsapp } from "react-icons/fa"

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
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
        <div className="brand">
          <span className="brand-mult">Mult</span>
          <span className="brand-impulso">impulso</span>
        </div>
        <p className="card-tagline">Reunião de 30 minutos · sem compromisso</p>
      </div>

      <div className="card-body">
        <h2 className="form-title">Diagnóstico gratuito de licitações</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <div className="input-wrapper">
              <User size={16} className="input-icon" />
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

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp</label>
            <div className="input-wrapper">
              <FaWhatsapp size={16} className="input-icon" />
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

          <div className="form-group">
            <label htmlFor="produto_servico">
              Qual o produto ou serviço que sua empresa oferece?
            </label>
            <div className="input-wrapper">
              <Package size={16} className="input-icon" />
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
              Cada reunião é preparada do zero para o seu negócio. Com essa
              informação, já chegamos com oportunidades reais levantadas
              especificamente para o seu produto/serviço.
            </p>
          </div>

          <div className="form-group">
            <label className="group-label">
              <FileText size={16} />
              Sua empresa já participou de licitações?
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
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Enviando…" : "Enviar"}
          </button>

          {status === "success" && (
            <p className="msg msg-success">Mensagem enviada com sucesso!</p>
          )}
          {status === "error" && (
            <p className="msg msg-error">Erro ao enviar. Tente novamente.</p>
          )}
        </form>
      </div>
    </div>
  );
}
