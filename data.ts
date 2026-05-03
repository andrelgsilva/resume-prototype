// ─── TIPOS ────────────────────────────────────────────────────────────────────

export type Projeto = {
  id: number;
  titulo: string;
  resumo: string;
  descricao: string;
  tecnologias: string[];
  url: string;
};

export type Habilidade = {
  nome: string;
  nivel: number;
};

export type Contato = {
  label: string;
  url: string;
  emoji: string;
};

// ─── PERFIL ───────────────────────────────────────────────────────────────────

export const PERFIL = {
  nome: 'André Luís Gomes',
  cargo: 'Desenvolvedor Fullstack',
  frase: 'Transformando ideias em produtos digitais.',
  sobre:
    'Sou desenvolvedor Fullstack com experiência em aplicações mobile e web. Residente em Recife - PE, tenho foco em criar soluções práticas e bem estruturadas, do backend ao app final. Estou sempre em busca de novos desafios e aprendizados.',
  foto: 'https://github.com/andrelgsilva.png',
  formacao: 'Sistemas para Internet — UNICAP (em andamento)',
  localizacao: 'Recife, PE — Brasil',
};

// ─── PROJETOS ─────────────────────────────────────────────────────────────────

export const PROJETOS: Projeto[] = [
  {
    id: 1,
    titulo: 'Alerta Urbano',
    resumo: 'Plataforma para reportar problemas urbanos com integração de mapa.',
    descricao:
      'Aplicação que permite aos usuários reportar problemas urbanos como buracos, lixo e enchentes, com integração a mapas e backend robusto. O objetivo é facilitar a comunicação entre cidadãos e prefeitura de forma simples e visual.',
    tecnologias: ['React Native', 'Node.js', 'PostgreSQL'],
    url: 'https://github.com/andrelgsilva',
  },
  {
    id: 2,
    titulo: 'API de Currículo',
    resumo: 'API REST com Node.js, Express e PostgreSQL.',
    descricao:
      'API desenvolvida para gerenciar dados de currículo, com rotas organizadas, integração com banco de dados PostgreSQL e estrutura modular. Permite criar, listar e atualizar informações profissionais via endpoints REST.',
    tecnologias: ['Node.js', 'Express', 'PostgreSQL'],
    url: 'https://github.com/andrelgsilva',
  },
];

// ─── HABILIDADES ──────────────────────────────────────────────────────────────

export const HABILIDADES: Habilidade[] = [
  { nome: 'React Native', nivel: 80 },
  { nome: 'Node.js', nivel: 75 },
  { nome: 'Java', nivel: 65 },
  { nome: 'PostgreSQL', nivel: 70 },
  { nome: 'Express', nivel: 75 },
  { nome: 'TypeScript', nivel: 65 },
];

// ─── CONTATOS ─────────────────────────────────────────────────────────────────

export const CONTATOS: Contato[] = [
  { label: 'GitHub', url: 'https://github.com/andrelgsilva', emoji: '' },
  { label: 'WhatsApp', url: 'https://wa.me/5581992326315', emoji: '' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/andr%C3%A9-da-silva-623875229/',
    emoji: '',
  },
  {
    label: 'Email',
    url: 'mailto:andrelmss.gomes021@gmail.com',
    emoji: '',
  },
];