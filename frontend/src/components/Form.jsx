import { useState } from "react";
import { User, Package, FileText } from "lucide-react";
import "./Form.css";
import { FaWhatsapp } from "react-icons/fa"
import Header from "./Header";
import montarLinkWhatsapp from "../utils/montarLinkWhatsapp";
import formatPhone from "../utils/formatPhone";

import FieldForm from "./FieldForm";
import FieldOptions from "./FieldOptions";
const API_URL = "/api/contato";

const LICITACAO_OPTIONS = [
  "Nunca participamos e não conheço bem o processo.",
  "Ainda não participamos, mas queremos começar.",
  "Já tentamos, mas não tivemos sucesso.",
  "Já vendemos para o governo, mas queremos escalar."
];

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

      <Header />

      <div className="card-body">
        <form className="contact-form" onSubmit={handleSubmit}>

          <FieldForm 
            label="Nome"
            icon={<User size={16} />}
            id="nome"
            name="nome"
            type="text"
            required
            placeholder="Seu nome"
            value={formData.nome}
            onChange={handleChange}
          />

          <FieldForm 
            label="WhatsApp"
            icon={<FaWhatsapp size={16} />}
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="(21) 99999-0000"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <FieldForm
            label="Qual o produto ou serviço que sua empresa oferece?"
            icon={<Package size={16} />}
            id="produto_servico"
            name="produto_servico"
            type="text"
            required
            placeholder="Limpeza, Informática, Engenharia Civil"
            value={formData.produto_servico}
            onChange={handleChange}
            fieldHint="Cada análise é preparada do zero para o seu negócio. Com essa informação, chegamos à nossa conversa com oportunidades reais do seu segmento já mapeadas."
          />

          <FieldOptions
            label="Qual é o momento atual da sua empresa com licitações?"
            icon={<FileText size={16} />}
            options={LICITACAO_OPTIONS}
            selected={formData.participou_licitacoes}
            onSelect={handleOption}
            error={showLicitacaoHint ? "Selecione uma opção para continuar." : null}
          />

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
            <FaWhatsapp size={18} />Quero minha análise gratuita
          </button>
        </form>
      </div >
    </div >
  );
}
