import { useState } from "react";

/* ─── SYSTEMS DATA ─────────────────────────────────────────────── */
const SYSTEMS = [
  {
    id:"retaguarda", name:"Retaguarda", sub:"Web · Sistema Unificado",
    color:"#1e3a5f", colorBg:"#eff6ff", colorBorder:"#93c5fd", icon:"RT",
    profiles:[
      {init:"AD",name:"Administrador",    color:"#374151"},
      {init:"ST",name:"Sup. Treinamento", color:"#1e3a5f"},
      {init:"SM",name:"S. Merchandising", color:"#581c87"},
      {init:"SO",name:"S. Operacional",   color:"#166534"},
    ],
    tabs:[
      { label:"Administrador", color:"#374151", sections:[
        {title:"Cadastros",    items:["Clientes e contratos","Lojas com geolocalização","Colaboradores e promotores","Produtos e categorias","Campanhas e fluxos","Tipos de atendimento"]},
        {title:"Configurações",items:["Gestão de usuários e RBAC","Raios de geofence por loja","Parâmetros de notificação","Logs de auditoria"]},
        {title:"Visão Geral",  items:["Dashboard executivo completo","Relatórios consolidados","KPIs por loja e período","Exportação de dados"]},
      ]},
      { label:"Sup. Treinamento", color:"#1e3a5f", sections:[
        {title:"Operação",    items:["Dashboard com KPIs da equipe","Atendimentos: alocação e status","Monitoramento de promotores","Mapa ao vivo da equipe","Histórico de visitas"]},
        {title:"Treinamento", items:["Campanhas de capacitação dos promotores","Acompanhamento individual em campo","Certificações e progresso","Feedback e plano de desenvolvimento"]},
        {title:"Automação",   items:["Alertas inteligentes","Resumos automáticos (IA)","Notificações em tempo real"]},
        {title:"Comunicação", items:["Tickets e solicitações","Chat com promotores","Avisos e comunicados"]},
      ]},
      { label:"S. Merchandising", color:"#581c87", sections:[
        {title:"Execução", items:["Monitoramento de gôndola","Execução vs. planograma","Diagnóstico de ruptura","Fotos antes/depois"]},
        {title:"Análise",  items:["Relatórios por categoria","Performance por corredor","Alertas de não conformidade"]},
      ]},
      { label:"S. Operacional", color:"#166534", sections:[
        {title:"Desvios",  items:["Central de desvios e exceções","Validação de check-ins fora do raio","Gestão de justificativas","Histórico de ocorrências"]},
        {title:"Operação", items:["Resumos automáticos (IA)","Pendências do dia","Relatório de presença"]},
      ]},
    ],
  },
  {
    id:"portal", name:"Portal do Cliente", sub:"Web · Indústria",
    color:"#92400e", colorBg:"#fef9c3", colorBorder:"#fcd34d", icon:"PC",
    profiles:[{init:"CL",name:"Cliente (Indústria)",color:"#92400e"}],
    tabs:[
      { label:"Cliente", color:"#92400e", sections:[
        {title:"Visibilidade", items:["Visão operacional do dia","Promotores em campo e SLA","PDVs visitados","Fotos registradas"]},
        {title:"Evidências",   items:["Book fotográfico antes/depois","Relatório por atendimento","Histórico de execução","Comparativo por período"]},
        {title:"Comunicação",  items:["Abertura de tickets","Acompanhamento de solicitações","Alertas proativos de ruptura","Notificações de vencimento"]},
      ]},
    ],
  },
  {
    id:"app", name:"App do Promotor", sub:"React Native · Offline-First",
    color:"#166534", colorBg:"#f0fdf4", colorBorder:"#86efac", icon:"AP",
    profiles:[{init:"PV",name:"Promotor de Vendas",color:"#166534"}],
    tabs:[
      { label:"Onboarding", color:"#166534", sections:[
        {title:"Primeira Experiência", items:["Tour guiado na primeira abertura do app","Apresentação de cada seção com dica contextual","Checklist de configuração do perfil","Simulação de fluxo de check-in e execução","Possibilidade de rever o guia a qualquer momento"]},
        {title:"Base de Vídeos",       items:["Menu dedicado de tutoriais em vídeo","Vídeos por módulo: jornada, PDV, diagnóstico…","Acesso offline aos vídeos mais assistidos","Busca por palavras-chave","Atualizações automáticas de novos vídeos"]},
      ]},
      { label:"Jornada", color:"#166534", sections:[
        {title:"Planejamento", items:["Calendário de trabalho","PDVs do dia em ordem otimizada","Deslocamento e mapeamento","Estimativa de chegada"]},
        {title:"Início",       items:["Início de jornada (checklist)","Verificação de EPIs","Check-in com geofence","Justificativa fora do raio"]},
      ]},
      { label:"Execução", color:"#166534", sections:[
        {title:"PDV",     items:["Checklist de entrada","Diagnóstico com fotos antes","Reposição por corredor","Substoque aéreo","Fotos depois (evidência)"]},
        {title:"Controle",items:["Controle de vencimentos","Alertas de produto vencendo","Ponto e localização","Live map da jornada"]},
      ]},
      { label:"Comunicação", color:"#166534", sections:[
        {title:"Ferramentas",items:["Assistente de Voz (IA)","Push notifications","Tickets e solicitações","Atividades e campanhas"]},
        {title:"Sync",       items:["Offline-first","Sync automático background","Compressão de imagens","Cache inteligente por PDV"]},
      ]},
    ],
  },
];

/* ─── ESCOPO ────────────────────────────────────────────────────── */
const ESCOPO = {
  retaguarda:[
    {f:"Auth + RBAC — 4 perfis (AD, ST, SM, SO)",tag:"inc",obs:"Hierarquia"},
    {f:"Admin: Cadastro de clientes, lojas, colaboradores",tag:"inc",obs:"—"},
    {f:"Admin: Produtos, contratos, campanhas",tag:"inc",obs:"—"},
    {f:"Admin: Dashboard executivo",tag:"inc",obs:"—"},
    {f:"Admin: Configuração de geofence por loja",tag:"inc",obs:"—"},
    {f:"S. Treinamento: Dashboard com KPIs da equipe",tag:"inc",obs:"Por hierarquia"},
    {f:"S. Treinamento: Atendimentos e alocação",tag:"inc",obs:"—"},
    {f:"S. Treinamento: Monitoramento de promotores",tag:"inc",obs:"—"},
    {f:"S. Treinamento: Treinamento e desenvolvimento",tag:"inc",obs:"—"},
    {f:"S. Treinamento: Alertas inteligentes",tag:"inc",obs:"Monitoramento"},
    {f:"SM: Monitoramento de execução em gôndola",tag:"inc",obs:"—"},
    {f:"SO: Central de desvios e exceções",tag:"inc",obs:"—"},
    {f:"SO: Resumos automáticos (IA)",tag:"inc",obs:"Automação"},
  ],
  portal:[
    {f:"Auth + permissões (perfil Cliente)",tag:"inc",obs:"—"},
    {f:"Dashboard operacional do dia",tag:"inc",obs:"—"},
    {f:"Book fotográfico antes/depois",tag:"inc",obs:"Por atendimento"},
    {f:"Tickets e solicitações",tag:"inc",obs:"—"},
    {f:"Alertas proativos de ruptura/vencimento",tag:"inc",obs:"—"},
    {f:"Relatórios por atendimento",tag:"inc",obs:"—"},
    {f:"Notificações ao cliente",tag:"fut",obs:"Fase 2"},
  ],
  app:[
    {f:"Auth/login",tag:"inc",obs:"—"},
    {f:"Onboarding guiado (primeira vez)",tag:"inc",obs:"Tour interativo"},
    {f:"Base de vídeos tutoriais",tag:"inc",obs:"Offline disponível"},
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
    {f:"Diagnóstico do PDV (fotos antes)",tag:"inc",obs:"Por setor"},
    {f:"Reposição por corredor (fotos evidência)",tag:"inc",obs:"—"},
    {f:"Localização + live map",tag:"inc",obs:"Real-time"},
    {f:"Assistente de Voz (IA)",tag:"inc",obs:"Pronto no M4"},
    {f:"Offline-first + sync automático",tag:"inc",obs:"Sem internet"},
  ],
};

/* ─── ROADMAP FEATURE DATA ──────────────────────────────────────── */
// s = start month (1-indexed), e = end month (1-indexed, inclusive)
// type: "feature" | "ia" | "config" | "qa" | "migration"
const RM_MONTHS = 8;
const RM_MONTH_META = [
  { label:"M1", bg:"#fff1f2", headerColor:"#e11d48", phase:"Desenvolvimento" },
  { label:"M2", bg:"#fff1f2", headerColor:"#e11d48", phase:"Desenvolvimento" },
  { label:"M3", bg:"#ecfdf5", headerColor:"#059669", phase:"Dev + Migração inicia" },
  { label:"M4", bg:"#ecfdf5", headerColor:"#059669", phase:"Dev + Migração" },
  { label:"M5", bg:"#fffbeb", headerColor:"#d97706", phase:"Homologação + Migração" },
  { label:"M6", bg:"#fffbeb", headerColor:"#d97706", phase:"Homologação + Migração" },
  { label:"M7", bg:"#f5f3ff", headerColor:"#7c3aed", phase:"IA Avançada" },
  { label:"M8", bg:"#f0fdf4", headerColor:"#059669", phase:"Sustentação · IA" },
];

const RM_GROUPS = [
  {
    system:"Retaguarda", color:"#1e3a5f", icon:"RT",
    features:[
      { name:"Auth + RBAC · 4 perfis",              s:1, e:1, type:"config"  },
      { name:"Cadastros Admin (clientes, lojas…)",   s:1, e:2, type:"config"  },
      { name:"Dashboard executivo Admin",             s:1, e:2, type:"config"  },
      { name:"S. Treinamento: Dashboard + KPIs",          s:2, e:3, type:"feature" },
      { name:"S. Treinamento: Atendimentos e alocação",   s:2, e:3, type:"feature" },
      { name:"S. Treinamento: Treinamento de promotores", s:3, e:3, type:"feature" },
      { name:"S. Merchandising: Gôndola e execução",  s:3, e:4, type:"feature" },
      { name:"S. Operacional: Central de desvios",    s:3, e:4, type:"feature" },
      { name:"Alertas Inteligentes",               s:2, e:3, type:"feature" },
      { name:"IA · Resumos Automáticos",              s:3, e:4, type:"ia"      },
    ],
  },
  {
    system:"App do Promotor", color:"#166534", icon:"AP",
    features:[
      { name:"Auth + Login",                         s:1, e:1, type:"feature" },
      { name:"Onboarding guiado (1ª vez no app)",    s:1, e:2, type:"feature" },
      { name:"Base de vídeos tutoriais",             s:2, e:3, type:"feature" },
      { name:"Dashboard + Calendário de trabalho",   s:1, e:2, type:"feature" },
      { name:"Offline-first + Sync automático",      s:1, e:2, type:"feature" },
      { name:"Check-in + Geofence + Ponto",          s:2, e:2, type:"feature" },
      { name:"Diagnóstico do PDV + Fotos",           s:2, e:3, type:"feature" },
      { name:"Reposição por corredor",               s:2, e:3, type:"feature" },
      { name:"Controle de vencimentos",              s:3, e:3, type:"feature" },
      { name:"Live Map em tempo real",               s:3, e:4, type:"feature" },
    ],
  },
  {
    system:"Portal do Cliente", color:"#92400e", icon:"PC",
    features:[
      { name:"Auth + permissões",                    s:3, e:3, type:"feature" },
      { name:"Dashboard operacional do dia",          s:3, e:4, type:"feature" },
      { name:"Book fotográfico antes/depois",         s:3, e:4, type:"feature" },
      { name:"Tickets e solicitações",               s:4, e:4, type:"feature" },
      { name:"Alertas proativos de ruptura",          s:4, e:4, type:"feature" },
    ],
  },
  {
    system:"IA · Ciência de Dados", color:"#7c3aed", icon:"IA",
    features:[
      { name:"Assistente de Voz",                         s:4, e:4, type:"ia" },
      { name:"Análise Automática de Fotos",                s:1, e:6, type:"ia" },
      { name:"Enriquecimento de base · fotos + labels",    s:1, e:2, type:"ia" },
      { name:"Sugestão de Pedido",                         s:5, e:7, type:"ia" },
      { name:"Resumo Inteligente",                         s:7, e:7, type:"ia" },
      { name:"Sustentação e ajustes de modelos",           s:8, e:8, type:"ia" },
    ],
  },
  {
    system:"Homologação & QA", color:"#b45309", icon:"QA",
    features:[
      { name:"Retaguarda · testes e aprovação",      s:5, e:6, type:"qa" },
      { name:"App do Promotor · testes e aprovação", s:5, e:6, type:"qa" },
      { name:"Portal do Cliente · testes",           s:5, e:6, type:"qa" },
    ],
  },
  {
    system:"Migração do Prime", color:"#dc2626", icon:"MG",
    features:[
      { name:"Mapeamento de dados legados",          s:3, e:3, type:"migration" },
      { name:"Execução da migração",                 s:3, e:5, type:"migration" },
      { name:"Validação e auditoria pós-migração",   s:5, e:6, type:"migration" },
    ],
  },
];

/* ─── CSS ──────────────────────────────────────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f5f6f8;--sf:#ffffff;
  --bd:#e4e5e9;--bd2:#d0d1d8;
  --t:#111827;--t2:#4b5563;--t3:#9ca3af;--t4:#d1d5db;
  --gn:#15803d;--gnbg:#f0fdf4;--gnbd:#bbf7d0;--gns:#dcfce7;
  --am:#92400e;--ambg:#fffbeb;
  --bl:#1e3a5f;--blbg:#eff6ff;--blm:#2563eb;
  --pu:#6d28d9;--pubg:#f5f3ff;--pum:#7c3aed;
  --cy:#0e7490;--cybg:#ecfeff;
  --rd:#dc2626;--rdbg:#fef2f2;
  --side:220px;--hd:48px;
  --font:'Inter',system-ui,sans-serif;
  --mono:'JetBrains Mono',monospace;
  --sh:0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04);
  --sh2:0 4px 16px rgba(0,0,0,.08),0 1px 4px rgba(0,0,0,.04);
}
html,body{height:100%;overflow:hidden}
.root{display:flex;height:100vh;font-family:var(--font);font-size:13px;background:var(--bg);color:var(--t);-webkit-font-smoothing:antialiased;letter-spacing:-.01em}

/* ── SIDEBAR ── */
.sb{width:var(--side);flex-shrink:0;background:var(--sf);border-right:1px solid var(--bd);display:flex;flex-direction:column;height:100%;overflow:hidden}
.sb-logo{height:var(--hd);display:flex;align-items:center;padding:0 16px;border-bottom:1px solid var(--bd);gap:9px;flex-shrink:0}
.lm{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,#1e3a5f,#2563eb);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;box-shadow:0 2px 6px rgba(37,99,235,.3)}
.ln{font-size:13.5px;font-weight:700;letter-spacing:-.03em;color:var(--t)}
.lv{font-size:9.5px;color:var(--t3);font-family:var(--mono);margin-left:auto;background:var(--bg);padding:1px 6px;border-radius:3px;border:1px solid var(--bd)}
.sb-sec{padding:8px 8px 2px;flex-shrink:0}
.sb-lbl{font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--t4);padding:4px 8px 5px}
.ni{display:flex;align-items:center;gap:8px;padding:7px 10px;cursor:pointer;font-size:12.5px;font-weight:400;color:var(--t3);border:none;background:none;width:100%;text-align:left;transition:all .12s;border-radius:7px;margin-bottom:1px}
.ni:hover{background:var(--bg);color:var(--t2)}
.ni.active{background:#eff6ff;color:#1e40af;font-weight:600}
.ni.active .ni-ic{color:#1e40af}
.ni-ic{width:15px;text-align:center;font-size:12px;color:var(--t4);flex-shrink:0;transition:color .12s}
.sb-foot{margin-top:auto;padding:12px 8px;border-top:1px solid var(--bd);flex-shrink:0}
.sb-foot-inner{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:7px;background:var(--bg)}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;min-width:0;height:100%;overflow:hidden}
.hdr{height:var(--hd);background:var(--sf);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 24px;gap:8px;flex-shrink:0}
.hdr-t{font-size:13.5px;font-weight:600;color:var(--t)}
.hdr-sep{color:var(--t4);font-size:11px}
.hdr-s{font-size:12px;color:var(--t3)}

/* ── CONTENT ── */
.content{flex:1;overflow-y:auto;padding:20px 24px}
.content::-webkit-scrollbar{width:5px}
.content::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px}

/* ── COMMON ── */
.pg{display:flex;flex-direction:column;gap:14px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:10px;overflow:hidden;box-shadow:var(--sh)}
.ch{display:flex;align-items:center;padding:11px 16px;border-bottom:1px solid var(--bd);gap:8px;background:var(--sf)}
.ch-t{font-size:13px;font-weight:600;color:var(--t)}
.ch-s{font-size:11px;color:var(--t3);margin-left:auto;font-family:var(--mono)}
.two{display:grid;grid-template-columns:1fr 280px;gap:14px;align-items:start}

/* ── STAT CARDS ── */
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.sc{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:16px 18px;box-shadow:var(--sh);position:relative;overflow:hidden}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--sc-accent,var(--blm))}
.sc-l{font-size:11px;color:var(--t3);margin-bottom:6px;font-weight:500;text-transform:uppercase;letter-spacing:.05em}
.sc-v{font-size:24px;font-weight:700;letter-spacing:-.04em;line-height:1;color:var(--t)}
.sc-s{font-size:11px;color:var(--t3);margin-top:4px}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;font-family:var(--mono);white-space:nowrap;letter-spacing:.02em}
.badge.g{background:var(--gns);color:var(--gn)}
.badge.n{background:var(--bg);color:var(--t3);border:1px solid var(--bd)}
.badge.gold{background:#fef3c7;color:#92400e}
.badge.b{background:var(--blbg);color:var(--bl)}
.badge.p{background:var(--pubg);color:var(--pu)}
.badge.cy{background:var(--cybg);color:var(--cy)}
.badge.rd{background:var(--rdbg);color:var(--rd)}

/* ── LIST ROWS ── */
.lr{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--bd)}
.lr:last-child{border-bottom:none}
.av{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0}

/* ── TABLES ── */
table{width:100%;border-collapse:collapse}
thead th{text-align:left;padding:8px 12px;font-size:10px;font-weight:600;color:var(--t3);background:#f9fafb;border-bottom:1px solid var(--bd);letter-spacing:.06em;text-transform:uppercase;font-family:var(--mono)}
thead th:first-child{padding-left:16px}
thead th:last-child{padding-right:16px}
tbody tr{border-bottom:1px solid var(--bd);transition:background .1s}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:#f9fafb}
tbody td{padding:9px 12px;font-size:12.5px;color:var(--t2);vertical-align:middle}
tbody td:first-child{padding-left:16px;color:var(--t);font-weight:500}
tbody td:last-child{padding-right:16px}
.tag{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;padding:2px 7px;border-radius:20px}
.tag.inc{background:var(--gns);color:var(--gn)}
.tag.fut{background:var(--bg);color:var(--t3);border:1px solid var(--bd)}

/* ── TABS ── */
.tab-row{display:flex;border-bottom:1px solid var(--bd);padding:0 4px}
.tab-btn{background:none;border:none;padding:9px 12px;cursor:pointer;font-size:12.5px;font-family:var(--font);font-weight:400;color:var(--t3);border-bottom:2px solid transparent;transition:all .12s;margin-bottom:-1px;letter-spacing:-.01em}
.tab-btn:hover{color:var(--t2)}
.tab-btn.active{color:var(--t);font-weight:600;border-bottom-color:var(--blm)}

/* ── ALERTS ── */
.alert-b{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-radius:10px;font-size:12.5px;border:1px solid}
.alert-b.a{background:#fffbeb;border-color:#fde68a;color:#92400e}
.alert-b.g{background:var(--gnbg);border-color:var(--gnbd);color:var(--gn)}
.alert-b p{margin:0;line-height:1.6}

/* ── SEC LABEL ── */
.sec-lbl{font-size:10px;font-weight:600;color:var(--t3);letter-spacing:.07em;text-transform:uppercase;display:flex;align-items:center;gap:8px}
.sec-lbl::after{content:'';flex:1;height:1px;background:var(--bd)}

/* ── SYSTEM BOX ── */
.sys-box{border-radius:10px;border:1.5px solid;cursor:pointer;transition:box-shadow .15s,border-color .15s,transform .12s;user-select:none;overflow:hidden;background:#fff;box-shadow:var(--sh)}
.sys-box:hover{box-shadow:var(--sh2);transform:translateY(-2px)}
.sys-box.sel{transform:translateY(-2px)}
.sys-box-bar{height:4px;transition:opacity .15s}
.sys-box-inner{padding:14px 16px 10px;display:flex;align-items:flex-start;gap:10px}
.sys-box-icon{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.sys-box-name{font-size:13px;font-weight:700;line-height:1.2;margin-bottom:2px}
.sys-box-sub{font-size:10.5px;font-family:var(--mono);opacity:.6}
.sys-box-chips{display:flex;gap:4px;padding:0 16px 14px;flex-wrap:wrap}
.chip{font-size:9.5px;font-weight:600;padding:2px 8px;border-radius:12px;border:1px solid;white-space:nowrap;letter-spacing:.02em}

/* ── DETAIL PANEL ── */
.detail-panel{background:var(--sf);border:1px solid var(--bd);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--sh2)}
.dp-hd{padding:12px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:10px;flex-shrink:0}
.dp-profiles{display:flex;gap:5px;padding:10px 14px;border-bottom:1px solid var(--bd);flex-wrap:wrap;flex-shrink:0}
.dp-tabs{display:flex;padding:10px 14px;border-bottom:1px solid var(--bd);flex-shrink:0;flex-wrap:wrap;gap:6px}
.dp-tab{background:var(--bg);border:1.5px solid var(--bd);border-radius:20px;padding:5px 12px;cursor:pointer;font-size:11.5px;font-family:var(--font);font-weight:500;color:var(--t3);transition:all .12s;white-space:nowrap;letter-spacing:-.01em;line-height:1.3}
.dp-tab:hover{background:var(--sf);color:var(--t2);border-color:var(--bd2)}
.dp-tab.active{font-weight:700;background:var(--sf);border-width:2px}
.dp-body{overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:0}
.dp-body::-webkit-scrollbar{width:4px}
.dp-body::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px}
.dp-sec{margin-bottom:14px}
.dp-sec-title{font-size:9.5px;font-weight:700;color:var(--t3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px;font-family:var(--mono)}
.dp-item{font-size:12px;color:var(--t2);padding:5px 0;border-bottom:1px solid var(--bd);display:flex;align-items:flex-start;gap:6px;line-height:1.45}
.dp-item:last-child{border-bottom:none}
.dp-item::before{content:'·';color:var(--t4);flex-shrink:0;margin-top:1px}
.dp-close{margin-left:auto;width:24px;height:24px;border-radius:5px;display:flex;align-items:center;justify-content:center;border:1px solid var(--bd);background:none;cursor:pointer;font-size:11px;color:var(--t3);transition:background .1s;flex-shrink:0}
.dp-close:hover{background:var(--bg)}

/* ── FEATURE TABLE (Roadmap) ── */
.ft-table{width:100%;border-collapse:collapse;min-width:700px}
.ft-group-row td{padding:10px 0 4px 0;background:var(--bg)}
.ft-group-label{display:flex;align-items:center;gap:8px;padding:0 8px 0 16px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);font-family:var(--mono)}
.ft-feature-row{border-bottom:1px solid var(--bd)}
.ft-feature-row:hover{background:#fafafa}
.ft-feature-row:last-child{border-bottom:none}
.ft-name-cell{padding:9px 0 9px 0;display:flex;align-items:center;gap:0;min-width:0}
.ft-sidebar{width:4px;min-width:4px;height:36px;flex-shrink:0;border-radius:0 2px 2px 0}
.ft-name-inner{display:flex;align-items:center;gap:7px;padding:0 12px;flex:1;min-width:0}
.ft-icon{font-size:11px;flex-shrink:0;opacity:.6}
.ft-label{font-size:12px;font-weight:500;color:var(--t);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ft-month-cell{padding:4px 2px;vertical-align:middle}
.ft-bar{height:26px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;font-family:var(--mono);color:white;letter-spacing:.03em;white-space:nowrap;overflow:hidden}
.ft-bar-start{border-radius:4px 0 0 4px}
.ft-bar-mid{border-radius:0}
.ft-bar-end{border-radius:0 4px 4px 0}
.ft-bar-single{border-radius:4px}
.ft-ia-badge{display:inline-flex;align-items:center;font-size:9px;font-weight:700;padding:1px 5px;border-radius:10px;background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe;font-family:var(--mono);flex-shrink:0}

@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.anim{animation:fadeIn .18s ease both}
`;

/* ─── NAV ─────────────────────────────────────────────────────── */
const NAV = [
  { section:"Produto", items:[
    {id:"overview",    ic:"◻", label:"Visão Geral"},
    {id:"arquitetura", ic:"⊞", label:"Arquitetura"},
    {id:"ia",          ic:"✦", label:"IA & Automação"},
  ]},
  { section:"Entrega", items:[
    {id:"roadmap",     ic:"◷", label:"Roadmap"},
    {id:"equipe",      ic:"◈", label:"Equipe"},
    {id:"escopo",      ic:"☑", label:"Escopo MVP"},
  ]},
];

const TITLES = {
  overview:   ["Visão Geral",    "Guidance · Programa Feedback"],
  arquitetura:["Arquitetura",    "Sistemas e fluxos do produto"],
  ia:         ["IA & Automação", "Inteligência integrada ao produto"],
  roadmap:    ["Roadmap",        "Feature por feature · 4 meses de desenvolvimento + 2 meses de migração"],
  equipe:     ["Equipe",         "Composição do time e dedicação por mês"],
  escopo:     ["Escopo MVP",     "Funcionalidades por plataforma e perfil"],
};

/* ─── SYSTEM BOX ──────────────────────────────────────────────── */
function SysBox({ sys, sel, onSel, wide }) {
  const active = sel === sys.id;
  return (
    <div className={`sys-box${active?" sel":""}`}
      style={{ borderColor:active?sys.color:sys.colorBorder, width:wide?390:265,
        boxShadow:active?`0 0 0 2px ${sys.color}33,0 4px 16px rgba(0,0,0,.1)`:undefined }}
      onClick={() => onSel(active?null:sys.id)}>
      <div className="sys-box-bar" style={{ background:sys.color, opacity:active?1:.5 }} />
      <div className="sys-box-inner">
        <div className="sys-box-icon" style={{ background:sys.color+"18", color:sys.color }}>{sys.icon}</div>
        <div style={{ flex:1 }}>
          <div className="sys-box-name" style={{ color:sys.color }}>{sys.name}</div>
          <div className="sys-box-sub" style={{ color:sys.color }}>{sys.sub}</div>
        </div>
        <div style={{ width:22,height:22,borderRadius:"50%",border:`1.5px solid ${sys.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:sys.color,flexShrink:0,transition:"transform .2s",transform:active?"rotate(45deg)":"none" }}>
          {active?"✕":"+"}
        </div>
      </div>
      <div className="sys-box-chips">
        {sys.profiles.map(p => (
          <div key={p.init} className="chip" style={{ color:p.color, borderColor:p.color+"44", background:p.color+"0e" }}>
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
  const pick = id => { setSel(id); setTab(0); };
  return (
    <div className="pg">
      <div style={{ display:"grid", gridTemplateColumns:sel?"1fr 400px":"1fr", gap:14, alignItems:"start" }}>
        <div style={{ background:"#fff", border:"1px solid var(--bd)", borderRadius:10, padding:"24px 32px 28px", boxShadow:"var(--sh)" }}>
          <div style={{ textAlign:"center", fontSize:11, color:"var(--t4)", fontFamily:"var(--mono)", marginBottom:20 }}>
            Clique em qualquer sistema para ver detalhes e funcionalidades
          </div>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <SysBox sys={SYSTEMS[0]} sel={sel} onSel={pick} wide />
          </div>
          <div style={{ display:"flex", justifyContent:"center", height:44 }}>
            <svg width="390" height="44" style={{ overflow:"visible" }}>
              <line x1="195" y1="0" x2="195" y2="18" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="75"  y1="18" x2="315" y2="18" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="75"  y1="18" x2="75"  y2="44" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="315" y1="18" x2="315" y2="44" stroke="#d1d5db" strokeWidth="1.5" />
              <rect x="48" y="21" width="30" height="14" rx="4" fill="#fff" stroke="#e4e5e9" strokeWidth="1" />
              <text x="63" y="32" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#9ca3af">API</text>
              <rect x="289" y="21" width="30" height="14" rx="4" fill="#fff" stroke="#e4e5e9" strokeWidth="1" />
              <text x="304" y="32" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#9ca3af">API</text>
            </svg>
          </div>
          <div style={{ display:"flex", gap:20, justifyContent:"center" }}>
            <SysBox sys={SYSTEMS[1]} sel={sel} onSel={pick} />
            <SysBox sys={SYSTEMS[2]} sel={sel} onSel={pick} />
          </div>
        </div>
        {sel && sys && (
          <div className="detail-panel anim" style={{ position:"sticky", top:0 }}>
            <div className="dp-hd">
              <div className="av" style={{ background:sys.colorBg, color:sys.color, width:34, height:34, fontSize:11, fontWeight:700 }}>{sys.icon}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700 }}>{sys.name}</div>
                <div style={{ fontSize:10, color:"var(--t3)", fontFamily:"var(--mono)" }}>{sys.sub}</div>
              </div>
              <button className="dp-close" onClick={() => setSel(null)}>✕</button>
            </div>
            <div className="dp-profiles">
              {sys.profiles.map(p => (
                <div key={p.init} className="chip" style={{ color:p.color, borderColor:p.color+"44", background:p.color+"0e" }}>
                  {p.init} · {p.name}
                </div>
              ))}
            </div>
            <div className="dp-tabs">
              {sys.tabs.map((t,i) => (
                <button key={t.label} className={`dp-tab${tab===i?" active":""}`}
                  style={tab===i?{borderBottomColor:sys.color,color:sys.color}:{}}
                  onClick={() => setTab(i)}>{t.label}</button>
              ))}
            </div>
            <div className="dp-body anim" key={`${sel}-${tab}`}>
              {sys.tabs[tab].sections.map(sec => (
                <div key={sec.title} className="dp-sec">
                  <div className="dp-sec-title">{sec.title}</div>
                  {sec.items.map(item => <div key={item} className="dp-item">{item}</div>)}
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
          { l:"Sistemas",         v:"3",       s:"Retaguarda · App · Portal",   acc:"#2563eb" },
          { l:"Prazo total",      v:"8 meses", s:"6m dev/homolog + 2m IA avançada",  acc:"#7c3aed" },
          { l:"Horas c/ margem",  v:"2.411h",  s:"25% margem de segurança",    acc:"#0891b2" },
          { l:"Perfis de acesso", v:"6",       s:"AD · ST · SM · SO · CL · PV", acc:"#166534" },
        ].map(s => (
          <div key={s.l} className="sc" style={{ "--sc-accent":s.acc }}>
            <div className="sc-l">{s.l}</div><div className="sc-v">{s.v}</div><div className="sc-s">{s.s}</div>
          </div>
        ))}
      </div>
      <div className="two">
        <div className="card">
          <div className="ch"><span className="ch-t">Ecossistema de Sistemas</span></div>
          {[
            { init:"RT", bg:"#eff6ff", tc:"#1e3a5f", name:"Retaguarda", sub:"Web · 4 perfis",
              items:["Dashboard por perfil de acesso","Cadastros e configurações (Admin)","Atendimentos e roteiros (S. Treinamento)","Treinamento de promotores (S. Treinamento)","Execução e gôndola (S. Merchandising)","Desvios e exceções (S. Operacional)","Alertas inteligentes · Resumos automáticos (IA)"] },
            { init:"PC", bg:"#fef9c3", tc:"#92400e", name:"Portal do Cliente", sub:"Web · Indústria",
              items:["Visão operacional do dia","Book fotográfico antes/depois","Alertas proativos de ruptura","Tickets e solicitações","Relatórios por atendimento"] },
            { init:"AP", bg:"#f0fdf4", tc:"#166534", name:"App do Promotor", sub:"React Native · Offline-First",
              items:["Onboarding guiado (1ª vez)","Base de vídeos tutoriais","Jornada de trabalho guiada","Check-in com geofence","Diagnóstico e reposição por corredor","Localização + live map","Assistente de Voz (IA)"] },
          ].map((s, i) => (
            <div key={s.name} style={{ borderBottom:i<2?"1px solid var(--bd)":"none", padding:"12px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:8 }}>
                <div className="av" style={{ background:s.bg, color:s.tc }}>{s.init}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700 }}>{s.name}</div>
                  <div style={{ fontSize:10.5, color:"var(--t3)", fontFamily:"var(--mono)" }}>{s.sub}</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px 12px" }}>
                {s.items.map(it => (
                  <div key={it} style={{ fontSize:12, color:"var(--t2)", display:"flex", gap:5, padding:"2px 0", alignItems:"flex-start" }}>
                    <span style={{ color:"var(--t4)", flexShrink:0, marginTop:2 }}>·</span>{it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div className="card">
            <div className="ch"><span className="ch-t">Perfis de Acesso</span></div>
            {[
              { init:"AD", bg:"#f3f4f6", tc:"#374151", name:"Administrador",      role:"Retaguarda · Acesso total" },
              { init:"ST", bg:"#eff6ff", tc:"#1e3a5f", name:"Sup. Treinamento",  role:"Retaguarda · Campo + Treino" },
              { init:"SM", bg:"#f5f3ff", tc:"#581c87", name:"Sup. Merchandising", role:"Retaguarda · Merch" },
              { init:"SO", bg:"#f0fdf4", tc:"#166534", name:"Sup. Operacional",   role:"Retaguarda · Ops" },
              { init:"CL", bg:"#fef9c3", tc:"#92400e", name:"Cliente",            role:"Portal do Cliente" },
              { init:"PV", bg:"#f3f4f6", tc:"#52524e", name:"Promotor de Vendas", role:"App Mobile" },
            ].map(p => (
              <div key={p.name} className="lr" style={{ cursor:"default" }}>
                <div className="av" style={{ background:p.bg, color:p.tc }}>{p.init}</div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:600 }}>{p.name}</div>
                  <div style={{ fontSize:10.5, color:"var(--t3)", fontFamily:"var(--mono)" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ch"><span className="ch-t">Diferenciais</span></div>
            {[
              { l:"Portal do Cliente",  d:"Visibilidade indústria em real-time", cls:"g" },
              { l:"Offline-First",      d:"App funciona sem internet",           cls:"g" },
              { l:"Live Map",           d:"Promotores em tempo real",            cls:"b" },
              { l:"IA Embarcada",       d:"Assistente de voz, análise de fotos, sugestão de pedido, resumo inteligente", cls:"p" },
              { l:"Migração Assistida", d:"Prime → novo sistema guiado",         cls:"n" },
            ].map(d => (
              <div key={d.l} className="lr" style={{ cursor:"default" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12.5, fontWeight:600 }}>{d.l}</div>
                  <div style={{ fontSize:11, color:"var(--t3)" }}>{d.d}</div>
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
          { l:"Features IA",        v:"5",   s:"Desenvolvidas M1–M8 pelo cientista",  acc:"#7c3aed" },
          { l:"Assistente de Voz",  v:"M4",  s:"Pronto no mês 4",                   acc:"#0891b2" },
          { l:"Ciência de Dados",   v:"8m",  s:"Cientista Sênior full time M1–M8",  acc:"#0891b2" },
          { l:"Sustentação IA",     v:"M8",  s:"Ajustes e homologação final",        acc:"#7c3aed" },
        ].map(s => (
          <div key={s.l} className="sc" style={{ "--sc-accent":s.acc }}>
            <div className="sc-l">{s.l}</div><div className="sc-v">{s.v}</div><div className="sc-s">{s.s}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="ch"><span className="ch-t">Desenvolvidas em Paralelo · M1–M8</span><span className="ch-s">Cientista de Dados Sênior full time M1–M8</span></div>
        <div style={{ padding:"14px 16px", background:"#ecfeff", borderBottom:"1px solid #a5f3fc", display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"#0891b2", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:18, flexShrink:0 }}>✦</div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:"#0e7490", marginBottom:4 }}>Cientista de Dados Sênior — 8 meses full time (M1–M8)</div>
            <div style={{ fontSize:12.5, color:"#155e75", lineHeight:1.65 }}>
              As IAs são desenvolvidas em paralelo ao restante do produto — não como uma camada adicionada depois. O cientista atua desde o primeiro dia junto aos desenvolvedores, entregando cada módulo de IA conforme o sistema correspondente vai sendo construído.
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="ch"><span className="ch-t">Funcionalidades de IA · MVP</span></div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1px", background:"var(--bd)" }}>
          {[
            { name:"Assistente de Voz",          where:"App Promotor",           badge:"cy", month:"M4",
              desc:"O promotor registra observações por voz durante a execução no PDV. O sistema transcreve automaticamente, reduzindo cliques e acelerando o preenchimento em campo.",
              use:["Observações de diagnóstico do PDV","Registro de rupturas identificadas","Notas durante a reposição","Comunicação rápida com supervisor"] },
            { name:"Análise Automática de Fotos", where:"App · Retaguarda",       badge:"p",  month:"M1–M6",
              desc:"O sistema analisa automaticamente as fotos capturadas pelo promotor no PDV, identificando problemas de exposição, rupturas e desvios de planograma sem intervenção manual.",
              use:["Detecção de ruptura por imagem","Análise de posicionamento de produto","Conformidade com planograma","Alertas visuais automáticos para o supervisor"] },
            { name:"Enriquecimento de Base",      where:"Backend · Dados",        badge:"p",  month:"M1–M2",
              desc:"Construção de uma base de dados rica com fotos dos produtos, labels e metadados, que alimenta os modelos de análise visual e melhora a precisão ao longo do tempo.",
              use:["Cadastro visual de produtos com labels","Treinamento contínuo dos modelos","Base de referência para análise de gôndola","Exportação para relatórios visuais"] },
            { name:"Sugestão de Pedido",          where:"App Promotor",           badge:"cy", month:"M5–M7",
              desc:"Com base no histórico de vendas, ruptura identificada e nível de estoque, o sistema sugere automaticamente os produtos e quantidades a repor em cada PDV.",
              use:["Sugestão por corredor e categoria","Baseada em histórico e sazonalidade","Redução de rupturas por falta de pedido","Aprovação rápida pelo promotor"] },
            { name:"Resumo Inteligente",          where:"Retaguarda · SO + Portal",badge:"p", month:"M7",
              desc:"Geração automática de sínteses de atendimento — o que foi executado, o que foi encontrado e o que precisa de atenção. Elimina relatórios manuais.",
              use:["Resumo do atendimento ao supervisor","Síntese diária por promotor","Consolidação de pendências","Relatório automático para o cliente"] },
          ].map(c => (
            <div key={c.name} style={{ background:"var(--sf)", padding:"16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", gap:8, marginBottom:6 }}>
                <div style={{ fontSize:13, fontWeight:700 }}>{c.name}</div>
                <span className="badge n" style={{ fontSize:9 }}>{c.month}</span>
              </div>
              <div style={{ marginBottom:10 }}><span className={`badge ${c.badge}`}>{c.where}</span></div>
              <p style={{ fontSize:12, color:"var(--t3)", lineHeight:1.65, marginBottom:10 }}>{c.desc}</p>
              <div className="sec-lbl" style={{ marginBottom:6, fontSize:9 }}>Casos de uso</div>
              {c.use.map(u => (
                <div key={u} style={{ fontSize:12, color:"var(--t2)", display:"flex", gap:5, padding:"3px 0" }}>
                  <span style={{ color:"var(--t4)" }}>·</span>{u}
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
const TYPE_META = {
  feature:   { icon:"▣", label:"Feature"   },
  ia:        { icon:"✦", label:"IA"        },
  config:    { icon:"⚙", label:"Config"    },
  qa:        { icon:"⚐", label:"QA"        },
  migration: { icon:"→", label:"Migração"  },
};

const TYPE_COLOR_OVERRIDE = {
  qa:        "#b45309",
  migration: "#dc2626",
};

function FeatureBar({ color, s, e, type, months }) {
  return (
    <tr className="ft-feature-row">
      <td style={{ padding:0, width:200 }}>
        <div className="ft-name-cell">
          <div className="ft-sidebar" style={{ background: TYPE_COLOR_OVERRIDE[type] || color }} />
          <div className="ft-name-inner">
            <span className="ft-icon">{TYPE_META[type]?.icon}</span>
            <span className="ft-label">{months}</span>
            {type === "ia" && <span className="ft-ia-badge">IA</span>}
          </div>
        </div>
      </td>
      {Array.from({ length: RM_MONTHS }, (_, i) => {
        const m = i + 1;
        const active = m >= s && m <= e;
        const isFirst = m === s;
        const isLast  = m === e;
        const barColor = TYPE_COLOR_OVERRIDE[type] || color;
        let radius = "0";
        if (isFirst && isLast) radius = "4px";
        else if (isFirst)      radius = "4px 0 0 4px";
        else if (isLast)       radius = "0 4px 4px 0";
        return (
          <td key={i} className="ft-month-cell">
            {active && (
              <div className="ft-bar" style={{ background: barColor, borderRadius: radius, opacity: type==="ia"?0.8:0.88 }}>
                {isLast && <span style={{ fontSize:9, fontWeight:700, letterSpacing:".04em", mixBlendMode:"overlay", opacity:1, color:"white" }}>M{m}</span>}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

function Roadmap() {
  const MILESTONES = [
    { m:"M4",    label:"Dev completo · App + Retaguarda", desc:"Todas as features desenvolvidas e prontas para QA", color:"#166534" },
    { m:"M5–M6", label:"Homologação + Migração",          desc:"QA de todos os sistemas + migração do Prime concluída", color:"#d97706" },
    { m:"M6",    label:"Go-live",                         desc:"Todos os sistemas em produção", color:"#16a34a" },
    { m:"M7–M8", label:"IA Avançada + Sustentação",       desc:"Sugestão de pedido, resumo inteligente, ajustes finais", color:"#7c3aed" },
  ];

  return (
    <div className="pg">
      {/* Legend */}
      <div className="card">
        <div className="ch"><span className="ch-t">Legenda</span><span className="ch-s">8 meses · dev M1–M4 · homolog+migração M5–M6 · IA avançada M7–M8</span></div>
        <div style={{ padding:"12px 16px", display:"flex", gap:20, flexWrap:"wrap", alignItems:"center" }}>
          {[
            { color:"#1e3a5f", label:"Retaguarda" },
            { color:"#166534", label:"App do Promotor" },
            { color:"#92400e", label:"Portal do Cliente" },
            { color:"#b45309", label:"Homologação & QA" },
            { color:"#dc2626", label:"Migração do Prime" },
          ].map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:24, height:10, borderRadius:3, background:l.color, opacity:.85 }} />
              <span style={{ fontSize:11.5, color:"var(--t2)", fontWeight:500 }}>{l.label}</span>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:8 }}>
            <span className="ft-ia-badge">IA</span>
            <span style={{ fontSize:11.5, color:"var(--t2)", fontWeight:500 }}>Feature de IA</span>
          </div>
        </div>
      </div>

      {/* Feature table */}
      <div className="card" style={{ overflowX:"auto" }}>
        <table className="ft-table">
          <thead>
            <tr>
              <th style={{ width:200, textAlign:"left", paddingLeft:16, fontSize:10, color:"var(--t3)", fontFamily:"var(--mono)", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", background:"#f9fafb", borderBottom:"1px solid var(--bd)", padding:"10px 12px 10px 16px" }}>
                Feature
              </th>
              {RM_MONTH_META.map((m, i) => (
                <th key={i} style={{ textAlign:"center", fontSize:13, fontWeight:700, color:m.headerColor, background:m.bg, borderBottom:"1px solid var(--bd)", borderLeft:"1px solid var(--bd)", padding:"10px 4px", fontFamily:"var(--mono)" }}>
                  {m.label}
                </th>
              ))}
            </tr>
            {/* Phase labels */}
            <tr>
              <td style={{ background:"#f9fafb", borderBottom:"1px solid var(--bd)", padding:"4px 16px" }}>
                <span style={{ fontSize:9, color:"var(--t4)", fontFamily:"var(--mono)", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Fase</span>
              </td>
              {RM_MONTH_META.map((m, i) => (
                <td key={i} style={{ background:m.bg, textAlign:"center", fontSize:9, color:m.headerColor, fontFamily:"var(--mono)", fontWeight:500, borderBottom:"1px solid var(--bd)", borderLeft:"1px solid var(--bd)", padding:"4px 2px", opacity:.75 }}>
                  {m.phase}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {RM_GROUPS.map((group) => (
              <>
                {/* Group header row */}
                <tr key={`grp-${group.system}`}>
                  <td colSpan={RM_MONTHS + 1} style={{ padding:0, background:"var(--bg)", borderBottom:"1px solid var(--bd)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px" }}>
                      <div style={{ width:18, height:18, borderRadius:4, background:group.color+"18", color:group.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, border:`1px solid ${group.color}33` }}>
                        {group.icon}
                      </div>
                      <span style={{ fontSize:10.5, fontWeight:700, color:group.color, letterSpacing:".06em", textTransform:"uppercase", fontFamily:"var(--mono)" }}>
                        {group.system}
                      </span>
                    </div>
                  </td>
                </tr>
                {/* Feature rows */}
                {group.features.map((feat) => (
                  <FeatureBar key={feat.name} color={group.color} s={feat.s} e={feat.e} type={feat.type} months={feat.name} />
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Milestones */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        {MILESTONES.map(mk => (
          <div key={mk.m} className="card">
            <div style={{ height:3, background:mk.color }} />
            <div style={{ padding:"12px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
                <div style={{ width:8, height:8, border:`2px solid ${mk.color}`, transform:"rotate(45deg)", borderRadius:1, flexShrink:0 }} />
                <div style={{ fontSize:10, fontFamily:"var(--mono)", fontWeight:700, color:mk.color }}>{mk.m}</div>
              </div>
              <div style={{ fontSize:12.5, fontWeight:700, color:"var(--t)", marginBottom:4, lineHeight:1.3 }}>{mk.label}</div>
              <div style={{ fontSize:11.5, color:"var(--t3)", lineHeight:1.5 }}>{mk.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EQUIPE ──────────────────────────────────────────────────── */
function Equipe() {
  const TOTAL_M = 6;
  const TEAM = [
    { role:"Product Designer Sênior", init:"DS", color:"#7c3aed", bg:"#f5f3ff",
      ded:"Full time M1–M3 · Part time M4–M6",
      segs:[{s:1,e:3,ft:true},{s:4,e:6,ft:false}],
      resp:["Design system e componentes","Wireframes e protótipos Figma","Telas App (React Native)","Telas web Retaguarda e Portal","Handoff técnico para devs"] },
    { role:"Backend Sênior", init:"BE", color:"#1e3a5f", bg:"#eff6ff",
      ded:"Full time M1–M4 · Part time M5–M6",
      segs:[{s:1,e:4,ft:true},{s:5,e:6,ft:false}],
      resp:["Auth + RBAC + APIs","Integrações externas","Infra / DevOps","Suporte à migração M5–M6"] },
    { role:"Frontend Web Pleno", init:"FE", color:"#2563eb", bg:"#eff6ff",
      ded:"Full time M1–M4 · Part time M5–M6",
      segs:[{s:1,e:4,ft:true},{s:5,e:6,ft:false}],
      resp:["Retaguarda — todos os perfis","Portal do Cliente","Dashboard e relatórios","Integração com APIs"] },
    { role:"Mobile Sênior", init:"MB", color:"#166534", bg:"#f0fdf4",
      ded:"Full time M1–M4 · Part time M5–M6",
      segs:[{s:1,e:4,ft:true},{s:5,e:6,ft:false}],
      resp:["App do Promotor (React Native)","Offline-first + Sync","Geolocalização + Live Map","Push Notifications"] },
    { role:"Cientista de Dados Sênior", init:"CD", color:"#0891b2", bg:"#ecfeff",
      ded:"Full time M1–M8",
      segs:[{s:1,e:8,ft:true}],
      resp:["Enriquecimento de base (M1–M2)","Análise automática de fotos (M1–M6)","Assistente de Voz (M4)","Sugestão de pedido (M5–M7)","Resumo inteligente (M7) · Sustentação M8"] },
    { role:"QA / Testes", init:"QA", color:"#b45309", bg:"#fffbeb",
      ded:"Full time M4–M6",
      segs:[{s:4,e:6,ft:true}],
      resp:["Testes end-to-end todos os sistemas","Testes de carga e offline","Validação de geofence e map","Aprovação para go-live"] },
  ];

  const mMeta = [
    { label:"M1", bg:"#fff1f2", color:"#e11d48", phase:"Desenvolvimento" },
    { label:"M2", bg:"#fff1f2", color:"#e11d48", phase:"Desenvolvimento" },
    { label:"M3", bg:"#ecfdf5", color:"#059669", phase:"Dev + Migração inicia" },
    { label:"M4", bg:"#ecfdf5", color:"#059669", phase:"Dev + Migração" },
    { label:"M5", bg:"#fffbeb", color:"#d97706", phase:"Homologação + Migração" },
    { label:"M6", bg:"#fffbeb", color:"#d97706", phase:"Homologação + Migração" },
    { label:"M7", bg:"#f5f3ff", color:"#7c3aed", phase:"IA Avançada" },
    { label:"M8", bg:"#f0fdf4", color:"#059669", phase:"Sustentação · IA" },
  ];

  return (
    <div className="pg">
      <div className="stat-row">
        {[
          { l:"Pessoas no time",  v:"6",       s:"Papéis distintos e complementares", acc:"#1e3a5f" },
          { l:"Período",          v:"8 meses",  s:"M1–M6 dev/homolog · M7–M8 IA",      acc:"#7c3aed" },
          { l:"IA embarcada",     v:"M1–M8",   s:"Cientista de dados full time",       acc:"#0891b2" },
          { l:"Go-live",          v:"M6",      s:"Sistemas em produção · IA continua", acc:"#16a34a" },
        ].map(s => (
          <div key={s.l} className="sc" style={{ "--sc-accent":s.acc }}>
            <div className="sc-l">{s.l}</div><div className="sc-v">{s.v}</div><div className="sc-s">{s.s}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflowX:"auto" }}>
        <div className="ch"><span className="ch-t">Composição e Dedicação por Mês</span></div>
        <table style={{ minWidth:700 }}>
          <thead>
            <tr>
              <th style={{ width:220, paddingLeft:16 }}>Papel</th>
              <th style={{ width:160 }}>Dedicação</th>
              {mMeta.map((m,i) => (
                <th key={i} style={{ textAlign:"center", background:m.bg, color:m.color, fontFamily:"var(--mono)", fontSize:12, fontWeight:700, borderLeft:"1px solid var(--bd)", verticalAlign:"middle" }}>
                  <div>{m.label}</div>
                  <div style={{ fontSize:8, fontWeight:500, color:m.color, opacity:.7, whiteSpace:"nowrap", overflow:"hidden", maxWidth:60, margin:"2px auto 0" }}>{m.phase}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TEAM.map(t => (
              <tr key={t.role} style={{ borderBottom:"1px solid var(--bd)" }}>
                <td style={{ paddingLeft:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:26, height:26, borderRadius:6, background:t.bg, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, flexShrink:0, border:`1px solid ${t.color}22` }}>{t.init}</div>
                    <span style={{ fontSize:12.5, fontWeight:600, color:"var(--t)" }}>{t.role}</span>
                  </div>
                </td>
                <td style={{ fontSize:11, color:"var(--t3)", fontFamily:"var(--mono)" }}>{t.ded}</td>
                {mMeta.map((m,i) => {
                  const mn = i + 1;
                  const seg = t.segs.find(s => mn >= s.s && mn <= s.e);
                  return (
                    <td key={i} style={{ padding:"6px 3px", borderLeft:"1px solid var(--bd)", background:m.bg+"44", textAlign:"center" }}>
                      {seg && (
                        <div style={{ height:20, borderRadius:3, background:t.color, opacity:seg.ft?0.85:0.35,
                          backgroundImage:seg.ft?undefined:"repeating-linear-gradient(45deg,rgba(255,255,255,.4) 0px,rgba(255,255,255,.4) 2px,transparent 2px,transparent 5px)" }} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display:"flex", gap:16, padding:"10px 16px", borderTop:"1px solid var(--bd)", background:"var(--bg)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:20, height:10, borderRadius:2, background:"#374151", opacity:.85 }} />
            <span style={{ fontSize:11, color:"var(--t3)" }}>Full time</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:20, height:10, borderRadius:2, background:"#374151", opacity:.35,
              backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,.5) 0px,rgba(255,255,255,.5) 2px,transparent 2px,transparent 5px)" }} />
            <span style={{ fontSize:11, color:"var(--t3)" }}>Part time / apoio</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="ch"><span className="ch-t">Responsabilidades por Papel</span></div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"var(--bd)" }}>
          {TEAM.map(t => (
            <div key={t.role} style={{ background:"var(--sf)", padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:t.bg, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9.5, fontWeight:700, border:`1px solid ${t.color}22` }}>{t.init}</div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:"var(--t)", lineHeight:1.2 }}>{t.role}</div>
                  <div style={{ fontSize:10, color:t.color, fontFamily:"var(--mono)", fontWeight:500 }}>{t.ded.split("·")[0].trim()}</div>
                </div>
              </div>
              {t.resp.map(r => (
                <div key={r} style={{ fontSize:12, color:"var(--t2)", display:"flex", gap:5, padding:"3px 0", borderBottom:"1px solid var(--bd)" }}>
                  <span style={{ color:t.color, flexShrink:0 }}>·</span>{r}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ESCOPO ──────────────────────────────────────────────────── */
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
          <button key={t.id} className={`tab-btn${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab==="retaguarda" && (
        <div className="alert-b a"><span>◉</span>
          <p><strong>Sistema unificado:</strong> a Retaguarda é uma única aplicação web com 4 perfis — Admin, Sup. Treinamento, S. Merchandising e S. Operacional. Cada perfil vê apenas os dados da sua hierarquia.</p>
        </div>
      )}
      {tab==="portal" && (
        <div className="alert-b g"><span>★</span>
          <p><strong>Diferencial:</strong> o Portal oferece visibilidade operacional em tempo real com book fotográfico e gestão de tickets.</p>
        </div>
      )}
      <div className="card">
        <div className="ch">
          <span className="ch-t">{TABS.find(t2=>t2.id===tab)?.label}</span>
          <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
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
                <td><span className={`tag ${r.tag}`}>{r.tag==="inc"?"Incluído":"Fase 2"}</span></td>
                <td style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--t3)" }}>{r.obs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ROOT ────────────────────────────────────────────────────── */
const PAGES = {
  overview:Overview, arquitetura:Arquitetura, ia:IA,
  roadmap:Roadmap, equipe:Equipe, escopo:Escopo,
};

export default function App() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  const [active, setActive] = useState("overview");
  const Page = PAGES[active];
  const [title, sub] = TITLES[active];

  function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (pw === "abtm_e_guidance") {
      setAuth(true);
      setErr(false);
    } else {
      setErr(true);
      setShake(true);
      setPw("");
      setTimeout(() => setShake(false), 500);
    }
  }

  if (!auth) {
    return (
      <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#1e40af 100%)",
        fontFamily:"'Inter',system-ui,sans-serif" }}>
        <style>{S}</style>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
          @keyframes loginFadeIn {
            from{opacity:0;transform:translateY(20px)}
            to{opacity:1;transform:translateY(0)}
          }
          .login-card{animation:loginFadeIn .4s ease both}
          .login-card.shake{animation:shake .5s ease both}
          .login-input{width:100%;padding:11px 14px;border-radius:8px;border:1.5px solid #334155;background:#0f172a;color:#f1f5f9;font-size:14px;font-family:'JetBrains Mono',monospace;outline:none;transition:border .15s;letter-spacing:.05em}
          .login-input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.2)}
          .login-input.error{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.15)}
          .login-input::placeholder{color:#475569;letter-spacing:0}
          .login-btn{width:100%;padding:11px;border-radius:8px;border:none;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;font-size:13.5px;font-weight:600;cursor:pointer;transition:opacity .15s;font-family:'Inter',system-ui,sans-serif;letter-spacing:-.01em}
          .login-btn:hover{opacity:.9}
          .login-btn:active{opacity:.8}
        `}</style>
        <div className={`login-card${shake?" shake":""}`}
          style={{ background:"rgba(15,23,42,.85)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,.08)",
            borderRadius:16, padding:"40px 36px", width:380, boxShadow:"0 24px 64px rgba(0,0,0,.5)" }}>

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#1e3a5f,#2563eb)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800,
              color:"#fff", boxShadow:"0 4px 14px rgba(37,99,235,.4)" }}>G</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#f1f5f9", letterSpacing:"-.02em" }}>Guidance</div>
              <div style={{ fontSize:11, color:"#64748b", fontFamily:"'JetBrains Mono',monospace" }}>Proposta comercial · Confidencial</div>
            </div>
          </div>

          <div style={{ marginBottom:8, fontSize:20, fontWeight:700, color:"#f1f5f9", letterSpacing:"-.02em" }}>
            Acesso restrito
          </div>
          <div style={{ marginBottom:28, fontSize:13, color:"#64748b", lineHeight:1.6 }}>
            Este documento é confidencial. Insira a senha de acesso para continuar.
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input
              className={`login-input${err?" error":""}`}
              type="password"
              placeholder="Senha de acesso"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              onKeyDown={e => e.key === "Enter" && handleLogin(e)}
              autoFocus
            />
            {err && (
              <div style={{ fontSize:12, color:"#f87171", display:"flex", alignItems:"center", gap:5 }}>
                <span>✕</span> Senha incorreta. Tente novamente.
              </div>
            )}
            <button className="login-btn" onClick={handleLogin}>Entrar →</button>
          </div>

          <div style={{ marginTop:28, paddingTop:20, borderTop:"1px solid rgba(255,255,255,.06)",
            fontSize:11, color:"#334155", textAlign:"center", fontFamily:"'JetBrains Mono',monospace" }}>
            ABTM + GUIDANCE · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="root">
      <style>{S}</style>
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
              <button key={item.id} className={`ni${active===item.id?" active":""}`} onClick={() => setActive(item.id)}>
                <span className="ni-ic">{item.ic}</span>{item.label}
              </button>
            ))}
          </div>
        ))}
        <div className="sb-foot">
          <div className="sb-foot-inner">
            <div className="av" style={{ background:"linear-gradient(135deg,#1e3a5f,#2563eb)", color:"#fff", fontSize:10, fontWeight:700 }}>PF</div>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:"var(--t)" }}>Prog. Feedback</div>
              <div style={{ fontSize:10, color:"var(--t3)", fontFamily:"var(--mono)" }}>Proposta comercial</div>
            </div>
          </div>
        </div>
      </aside>

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
