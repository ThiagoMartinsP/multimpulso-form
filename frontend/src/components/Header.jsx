import "./Header.css";
import LogotipoMultimpulsoSvg from "../assets/logotipo-multimpulso-escuro.svg"

export default function Header() {
    return (
        <header className="card-header">
            <div className="logotipo">
                <img src={LogotipoMultimpulsoSvg} alt="Multimpulso" />
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #7a8c85' }} />
            <div className="body-header">
                <p className="eyebrow">
                    Análise gratuita
                </p>
                <h3 className="headline">
                    Descubra o potencial do seu negócio no mercado público
                </h3>
                <p className="subheadline">
                    Preencha o formulário e receba uma análise gratuita — mapeamos ao vivo as oportunidades do seu segmento com um especialista em contratações públicas.
                </p>
            </div>
        </header>
    )
}