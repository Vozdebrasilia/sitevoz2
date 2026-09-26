export default function TerracapBanner() {
  const href = "https://www.terracap.df.gov.br/index.php/compre-imoveis/licitacoes/listagem-compre-imoveis-licitacao/344-edital-de-licitacao-13-2026-venda-de-imoveis?utm_source=voz_de_brasilia&utm_medium=paid&utm_campaign=2026_edital_13_2026___licitacao&utm_content=br_alcance_cpm_728x90_geral_ncl2026ed13-cap004";
  return (
    <div className="w-full bg-white border-b border-gray-100 py-2">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-[9px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-1">Publicidade</div>
        <a href={href} target="_blank" rel="noopener noreferrer sponsored" aria-label="Terracap - Edital 13/2026">
          <img src={"/publicidade/terracap-edital-13-2026.jpg"} alt="Terracap - Edital 13/2026" width="1456" height="180" className="block w-full max-w-[1200px] min-h-[120px] md:min-h-[150px] object-cover object-center mx-auto" />
        </a>
      </div>
    </div>
  );
}
