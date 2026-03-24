import { useState } from "react";

const EST = {
  backend:[{item:"Autenticação + RBAC",h:60},{item:"Notificações e regras",h:40},{item:"Upload arquivos/imagens",h:26},{item:"Auditoria e logs",h:21},{item:"API docs + testes",h:50},{item:"CRUDs gerais",h:50},{item:"Dashboards",h:40},{item:"Tickets + Blip",h:75},{item:"KPIs promotores",h:35},{item:"Check-ins / jornada / ponto",h:160},{item:"Localização / live map",h:75},{item:"Infra / DevOps",h:85}],
  admin:[{item:"Auth + permissões",h:40},{item:"CRUDs",h:50},{item:"Dashboard",h:40},{item:"Integração backend",h:34}],
  supervisor:[{item:"Auth + permissões",h:40},{item:"Dashboard",h:25},{item:"Atendimentos",h:40},{item:"Tickets",h:40},{item:"Promotores",h:25},{item:"Notificações",h:20}],
  cliente:[{item:"Auth + permissões",h:40},{item:"Dashboard",h:32},{item:"Book de fotos",h:52},{item:"Tickets + Blip",h:37}],
  app:[{item:"Auth/login",h:60},{item:"Dashboard",h:55},{item:"Push notifications",h:32},{item:"Tickets",h:31},{item:"Produtos a vencer",h:25},{item:"Calendário",h:32},{item:"Início jornada",h:32},{item:"PDVs do dia",h:20},{item:"Deslocamento",h:47},{item:"Ponto + raio",h:47},{item:"Check-in PDV",h:25},{item:"Checklist",h:25},{item:"Diagnóstico PDV",h:42},{item:"Reposição",h:115},{item:"Localização + live map",h:67},{item:"Atividades promotores",h:42}],
};
const TOTALS = { backend:717, admin:164, supervisor:190, cliente:161, app:697 };
const GRAND = 1929, GRAND_MARGIN = 2411;

const SYSTEMS = [
  {
    id:"retaguarda", name:"Retaguarda", sub:"Web · Sistema Unificado",
    color:"#1e3a5f", colorBg:"#eff6ff", colorBorder:"#93c5fd", icon:"RT",
    profiles:[
      {init:"AD",name:"Administrador",  color:"#374151"},
      {init:"SU",name:"Supervisor",     color:"#1e3a5f"},
      {init:"ST",name:"S. Treinamento", color:"#9a3412"},
      {init:"SM",name:"S. Merchandising",color:"#581c87"},
      {init:"SO",name:"S. Operacional", color:"#166534"},
    ],
    tabs:[
      { label:"Administrador", color:"#374151", sections:[
        {title:"Cadastros",     items:["Clientes e contratos","Lojas com geolocalização","Colaboradores e promotores","Produtos e categorias","Campanhas e fluxos","Tipos de atendimento"]},
        {title:"Configurações", items:["Gestão de usuários e RBAC","Raios de geofence por loja","Parâmetros de notificação","Integrações externas","Logs de auditoria"]},
        {title:"Visão Geral",   items:["Dashboard executivo completo","Relatórios consolidados","KPIs por loja e período","Exportação de dados"]},
      ]},
      { label:"Supervisor", color:"#1e3a5f", sections:[
        {title:"Operação",      items:["Dashboard com KPIs da equipe","Atendimentos: alocação e status","Monitoramento de promotores","Mapa ao vivo da equipe","Histórico de visitas"]},
        {title:"Automação",     items:["Roteirização automática (IA)","Alertas inteligentes (IA)","Resumos automáticos (IA)","Notificações em tempo real"]},
        {title:"Comunicação",   items:["Tickets e solicitações","Chat com promotores","Avisos e comunicados"]},
      ]},
      { label:"S. Treinamento", color:"#9a3412", sections:[
        {title:"Treinamento",   items:["Campanhas de capacitação","Acompanhamento individual","Validação Mobiliza (LMS)","Certificações e progresso"]},
        {title:"Relatórios",    items:["Performance por promotor","Histórico de treinamentos","Indicadores de desenvolvimento"]},
      ]},
      { label:"S. Merchandising", color:"#581c87", sections:[
        {title:"Execução",      items:["Monitoramento de gôndola","Execução vs. planograma","Diagnóstico de ruptura","Fotos antes/depois"]},
        {title:"Análise",       items:["Relatórios por categoria","Performance por corredor","Alertas de não conformidade"]},
      ]},
      { label:"S. Operacional", color:"#166534", sections:[
        {title:"Desvios",       items:["Central de desvios e exceções","Validação de check-ins fora do raio","Gestão de justificativas","Histórico de ocorrências"]},
        {title:"Operação",      items:["Resumos automáticos (IA)","Pendências do dia","Relatório de presença"]},
      ]},
    ],
  },
  {
    id:"portal", name:"Portal do Cliente", sub:"Web · Indústria",
    color:"#92400e", colorBg:"#fef9c3", colorBorder:"#fcd34d", icon:"PC",
    profiles:[{init:"CL",name:"Cliente (Indústria)",color:"#92400e"}],
    tabs:[
      { label:"Cliente", color:"#92400e", sections:[
        {title:"Visibilidade",  items:["Visão operacional do dia","Promotores em campo e SLA","PDVs visitados","Fotos registradas"]},
        {title:"Evidências",    items:["Book fotográfico antes/depois","Relatório por atendimento","Histórico de execução","Comparativo por período"]},
        {title:"Comunicação",   items:["Abertura de tickets","Acompanhamento de solicitações","Alertas proativos de ruptura","Notificações de vencimento"]},
      ]},
    ],
  },
  {
    id:"app", name:"App do Promotor", sub:"React Native · Offline-First",
    color:"#166534", colorBg:"#f0fdf4", colorBorder:"#86efac", icon:"AP",
    profiles:[{init:"PV",name:"Promotor de Vendas",color:"#166534"}],
    tabs:[
      { label:"Jornada", color:"#166534", sections:[
        {title:"Planejamento",  items:["Calendário de trabalho","PDVs do dia em ordem otimizada","Deslocamento e mapeamento","Estimativa de chegada"]},
        {title:"Início",        items:["Início de jornada (checklist)","Verificação de EPIs","Check-in com geofence","Justificativa fora do raio"]},
      ]},
      { label:"Execução", color:"#166534", sections:[
        {title:"PDV",           items:["Checklist de entrada","Diagnóstico com fotos antes","Reposição por corredor","Substoque aéreo","Fotos depois (evidência)"]},
        {title:"Controle",      items:["Controle de vencimentos","Alertas de produto vencendo","Ponto e localização","Live map da jornada"]},
      ]},
      { label:"Comunicação", color:"#166534", sections:[
        {title:"Ferramentas",   items:["Voice-to-Text (IA)","Push notifications","Tickets e solicitações","Atividades e campanhas"]},
        {title:"Sync",          items:["Offline-first","Sync automático background","Compressão de imagens","Cache inteligente por PDV"]},
      ]},
    ],
  },
];

/* ─── CSS ──────────────────────────────────────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f5f5f4;--sf:#ffffff;--bd:#e5e4e0;--bd2:#d1d0cb;
  --t:#1a1a18;--t2:#52524e;--t3:#a3a39e;--t4:#c4c3be;
  --gn:#166534;--gnbg:#f0fdf4;--gnbd:#bbf7d0;--gnm:#16a34a;--gns:#dcfce7;
  --am:#92400e;--ambg:#fffbeb;
  --bl:#1e3a5f;--blbg:#eff6ff;--blm:#2563eb;
  --pu:#581c87;--pubg:#faf5ff;--pum:#7c3aed;
  --side:212px;--hd:44px;
  --font:'Geist',system-ui,sans-serif;
  --mono:'Geist Mono',monospace;
}
html,body{height:100%;overflow:hidden}
.root{display:flex;height:100vh;font-family:var(--font);font-size:13px;background:var(--bg);color:var(--t);-webkit-font-smoothing:antialiased}

/* ── SIDEBAR ── */
.sb{width:var(--side);flex-shrink:0;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column;height:100%;overflow:hidden}
.sb-logo{height:var(--hd);display:flex;align-items:center;padding:0 14px;border-bottom:1px solid var(--bd);gap:8px;flex-shrink:0}
.lm{width:22px;height:22px;border-radius:5px;background:var(--t);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;flex-shrink:0}
.ln{font-size:13px;font-weight:600;letter-spacing:-.02em}
.lv{font-size:10px;color:var(--t3);font-family:var(--mono);margin-left:auto}
.sb-sec{padding:6px 0;flex-shrink:0}
.sb-lbl{font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--t4);padding:5px 14px 3px}
.ni{display:flex;align-items:center;gap:8px;padding:6px 14px;cursor:pointer;font-size:12.5px;font-weight:400;color:var(--t2);border:none;background:none;width:100%;text-align:left;transition:background .1s}
.ni:hover{background:var(--bg)}
.ni.active{background:var(--bg);color:var(--t);font-weight:500}
.ni.active .ni-ic{color:var(--t)}
.ni-ic{width:14px;text-align:center;font-size:11px;color:var(--t3);flex-shrink:0}
.sb-foot{margin-top:auto;padding:10px 14px;border-top:1px solid var(--bd);flex-shrink:0}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;min-width:0;height:100%;overflow:hidden}
.hdr{height:var(--hd);background:var(--sf);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 20px;gap:10px;flex-shrink:0}
.hdr-t{font-size:13px;font-weight:500}
.hdr-sep{color:var(--t4);font-size:11px}
.hdr-s{font-size:12px;color:var(--t3)}
.hdr-act{margin-left:auto}
.btn-primary{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:500;cursor:pointer;border:none;background:var(--t);color:#fff;font-family:var(--font);transition:background .1s}
.btn-primary:hover{background:#2a2a28}
.btn-ghost{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:5px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid var(--bd);background:var(--sf);color:var(--t2);font-family:var(--font);transition:background .1s}
.btn-ghost:hover{background:var(--bg)}

/* ── CONTENT ── */
.content{flex:1;overflow-y:auto;padding:16px 20px}
.content::-webkit-scrollbar{width:4px}
.content::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}

/* ── COMMON COMPONENTS ── */
.pg{display:flex;flex-direction:column;gap:12px}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);border:1px solid var(--bd);border-radius:8px;overflow:hidden}
.sc{background:var(--sf);padding:14px 16px}
.sc-l{font-size:11px;color:var(--t3);margin-bottom:5px;font-weight:500}
.sc-v{font-size:22px;font-weight:600;letter-spacing:-.02em;line-height:1}
.sc-s{font-size:11px;color:var(--t3);margin-top:3px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:8px;overflow:hidden}
.ch{display:flex;align-items:center;padding:10px 14px;border-bottom:1px solid var(--bd);gap:8px}
.ch-t{font-size:12.5px;font-weight:600}
.ch-s{font-size:11px;color:var(--t3);margin-left:auto}
.two{display:grid;grid-template-columns:1fr 300px;gap:12px;align-items:start}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:start}
.badge{display:inline-flex;align-items:center;font-size:10.5px;font-weight:500;padding:2px 7px;border-radius:4px;font-family:var(--mono);white-space:nowrap}
.badge.g{background:var(--gns);color:var(--gn)}
.badge.n{background:var(--bg);color:var(--t3);border:1px solid var(--bd)}
.badge.gold{background:#fef9c3;color:#713f12}
.badge.b{background:var(--blbg);color:var(--bl)}
.badge.p{background:var(--pubg);color:var(--pu)}
.lr{display:flex;align-items:center;gap:9px;padding:8px 14px;border-bottom:1px solid var(--bd)}
.lr:last-child{border-bottom:none}
.av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0}
table{width:100%;border-collapse:collapse}
thead th{text-align:left;padding:7px 10px;font-size:10px;font-weight:500;color:var(--t3);background:var(--bg);border-bottom:1px solid var(--bd);letter-spacing:.05em;text-transform:uppercase;font-family:var(--mono)}
thead th:first-child{padding-left:14px}
thead th:last-child{padding-right:14px}
tbody tr{border-bottom:1px solid var(--bd)}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:var(--bg)}
tbody td{padding:8px 10px;font-size:12.5px;color:var(--t2);vertical-align:middle}
tbody td:first-child{padding-left:14px;color:var(--t);font-weight:500}
tbody td:last-child{padding-right:14px}
.tag{display:inline-block;font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:3px}
.tag.inc{background:var(--gns);color:var(--gn)}
.tag.fut{background:var(--bg);color:var(--t3);border:1px solid var(--bd)}
.alert-b{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-radius:6px;font-size:12.5px}
.alert-b.a{background:#fffbeb;border:1px solid #fde68a;color:#92400e}
.alert-b.g{background:var(--gnbg);border:1px solid var(--gnbd);color:var(--gn)}
.alert-b p{margin:0;line-height:1.55}
.tab-row{display:flex;border-bottom:1px solid var(--bd)}
.tab-btn{background:none;border:none;padding:8px 14px;cursor:pointer;font-size:12.5px;font-family:var(--font);font-weight:400;color:var(--t3);border-bottom:2px solid transparent;transition:all .1s;margin-bottom:-1px}
.tab-btn:hover{color:var(--t)}
.tab-btn.active{color:var(--t);font-weight:600;border-bottom-color:var(--t)}
.sec-lbl{font-size:10.5px;font-weight:600;color:var(--t3);letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:8px}
.sec-lbl::after{content:'';flex:1;height:1px;background:var(--bd)}

/* ── SYSTEM BOX (arch diagram) ── */
.sys-box{border-radius:8px;border:1.5px solid;cursor:pointer;transition:box-shadow .15s,border-color .15s,transform .12s;user-select:none;overflow:hidden;background:#fff}
.sys-box:hover{box-shadow:0 4px 18px rgba(0,0,0,.09);transform:translateY(-2px)}
.sys-box.sel{transform:translateY(-2px)}
.sys-box-bar{height:3px;transition:opacity .15s}
.sys-box-inner{padding:14px 16px 10px;display:flex;align-items:flex-start;gap:10px}
.sys-box-icon{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.sys-box-name{font-size:13px;font-weight:600;line-height:1.2;margin-bottom:2px}
.sys-box-sub{font-size:11px;font-family:var(--mono);opacity:.65}
.sys-box-chips{display:flex;gap:4px;padding:0 16px 14px;flex-wrap:wrap}
.chip{font-size:10px;font-weight:600;padding:2px 8px;border-radius:12px;border:1px solid;white-space:nowrap}

/* ── INLINE DETAIL PANEL ── */
.detail-panel{background:var(--sf);border:1px solid var(--bd);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.dp-hd{padding:12px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:10px;flex-shrink:0}
.dp-profiles{display:flex;gap:5px;padding:8px 14px;border-bottom:1px solid var(--bd);flex-wrap:wrap;flex-shrink:0}
.dp-tabs{display:flex;padding:0 14px;border-bottom:1px solid var(--bd);flex-shrink:0;overflow-x:auto}
.dp-tabs::-webkit-scrollbar{display:none}
.dp-tab{background:none;border:none;padding:8px 10px;cursor:pointer;font-size:12px;font-family:var(--font);font-weight:400;color:var(--t3);border-bottom:2px solid transparent;transition:all .1s;margin-bottom:-1px;white-space:nowrap}
.dp-tab:hover{color:var(--t)}
.dp-tab.active{font-weight:600}
.dp-body{overflow-y:auto;padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
.dp-body::-webkit-scrollbar{width:4px}
.dp-body::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
.dp-sec{margin-bottom:14px}
.dp-sec-title{font-size:10px;font-weight:600;color:var(--t3);letter-spacing:.07em;text-transform:uppercase;margin-bottom:7px;font-family:var(--mono)}
.dp-item{font-size:12px;color:var(--t2);padding:5px 0;border-bottom:1px solid var(--bd);display:flex;align-items:flex-start;gap:6px;line-height:1.45}
.dp-item:last-child{border-bottom:none}
.dp-item::before{content:'·';color:var(--t4);flex-shrink:0;margin-top:1px}
.dp-close{margin-left:auto;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center;border:1px solid var(--bd);background:none;cursor:pointer;font-size:12px;color:var(--t3);transition:background .1s;flex-shrink:0}
.dp-close:hover{background:var(--bg)}

/* ── ROADMAP ── */
.rm-tab{flex:1;padding:10px 8px;border:none;border-right:1px solid var(--bd);background:none;cursor:pointer;transition:background .1s;text-align:left}
.rm-tab:last-child{border-right:none}
.rm-tab:hover{background:var(--bg)}
.rm-tab.active{background:var(--sf);box-shadow:inset 0 -2px 0 var(--t)}
.rm-lbl{font-size:10px;font-family:var(--mono);color:var(--t3);margin-bottom:2px;font-weight:500}
.rm-tab.active .rm-lbl{color:var(--t2)}
.rm-name{font-size:12px;font-weight:600;color:var(--t)}
.rm-dur{font-size:10px;color:var(--t4);font-family:var(--mono);margin-top:1px}
.rm-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd)}
.rm-col{background:var(--sf);padding:14px}
.rm-col-title{font-size:11px;font-weight:600;color:var(--t3);letter-spacing:.05em;text-transform:uppercase;margin-bottom:10px;font-family:var(--mono)}
.rm-item{font-size:12px;color:var(--t2);padding:4px 0;border-bottom:1px solid var(--bd);display:flex;gap:5px;line-height:1.45}
.rm-item:last-child{border-bottom:none}
.rm-item::before{content:'·';color:var(--t4);flex-shrink:0}

/* ── HOURS CHART ── */
.hrs-row{display:flex;align-items:center;gap:10px;padding:4px 0}
.hrs-lbl{font-size:12px;color:var(--t2);width:170px;flex-shrink:0;font-weight:500}
.hrs-bw{flex:1;display:flex;align-items:center;gap:8px}
.hrs-bar{height:16px;border-radius:3px;min-width:3px}
.hrs-val{font-family:var(--mono);font-size:11px;color:var(--t3);flex-shrink:0}

@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.anim{animation:fadeIn .15s ease both}
`;

/* ─── NAV ─────────────────────────────────────────────────────── */
const NAV = [
  { section:"Produto", items:[
    {id:"overview",    ic:"⊡", label:"Visão Geral"},
    {id:"arquitetura", ic:"⊞", label:"Arquitetura"},
    {id:"ia",          ic:"✦", label:"IA & Automação"},
  ]},
  { section:"Entrega", items:[
    {id:"roadmap",     ic:"◷", label:"Roadmap"},
    {id:"escopo",      ic:"☑", label:"Escopo MVP"},
  ]},
];

const TITLES = {
  overview:   ["Visão Geral",     "Guidance + Programa Feedback"],
  arquitetura:["Arquitetura",     "Sistemas e fluxos do produto"],
  ia:         ["IA & Automação",  "Funcionalidades de inteligência integradas"],
  roadmap:    ["Roadmap",         "Cronograma de desenvolvimento · 10 meses"],
  escopo:     ["Escopo MVP",      "Funcionalidades por plataforma e perfil"],
};

/* ─── SYSTEM BOX ──────────────────────────────────────────────── */
function SysBox({ sys, sel, onSel, wide }) {
  const active = sel === sys.id;
  return (
    <div
      className={`sys-box${active ? " sel" : ""}`}
      style={{
        borderColor: active ? sys.color : sys.colorBorder,
        width: wide ? 380 : 260,
        boxShadow: active ? `0 0 0 2px ${sys.color}` : undefined,
      }}
      onClick={() => onSel(active ? null : sys.id)}
    >
      <div className="sys-box-bar" style={{ background: sys.color, opacity: active ? 1 : 0.4 }} />
      <div className="sys-box-inner">
        <div className="sys-box-icon" style={{ background: sys.color + "18", color: sys.color }}>{sys.icon}</div>
        <div style={{ flex: 1 }}>
          <div className="sys-box-name" style={{ color: sys.color }}>{sys.name}</div>
          <div className="sys-box-sub" style={{ color: sys.color }}>{sys.sub}</div>
        </div>
        <div style={{
          width: 20, height: 20, borderRadius: "50%",
          border: `1.5px solid ${sys.color}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: sys.color, flexShrink: 0,
          transition: "transform .2s", transform: active ? "rotate(45deg)" : "none",
        }}>
          {active ? "✕" : "+"}
        </div>
      </div>
      <div className="sys-box-chips">
        {sys.profiles.map(p => (
          <div key={p.init} className="chip"
            style={{ color: p.color, borderColor: p.color + "44", background: p.color + "0e" }}>
            {p.init} · {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ARQUITETURA ─────────────────────────────────────────────── */
function Arquitetura() {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState(0);
  const sys = sel ? SYSTEMS.find(s => s.id === sel) : null;
  const pick = (id) => { setSel(id); setTab(0); };

  return (
    <div className="pg">
      <div style={{ display: "grid", gridTemplateColumns: sel ? "1fr 340px" : "1fr", gap: 12, alignItems: "start" }}>

        {/* Diagram */}
        <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 8, padding: "24px 32px 28px" }}>
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--t4)", fontFamily: "var(--mono)", marginBottom: 20 }}>
            Clique em qualquer sistema para ver detalhes e funcionalidades
          </div>

          {/* Retaguarda row */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SysBox sys={SYSTEMS[0]} sel={sel} onSel={pick} wide />
          </div>

          {/* Fork connectors */}
          <div style={{ display: "flex", justifyContent: "center", height: 44 }}>
            <svg width="380" height="44" style={{ overflow: "visible" }}>
              <line x1="190" y1="0" x2="190" y2="18" stroke="#d1d0cb" strokeWidth="1.5" />
              <line x1="70"  y1="18" x2="310" y2="18" stroke="#d1d0cb" strokeWidth="1.5" />
              <line x1="70"  y1="18" x2="70"  y2="44" stroke="#d1d0cb" strokeWidth="1.5" />
              <line x1="310" y1="18" x2="310" y2="44" stroke="#d1d0cb" strokeWidth="1.5" />
              <rect x="43" y="22" width="28" height="14" rx="3" fill="#ffffff" stroke="#e5e4e0" strokeWidth="1" />
              <text x="57" y="33" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#b0afab">API</text>
              <rect x="282" y="22" width="28" height="14" rx="3" fill="#ffffff" stroke="#e5e4e0" strokeWidth="1" />
              <text x="296" y="33" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#b0afab">API</text>
            </svg>
          </div>

          {/* Portal + App row */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <SysBox sys={SYSTEMS[1]} sel={sel} onSel={pick} />
            <SysBox sys={SYSTEMS[2]} sel={sel} onSel={pick} />
          </div>
        </div>

        {/* Detail panel */}
        {sel && sys && (
          <div className="detail-panel anim" style={{ position: "sticky", top: 0 }}>
            {/* Header */}
            <div className="dp-hd">
              <div className="av" style={{ background: sys.colorBg, color: sys.color, width: 32, height: 32, fontSize: 11, fontWeight: 700 }}>{sys.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t)" }}>{sys.name}</div>
                <div style={{ fontSize: 10.5, color: "var(--t3)", fontFamily: "var(--mono)" }}>{sys.sub}</div>
              </div>
              <button className="dp-close" onClick={() => setSel(null)}>✕</button>
            </div>

            {/* Profile chips */}
            <div className="dp-profiles">
              {sys.profiles.map(p => (
                <div key={p.init} className="chip"
                  style={{ color: p.color, borderColor: p.color + "44", background: p.color + "0e" }}>
                  {p.init} · {p.name}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="dp-tabs">
              {sys.tabs.map((t, i) => (
                <button key={t.label}
                  className={`dp-tab${tab === i ? " active" : ""}`}
                  style={tab === i ? { borderBottomColor: sys.color, color: sys.color } : {}}
                  onClick={() => setTab(i)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="dp-body anim" key={`${sel}-${tab}`}>
              {sys.tabs[tab].sections.map(sec => (
                <div key={sec.title} className="dp-sec">
                  <div className="dp-sec-title">{sec.title}</div>
                  {sec.items.map(item => (
                    <div key={item} className="dp-item">{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── OVERVIEW ────────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="pg">
      <div className="stat-row">
        {[
          { l:"Sistemas",        v:"3",          s:"Retaguarda · App · Portal" },
          { l:"Prazo total",     v:"10 meses",   s:"Design + Dev + Migração" },
          { l:"Horas c/ margem", v:"2.411h",     s:"25% margem de segurança" },
          { l:"Perfis de acesso",v:"7",           s:"AD · SU · ST · SM · SO · CL · PV" },
        ].map(s => (
          <div key={s.l} className="sc">
            <div className="sc-l">{s.l}</div>
            <div className="sc-v">{s.v}</div>
            <div className="sc-s">{s.s}</div>
          </div>
        ))}
      </div>

      <div className="two">
        <div className="card">
          <div className="ch"><span className="ch-t">Sistemas do Ecossistema</span></div>
          {[
            { init:"RT", bg:"#eff6ff", tc:"#1e3a5f", name:"Retaguarda", sub:"Web · Admin, Supervisor, ST, SM, SO",
              items:["Dashboard por perfil de acesso","Cadastros e configurações (Admin)","Atendimentos e roteiros (Supervisor)","Treinamentos e campanhas (ST)","Execução e gôndola (SM)","Desvios e exceções (SO)","IA: alertas, resumos, roteirização"] },
            { init:"PC", bg:"#fef9c3", tc:"#92400e", name:"Portal do Cliente", sub:"Web · Indústria ★",
              items:["Visão operacional do dia","Book fotográfico antes/depois","Alertas proativos de ruptura","Tickets + Blip ★","Relatórios por atendimento"] },
            { init:"AP", bg:"#f0fdf4", tc:"#166534", name:"App do Promotor", sub:"React Native · Offline-First",
              items:["Jornada de trabalho guiada","Check-in com geofence","Diagnóstico e reposição por corredor","Localização + live map","Voice-to-Text (IA)"] },
          ].map((s, i) => (
            <div key={s.name} style={{ borderBottom: i < 2 ? "1px solid var(--bd)" : "none", padding: "11px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                <div className="av" style={{ background: s.bg, color: s.tc }}>{s.init}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)", fontFamily: "var(--mono)" }}>{s.sub}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 12px" }}>
                {s.items.map(it => {
                  const d = it.endsWith("★"), c = it.replace(" ★", "");
                  return (
                    <div key={it} style={{ fontSize: 12, color: "var(--t2)", display: "flex", gap: 5, padding: "2px 0", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--t4)", flexShrink: 0, marginTop: 2 }}>·</span>
                      {c}{d && <span className="badge gold" style={{ marginLeft: 4, fontSize: 9 }}>Dif.</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <div className="ch"><span className="ch-t">Perfis de Acesso</span></div>
            {[
              { init:"AD", bg:"#f5f5f4", tc:"#374151", name:"Administrador",       role:"Retaguarda · Acesso total" },
              { init:"SU", bg:"#eff6ff", tc:"#1e3a5f", name:"Supervisor",          role:"Retaguarda · Equipe" },
              { init:"ST", bg:"#fff7ed", tc:"#9a3412", name:"Sup. Treinamento",    role:"Retaguarda · Treino" },
              { init:"SM", bg:"#faf5ff", tc:"#581c87", name:"Sup. Merchandising",  role:"Retaguarda · Merch" },
              { init:"SO", bg:"#f0fdf4", tc:"#166534", name:"Sup. Operacional",    role:"Retaguarda · Ops" },
              { init:"CL", bg:"#fef9c3", tc:"#92400e", name:"Cliente",             role:"Portal do Cliente" },
              { init:"PV", bg:"#f5f5f4", tc:"#52524e", name:"Promotor de Vendas",  role:"App Mobile" },
            ].map(p => (
              <div key={p.name} className="lr" style={{ cursor: "default" }}>
                <div className="av" style={{ background: p.bg, color: p.tc }}>{p.init}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)", fontFamily: "var(--mono)" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="ch"><span className="ch-t">Diferenciais</span></div>
            {[
              { l:"Integração Blip",      d:"Tickets e comunicação",  cls:"gold" },
              { l:"Integração Pipedrive", d:"Contratos conectados",   cls:"gold" },
              { l:"Portal do Cliente",    d:"Visibilidade indústria", cls:"g" },
              { l:"Offline-First",        d:"App sem internet",       cls:"g" },
              { l:"Live Map",             d:"Promotores em tempo real",cls:"b" },
            ].map(d => (
              <div key={d.l} className="lr" style={{ cursor: "default" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{d.l}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>{d.d}</div>
                </div>
                <span className={`badge ${d.cls}`}>Diferencial</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── IA ──────────────────────────────────────────────────────── */
function IA() {
  return (
    <div className="pg">
      <div className="stat-row">
        {[
          { l:"Features IA no MVP", v:"4",    s:"Integradas desde o início" },
          { l:"Voice-to-Text",      v:"App",  s:"Registro por voz em campo" },
          { l:"Alertas",            v:"Auto", s:"Desvios em tempo real" },
          { l:"Roteirização",       v:"Auto", s:"Rotas otimizadas automaticamente" },
        ].map(s => (
          <div key={s.l} className="sc"><div className="sc-l">{s.l}</div><div className="sc-v">{s.v}</div><div className="sc-s">{s.s}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="ch"><span className="ch-t">Funcionalidades de IA & Automação · MVP</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--bd)" }}>
          {[
            { name:"Voice-to-Text", where:"App Promotor", desc:"O promotor registra observações por voz durante a execução no PDV. O sistema transcreve automaticamente, reduzindo cliques e acelerando o preenchimento em campo.", use:["Observações de diagnóstico do PDV","Registro de rupturas identificadas","Notas durante a reposição","Comunicação rápida com supervisor"] },
            { name:"Alertas Inteligentes", where:"Retaguarda · Supervisor", desc:"O sistema monitora inconsistências nos dados do campo e emite alertas automáticos para o supervisor, permitindo ação proativa antes que o problema se agrave.", use:["Promotor fora do raio de geofence","Ponto não batido após 30 minutos","Não comparecimento no PDV","Produto próximo ao vencimento"] },
            { name:"Resumos Automáticos", where:"Retaguarda · SO + Portal", desc:"Geração automática de sínteses de atendimento — o que foi executado, o que foi encontrado e o que precisa de atenção. Elimina relatórios manuais.", use:["Resumo do atendimento ao supervisor","Síntese diária por promotor","Consolidação de pendências","Relatório automático para o cliente"] },
            { name:"Roteirização Automática", where:"Retaguarda · Supervisor", desc:"Organização automática da ordem de visitas com base em localização, janelas de atendimento e capacidade. O supervisor revisa e publica.", use:["Roteiro diário otimizado","Cálculo de tempo de deslocamento","Balanceamento de carga por promotor","Realocação automática em ausências"] },
          ].map(c => (
            <div key={c.name} style={{ background: "var(--sf)", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t)" }}>{c.name}</div>
                <span className="badge p">{c.where}</span>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--t3)", lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</p>
              <div className="sec-lbl" style={{ marginBottom: 6, fontSize: 10 }}>Casos de uso</div>
              {c.use.map(u => (
                <div key={u} style={{ fontSize: 12, color: "var(--t2)", display: "flex", gap: 5, padding: "3px 0" }}>
                  <span style={{ color: "var(--t4)" }}>·</span>{u}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ROADMAP ─────────────────────────────────────────────────── */
const PHASES = [
  { id:0, label:"Fase 01", name:"Product Design",   months:"M1–M2",  dur:"2 meses",  color:"#7c3aed",
    summary:"Designer Sênior full time — pesquisa, design system, protótipos e handoff antes do código.",
    cols:[
      {title:"UX Research",  items:["Mapeamento de jornadas por persona","Wireframes de baixa fidelidade","Validação com stakeholders","Fluxos críticos definidos"]},
      {title:"UI Design",    items:["Design system e componentes","Protótipos navegáveis no Figma","Telas App (React Native)","Telas web Retaguarda e Portal"]},
      {title:"Handoff",      items:["Documentação de specs","Assets e tokens exportados","Revisão de acessibilidade","Alinhamento técnico final"]},
    ],
    team:["Product Designer Sênior — M1–M2 (full time)"] },
  { id:1, label:"Fase 02", name:"Fundação",          months:"M2–M4",  dur:"3 meses",  color:"#1e3a5f",
    summary:"API, autenticação, integrações críticas, CRUDs base e Retaguarda Admin.",
    cols:[
      {title:"Backend Core",    items:["Auth + RBAC (60h)","CRUDs gerais (50h)","Notificações (40h)","Upload/imagens (26h)","Auditoria (21h)","API + testes (50h)"]},
      {title:"Integrações",     items:["Tickets + Blip (75h)","Senior RH","Pipedrive contratos","Infra / DevOps (85h)"]},
      {title:"Retaguarda Admin",items:["Auth + permissões (40h)","CRUDs cadastros (50h)","Dashboard admin (40h)","Integração backend (34h)"]},
    ],
    team:["Backend Sênior — M2–M7","Frontend Web Pleno — M2–M7"] },
  { id:2, label:"Fase 03", name:"App & Supervisor",  months:"M4–M6",  dur:"2 meses",  color:"#166534",
    summary:"App do promotor completo, Retaguarda Supervisor e automações de IA.",
    cols:[
      {title:"App Promotor",    items:["Auth + Dashboard (115h)","Calendário + Jornada (64h)","Check-in + Ponto (72h)","Diagnóstico + Checklist (67h)","Reposição (115h)","Live map (114h)"]},
      {title:"Retaguarda Sup.", items:["Dashboard + KPIs (65h)","Atendimentos (40h)","Promotores (25h)","Tickets (40h)","Notificações (20h)"]},
      {title:"IA",              items:["Voice-to-Text no App","Alertas automáticos","Resumos automáticos","Roteirização automática","KPIs promotores (35h)"]},
    ],
    team:["Backend Sênior — M2–M7","Mobile Sênior — M4–M7","Frontend Web Pleno — M2–M7"] },
  { id:3, label:"Fase 04", name:"Portal & QA",       months:"M6–M8",  dur:"2 meses",  color:"#d97706",
    summary:"Portal do cliente completo, testes end-to-end e preparação para go-live.",
    cols:[
      {title:"Portal Cliente",items:["Auth + permissões (40h)","Dashboard operacional (32h)","Book de fotos (52h)","Tickets + Blip (37h)","Alertas proativos","Relatórios automáticos"]},
      {title:"QA & Testes",   items:["Testes end-to-end","Teste de carga","Validação offline do app","Correções e ajustes"]},
      {title:"Go-live",       items:["Configuração de produção","Monitoramento e alertas","Documentação técnica","Treinamento das equipes"]},
    ],
    team:["Backend Sênior — M2–M7","Mobile Sênior — M4–M7","Frontend Web Pleno — M2–M7"] },
  { id:4, label:"Fase 05", name:"Migração",          months:"M9–M10", dur:"2 meses",  color:"#52524e",
    summary:"Migração estruturada do sistema legado com validação em paralelo e go-live assistido.",
    cols:[
      {title:"Mapeamento",  items:["Inventário de dados legados","Mapeamento de entidades","Regras de transformação","Validação de integridade"]},
      {title:"Execução",    items:["Scripts de migração","Carga incremental","Validação paralela (dual-run)","Auditoria pós-migração"]},
      {title:"Handover",    items:["Treinamento usuários-chave","Documentação de processos","Suporte pós go-live","Encerramento do legado"]},
    ],
    team:["Backend Sênior — M9–M10","Full Stack Pleno — M9–M10 (apoio)"] },
];

const BARS = [
  { label:"Design",   start:0, span:2, color:"#7c3aed" },
  { label:"Backend",  start:1, span:6, color:"#1e3a5f" },
  { label:"Frontend", start:1, span:6, color:"#2563eb" },
  { label:"Mobile",   start:3, span:4, color:"#166534" },
  { label:"Portal",   start:5, span:3, color:"#d97706" },
  { label:"Migração", start:8, span:2, color:"#71717a" },
];

function Roadmap() {
  const [active, setActive] = useState(0);
  const ph = PHASES[active];
  return (
    <div className="pg">
      <div className="card">
        <div className="ch"><span className="ch-t">Cronograma · 10 meses</span></div>
        {/* Gantt */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px repeat(10,1fr)", marginBottom: 4 }}>
            <div />
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", padding: "3px 2px", borderRight: i < 9 ? "1px solid var(--bd)" : "none" }}>M{i+1}</div>
            ))}
          </div>
          {BARS.map(b => (
            <div key={b.label} style={{ display: "grid", gridTemplateColumns: "80px repeat(10,1fr)", marginBottom: 2, alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "var(--t3)", fontWeight: 500, paddingRight: 8, textAlign: "right" }}>{b.label}</div>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{ height: 20, borderRight: i < 9 ? "1px solid var(--bd)" : "none", padding: "2px 1px" }}>
                  {i >= b.start && i < b.start + b.span && (
                    <div style={{ height: "100%", borderRadius: 2, background: b.color, opacity: .82 }} />
                  )}
                </div>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
            {BARS.map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--t3)" }}>
                <div style={{ width: 10, height: 3, borderRadius: 1, background: b.color }} />{b.label}
              </div>
            ))}
          </div>
        </div>

        {/* Phase tabs */}
        <div style={{ borderTop: "1px solid var(--bd)" }}>
          <div style={{ display: "flex" }}>
            {PHASES.map((p, i) => (
              <button key={p.id} className={`rm-tab${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
                <div className="rm-lbl">{p.label}</div>
                <div className="rm-name">{p.name}</div>
                <div className="rm-dur">{p.months}</div>
              </button>
            ))}
          </div>

          <div className="anim" key={active}>
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--bd)", background: "var(--bg)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: ph.color, flexShrink: 0 }} />
              <div style={{ fontSize: 12.5, color: "var(--t2)" }}>{ph.summary}</div>
              <span className="badge n" style={{ marginLeft: "auto", fontSize: 10 }}>{ph.dur}</span>
            </div>
            <div className="rm-cols">
              {ph.cols.map(col => (
                <div key={col.title} className="rm-col">
                  <div className="rm-col-title">{col.title}</div>
                  {col.items.map(it => <div key={it} className="rm-item">{it}</div>)}
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--bd)", background: "var(--bg)", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ph.team.map(t => (
                <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--sf)", border: "1px solid var(--bd)", borderRadius: 4, padding: "4px 10px", fontSize: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ph.color }} />{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ESCOPO ──────────────────────────────────────────────────── */
const ESCOPO = {
  retaguarda: [
    {f:"Auth + RBAC — 5 perfis (AD, SU, ST, SM, SO)",tag:"inc",obs:"Hierarquia"},
    {f:"Admin: Cadastro de clientes, lojas, colaboradores",tag:"inc",obs:"—"},
    {f:"Admin: Produtos, contratos, campanhas",tag:"inc",obs:"—"},
    {f:"Admin: Tipos e fluxos de atendimento",tag:"inc",obs:"—"},
    {f:"Admin: Dashboard executivo",tag:"inc",obs:"—"},
    {f:"Admin: Configuração de geofence por loja",tag:"inc",obs:"—"},
    {f:"Supervisor: Dashboard com KPIs da equipe",tag:"inc",obs:"Por hierarquia"},
    {f:"Supervisor: Atendimentos e alocação",tag:"inc",obs:"—"},
    {f:"Supervisor: Monitoramento de promotores",tag:"inc",obs:"—"},
    {f:"Supervisor: Roteirização automática (IA)",tag:"inc",obs:"Automação"},
    {f:"Supervisor: Alertas inteligentes (IA)",tag:"inc",obs:"Automação"},
    {f:"Supervisor: Tickets e comunicação",tag:"inc",obs:"—"},
    {f:"ST: Campanhas de treinamento e acompanhamento",tag:"inc",obs:"—"},
    {f:"SM: Monitoramento de execução em gôndola",tag:"inc",obs:"—"},
    {f:"SO: Central de desvios e exceções",tag:"inc",obs:"—"},
    {f:"SO: Resumos automáticos (IA)",tag:"inc",obs:"Automação"},
  ],
  portal: [
    {f:"Auth + permissões (perfil Cliente)",tag:"inc",obs:"—"},
    {f:"Dashboard operacional do dia",tag:"inc",obs:"—"},
    {f:"Book fotográfico antes/depois",tag:"inc",obs:"Por atendimento"},
    {f:"Tickets + Blip",tag:"inc",obs:"Diferencial"},
    {f:"Alertas proativos de ruptura/vencimento",tag:"inc",obs:"—"},
    {f:"Relatórios por atendimento",tag:"inc",obs:"—"},
    {f:"Notificações ao cliente",tag:"fut",obs:"Fase 2"},
  ],
  app: [
    {f:"Auth/login",tag:"inc",obs:"—"},
    {f:"Dashboard do promotor",tag:"inc",obs:"—"},
    {f:"Push notifications",tag:"inc",obs:"—"},
    {f:"Tickets e solicitações",tag:"inc",obs:"—"},
    {f:"Produtos a vencer",tag:"inc",obs:"Alerta automático"},
    {f:"Calendário de trabalho",tag:"inc",obs:"—"},
    {f:"Início de jornada (checklist)",tag:"inc",obs:"—"},
    {f:"PDVs do dia (roteiro ordenado)",tag:"inc",obs:"—"},
    {f:"Deslocamento e mapeamento",tag:"inc",obs:"—"},
    {f:"Ponto + raio de geofence",tag:"inc",obs:"—"},
    {f:"Check-in PDV",tag:"inc",obs:"—"},
    {f:"Checklist de entrada",tag:"inc",obs:"—"},
    {f:"Diagnóstico do PDV (fotos antes)",tag:"inc",obs:"Por setor"},
    {f:"Reposição por corredor (fotos evidência)",tag:"inc",obs:"—"},
    {f:"Localização + live map",tag:"inc",obs:"Real-time"},
    {f:"Atividades e campanhas",tag:"inc",obs:"—"},
    {f:"Voice-to-Text (IA)",tag:"inc",obs:"Automação"},
    {f:"Offline-first + sync automático",tag:"inc",obs:"Sem internet"},
    {f:"Galeria visual de produtos",tag:"fut",obs:"Fase 2"},
  ],
};

function Escopo() {
  const [tab, setTab] = useState("retaguarda");
  const TABS = [
    {id:"retaguarda",label:"Retaguarda"},
    {id:"portal",    label:"Portal Cliente"},
    {id:"app",       label:"App Promotor"},
  ];
  return (
    <div className="pg">
      <div className="tab-row">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab === "retaguarda" && <div className="alert-b a"><span>◉</span><p><strong>Sistema unificado:</strong> a Retaguarda é uma única aplicação web com 5 perfis — Admin, Supervisor, ST, SM e SO. Cada perfil vê apenas os dados da sua hierarquia.</p></div>}
      {tab === "portal"     && <div className="alert-b g"><span>★</span><p><strong>Diferencial:</strong> o Portal do Cliente oferece visibilidade operacional em tempo real com book fotográfico e tickets integrados via Blip.</p></div>}
      <div className="card">
        <div className="ch">
          <span className="ch-t">{TABS.find(t2 => t2.id === tab)?.label}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <span className="badge g">Incluído</span>
            <span className="badge n">Fase 2</span>
          </div>
        </div>
        <table>
          <thead><tr><th>Funcionalidade</th><th>Status</th><th>Obs.</th></tr></thead>
          <tbody>
            {ESCOPO[tab].map(r => (
              <tr key={r.f}>
                <td>{r.f}</td>
                <td><span className={`tag ${r.tag}`}>{r.tag === "inc" ? "Incluído" : "Fase 2"}</span></td>
                <td style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--t3)" }}>{r.obs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ESTIMATIVA ──────────────────────────────────────────────── */
function Estimativa() {
  const [sel, setSel] = useState("backend");
  const maxH = Math.max(...Object.values(EST).flatMap(a => a.map(i => i.h)));
  const TABS = [
    {id:"backend",    label:"Backend",    total:TOTALS.backend,    color:"#1e3a5f"},
    {id:"app",        label:"App",        total:TOTALS.app,        color:"#166534"},
    {id:"admin",      label:"Admin",      total:TOTALS.admin,      color:"#2563eb"},
    {id:"supervisor", label:"Supervisor", total:TOTALS.supervisor, color:"#7c3aed"},
    {id:"cliente",    label:"Portal",     total:TOTALS.cliente,    color:"#d97706"},
  ];
  const curr = TABS.find(t => t.id === sel);
  return (
    <div className="pg">
      <div className="stat-row">
        {[
          {l:"Horas sem margem",  v:"1.929h",    s:"Soma de todos os sistemas"},
          {l:"Margem segurança",  v:"+482h",      s:"25% sobre o total"},
          {l:"Total com margem",  v:"2.411h",     s:"Estimativa final recomendada"},
          {l:"Prazo total",       v:"10 meses",   s:"2m design + 6m dev + 2m migração"},
        ].map(s => (
          <div key={s.l} className="sc"><div className="sc-l">{s.l}</div><div className="sc-v">{s.v}</div><div className="sc-s">{s.s}</div></div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 12 }}>
        <div className="card">
          <div className="ch">
            <div className="tab-row" style={{ borderBottom: "none" }}>
              {TABS.map(t => (
                <button key={t.id} className={`tab-btn${sel === t.id ? " active" : ""}`} onClick={() => setSel(t.id)}>
                  {t.label} <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: sel === t.id ? "var(--t)" : "var(--t4)", marginLeft: 3 }}>{t.total}h</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: "14px 16px" }}>
            {EST[sel].map(row => (
              <div key={row.item} className="hrs-row">
                <div className="hrs-lbl">{row.item}</div>
                <div className="hrs-bw">
                  <div className="hrs-bar" style={{ width: `${row.h / maxH * 100}%`, background: curr.color, opacity: .75 }} />
                  <div className="hrs-val">{row.h}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <div className="ch"><span className="ch-t">Por sistema</span></div>
            {TABS.map(t => (
              <div key={t.id} className="lr" style={{ cursor: "pointer" }} onClick={() => setSel(t.id)}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 12.5, fontWeight: 500 }}>{t.label}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--t3)" }}>{t.total}h</div>
              </div>
            ))}
            <div style={{ padding: "9px 14px", borderTop: "1px solid var(--bd)", background: "var(--bg)", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ fontWeight: 600 }}>Total base</span>
              <span style={{ fontFamily: "var(--mono)" }}>{GRAND}h</span>
            </div>
          </div>
          <div className="card">
            <div className="ch"><span className="ch-t">Resumo</span></div>
            {[
              {l:"Horas base",    v:`${GRAND}h`},
              {l:"Margem 25%",   v:`+${GRAND_MARGIN - GRAND}h`},
              {l:"Total",        v:`${GRAND_MARGIN}h`, bold:true},
              {l:"Design Sênior",v:"2 meses"},
              {l:"Dev (equipe)", v:"6 meses"},
              {l:"Migração",     v:"2 meses"},
              {l:"Prazo total",  v:"10 meses", bold:true},
            ].map(r => (
              <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 14px", borderBottom: "1px solid var(--bd)", fontSize: 12 }}>
                <span style={{ color: "var(--t2)" }}>{r.l}</span>
                <span style={{ fontFamily: "var(--mono)", fontWeight: r.bold ? 700 : 400, color: r.bold ? "var(--t)" : "var(--t3)" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROXIMOS ────────────────────────────────────────────────── */
function Proximos() {
  return (
    <div className="pg">
      <div className="card">
        <div className="ch"><span className="ch-t">Próximos passos</span><span className="ch-s">Do alinhamento ao primeiro sprint</span></div>
        <table>
          <thead><tr><th>#</th><th>Etapa</th><th>Descrição</th><th>Prazo</th></tr></thead>
          <tbody>
            {[
              ["01","Validação do escopo",   "Reunião para confirmar módulos, fluxos críticos e integrações.", "1 semana"],
              ["02","Aprovação e assinatura","Contrato com cronograma de entregas, marcos e SLA de suporte.", "1 semana"],
              ["03","Kick-off com designer", "Início do Product Design — pesquisa, wireframes e design system.","Semana 3"],
              ["04","Início do desenvolvimento","Backend e frontend web em paralelo ao final do M1.",          "Mês 2"],
              ["05","Planejamento da migração","Mapeamento de dados legados para execução nos meses 9–10.",    "Mês 6"],
            ].map(r => (
              <tr key={r[0]}>
                <td><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--t4)" }}>{r[0]}</span></td>
                <td style={{ fontWeight: 600 }}>{r[1]}</td>
                <td style={{ color: "var(--t3)" }}>{r[2]}</td>
                <td><span className="badge n">{r[3]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 12 }}>
        <div className="card">
          <div className="ch"><span className="ch-t">Resumo da proposta</span></div>
          {[
            ["Sistemas",        "Retaguarda · App do Promotor · Portal do Cliente"],
            ["Prazo total",     "10 meses (design + desenvolvimento + migração)"],
            ["Horas c/ margem", "2.411h (25% margem de segurança)"],
            ["IA no produto",   "Voice-to-Text · Alertas · Resumos · Roteirização"],
            ["Diferenciais",    "Blip · Pipedrive · Portal do Cliente · Offline-First"],
            ["Perfis",          "Admin · Supervisor · ST · SM · SO · Cliente · Promotor"],
            ["App",             "React Native · Offline-First · Sync automático"],
            ["Migração",        "2 meses ao final — validação em paralelo com legado"],
          ].map(r => (
            <div key={r[0]} style={{ display: "flex", gap: 12, padding: "8px 14px", borderBottom: "1px solid var(--bd)" }}>
              <div style={{ fontSize: 11.5, fontWeight: 500, color: "var(--t3)", minWidth: 120, flexShrink: 0 }}>{r[0]}</div>
              <div style={{ fontSize: 12.5, color: "var(--t)" }}>{r[1]}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ch"><span className="ch-t">Sobre este documento</span></div>
          <div style={{ padding: "14px" }}>
            <p style={{ fontSize: 12.5, color: "var(--t3)", lineHeight: 1.7, marginBottom: 14 }}>Documento confidencial preparado exclusivamente para esta proposta.</p>
            <div style={{ padding: "12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--bd)" }}>
              <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t4)", marginBottom: 5 }}>GUIDANCE · PROGRAMA FEEDBACK</div>
              <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>© 2025 Guidance<br />Versão 2.0 — Reestimativa<br />Março 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT ────────────────────────────────────────────────────── */
const PAGES = {
  overview: Overview, arquitetura: Arquitetura, ia: IA,
  roadmap: Roadmap,   escopo: Escopo,
};

export default function App() {
  const [active, setActive] = useState("overview");
  const Page = PAGES[active];
  const [title, sub] = TITLES[active];

  return (
    <div className="root">
      <style>{S}</style>

      {/* Sidebar */}
      <aside className="sb">
        <div className="sb-logo">
          <div className="lm">G</div>
          <div className="ln">Guidance</div>
          <div className="lv">MVP</div>
        </div>
        {NAV.map(g => (
          <div key={g.section} className="sb-sec">
            <div className="sb-lbl">{g.section}</div>
            {g.items.map(item => (
              <button key={item.id} className={`ni${active === item.id ? " active" : ""}`} onClick={() => setActive(item.id)}>
                <span className="ni-ic">{item.ic}</span>{item.label}
              </button>
            ))}
          </div>
        ))}
        <div className="sb-foot">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="av" style={{ background: "var(--t)", color: "#fff", fontSize: 10, fontWeight: 700 }}>PF</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>Prog. Feedback</div>
              <div style={{ fontSize: 10, color: "var(--t3)", fontFamily: "var(--mono)" }}>Proposta comercial</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="hdr">
          <span className="hdr-t">{title}</span>
          <span className="hdr-sep">/</span>
          <span className="hdr-s">{sub}</span>

        </header>
        <div className="content" key={active}>
          <Page />
        </div>
      </div>
    </div>
  );
}
