const BASE_URL = 'https://express-resume.vercel.app';
const USUARIO_ID = 1;

export async function getProjetos() {
  const res = await fetch(`${BASE_URL}/projetos`);
  const data = await res.json();
  console.log('projetos:', data);  // ← adiciona essa linha
  return data.filter((p: any) => p.usuario_id === USUARIO_ID);
}

export async function getHabilidades() {
  const res = await fetch(`${BASE_URL}/habilidades`);
  const data = await res.json();
  return data.filter((h: any) => h.usuario_id === USUARIO_ID);
}

export async function getContatos() {
  const res = await fetch(`${BASE_URL}/contatos`);
  const data = await res.json();
  return data.filter((c: any) => c.usuario_id === USUARIO_ID);
}