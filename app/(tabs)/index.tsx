import { ScrollView, View, Image } from 'react-native';
import { Text, Card, Chip, Button, useTheme, IconButton, ActivityIndicator } from 'react-native-paper';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../context/ThemeContext';
import { SectionTitle } from '../../components/SectionTitle';
import { PERFIL } from '../../data';
import { getProjetos, getHabilidades, getContatos } from '../../services/api';
import { useEffect, useState } from 'react';

function withOpacity(color: string, opacity: number): string {
  if (color.startsWith('rgb')) {
    return color.replace(/[\d.]+\)$/, `${opacity})`).replace('rgb(', 'rgba(');
  }
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const AVATAR_SIZE = 100;
const SECTION_GAP = 24;
const CARD_GAP = 12;
const H_PADDING = 20;

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { dark, toggleTheme } = useThemeContext();
  const accent = theme.colors.primary;

  const [projetos, setProjetos] = useState<any[]>([]);
  const [habilidades, setHabilidades] = useState<any[]>([]);
  const [contatos, setContatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [p, h, c] = await Promise.all([
          getProjetos(),
          getHabilidades(),
          getContatos(),
        ]);
        setProjetos(p);
        setHabilidades(h);
        setContatos(c);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: H_PADDING, paddingBottom: 48 }}
    >
      {/* ── TOGGLE TEMA ── */}
      <View style={{ alignItems: 'flex-end', marginBottom: 4 }}>
        <IconButton
          icon={dark ? 'weather-sunny' : 'weather-night'}
          size={22}
          onPress={toggleTheme}
          iconColor={accent}
        />
      </View>

      {/* ── HEADER ── */}
      <View style={{ alignItems: 'center', marginBottom: SECTION_GAP }}>
        <Image
          source={{ uri: PERFIL.foto }}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE / 2,
            borderWidth: 3,
            borderColor: accent,
          }}
        />
        <Text variant="headlineSmall" style={{ marginTop: 12, fontWeight: 'bold' }}>
          {PERFIL.nome}
        </Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, marginTop: 2 }}>
          {PERFIL.cargo}
        </Text>
        <Text style={{ marginTop: 6, fontStyle: 'italic', color: accent, fontSize: 13 }}>
          "{PERFIL.frase}"
        </Text>
      </View>

      {/* ── PROJETOS ── */}
      <SectionTitle title="Projetos em destaque" />
      {projetos.map((projeto) => (
        <Card
          key={projeto.id}
          style={{ marginBottom: CARD_GAP }}
          onPress={() =>
            router.push({ pathname: '/projeto/[id]', params: { id: projeto.id } })
          }
        >
          <Card.Content style={{ paddingVertical: 14 }}>
            <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>
              {projeto.nome}
            </Text>
            <Text style={{
              color: theme.colors.onSurfaceVariant,
              fontSize: 13,
              marginTop: 4,
              marginBottom: 10,
              lineHeight: 19,
            }}>
              {projeto.descricao}
            </Text>
            <Text style={{ marginTop: 10, color: accent, fontSize: 12 }}>
              Ver detalhes →
            </Text>
          </Card.Content>
        </Card>
      ))}

      {/* ── HABILIDADES ── */}
      <View style={{ marginTop: SECTION_GAP }}>
        <SectionTitle title="Habilidades principais" />
      </View>
      <Card style={{ marginBottom: SECTION_GAP }}>
        <Card.Content style={{ paddingVertical: 14 }}>
          {habilidades.map((h) => (
            <View key={h.nome} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: '600', fontSize: 13 }}>{h.nome}</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                  {h.nivel}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* ── CONTATOS ── */}
      <SectionTitle title="Contatos" />
      {contatos.map((contato) => (
        <Button
          key={contato.id}
          mode="contained"
          style={{ marginBottom: CARD_GAP }}
          onPress={() => Linking.openURL(contato.url)}
        >
          {contato.tipo}
        </Button>
      ))}
    </ScrollView>
  );
}