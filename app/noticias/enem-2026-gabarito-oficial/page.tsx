import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
 title: 'ENEM 2026: Inep ainda não divulgou o gabarito oficial | TV Voz de Brasília',
 description: 'Veja quando o Inep divulgará o gabarito oficial do ENEM 2026 e como conferir as respostas do caderno correto.',
 alternates: { canonical: 'https://www.vozdebrasilia.com.br/noticias/enem-2026-gabarito-oficial' }
};
export default function Enem2026Gabarito() {
 return <div className="min-h-screen bg-slate-50"><Header /><main className="mx-auto max-w-4xl px-5 py-12 text-slate-900">
 <span className="text-sm font-extrabold uppercase tracking-wider text-blue-700">TV VOZ DE BRASÍLIA • EDUCAÇÃO • 8 DE NOVEMBRO DE 2026</span>
 <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">ENEM 2026: gabarito oficial ainda não foi divulgado pelo Inep</h1>
 <p className="mt-6 text-xl leading-relaxed text-slate-700">O primeiro dia do Exame Nacional do Ensino Médio terminou neste domingo, 8 de novembro. Apesar da circulação de correções extraoficiais, o Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep) ainda não publicou seu gabarito oficial.</p>
 <div className="my-8 rounded-xl border-l-8 border-amber-500 bg-amber-50 p-6"><strong>Situação verificada em 8 de novembro:</strong> o gabarito oficial ainda não foi publicado. O Inep prevê divulgar os arquivos até o décimo dia útil após o segundo dia do exame, marcado para 15 de novembro. A previsão de data-limite é 30 de novembro, sem dia exato confirmado.</div>
 <h2 className="mt-10 text-2xl font-bold">O que foi aplicado no primeiro dia?</h2><p className="mt-3 leading-relaxed">Os candidatos fizeram questões de Linguagens, Códigos e suas Tecnologias, Ciências Humanas e suas Tecnologias, além da redação. A aplicação regular terminou às 19h, horário de Brasília. MEC e Inep programaram divulgação de balanço preliminar.</p>
 <h2 className="mt-9 text-2xl font-bold">Como consultar quando o gabarito sair?</h2><p className="mt-3 leading-relaxed">Confira primeiro a cor do seu caderno de questões e a opção de língua estrangeira escolhida, inglês ou espanhol. A ordem das perguntas muda entre versões. Só use o gabarito publicado pelo Inep para uma conferência oficial.</p>
 <h2 className="mt-9 text-2xl font-bold">Segundo domingo: 15 de novembro</h2><p className="mt-3 leading-relaxed">A próxima prova terá 45 questões de Matemática e 45 de Ciências da Natureza. Os portões fecham às 13h e o exame começa às 13h30, horário de Brasília.</p>
 <h2 className="mt-9 text-2xl font-bold">Quantidade de acertos não equivale à nota</h2><p className="mt-3 leading-relaxed">A nota das provas objetivas utiliza a Teoria de Resposta ao Item (TRI), e não somente a contagem de acertos. Os resultados individuais serão divulgados posteriormente nos canais oficiais.</p>
 <p className="mt-10 border-t pt-5 text-sm text-slate-600"><strong>Apuração própria da TV Voz de Brasília.</strong> Fontes oficiais: comunicados do Inep de 08/11/2026 sobre a conclusão do primeiro dia, o segundo dia de provas e as perguntas frequentes do exame. Esta reportagem será atualizada após a divulgação do gabarito oficial.</p>
 <Link href="/" className="mt-7 inline-block rounded-xl bg-blue-900 px-5 py-3 font-bold text-white">Voltar à capa da TV Voz de Brasília</Link>
 </main><Footer /></div>
}