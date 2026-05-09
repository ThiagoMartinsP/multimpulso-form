import { useState } from "react";
import "./Form.css";

const API_URL = "http://localhost:8000/api/contato";

export default function Form() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      if (!res.ok) throw new Error("Erro na resposta do servidor");

      const data = await res.json();
      if (data.sucesso) {
        setStatus("success");
        setFormData({ nome: "", email: "", mensagem: "" });
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          placeholder="Escreva sua mensagem..."
          value={formData.mensagem}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? "Enviando…" : "Enviar"}
      </button>

      {status === "success" && (
        <p className="msg msg-success">
          ✅ Mensagem enviada com sucesso!
        </p>
      )}
      {status === "error" && (
        <p className="msg msg-error">
          ❌ Erro ao enviar. Tente novamente.
        </p>
      )}
    </form>
  );
}
