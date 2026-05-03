import { ScrollView, View, Image } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { Linking } from 'react-native';
import { SectionTitle } from '../../components/SectionTitle';
import { PERFIL } from '../../data';
import { getHabilidades, getContatos } from '../../services/api';
import { useEffect, useState } from 'react';

const AVATAR_SIZE = 100;
const SECTION_GAP = 24;
const H_PADDING = 20;

export default function Sobre() {
  const theme = useTheme();
  const accent = theme.colors.primary;

  const [habilidades, setHabilidades] = useState<any[]>([]);
  const [contatos, setContatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [h, c] = await Promise.all([getHabilidades(), getContatos()]);
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
      <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: SECTION_GAP }}>
        Sobre mim
      </Text>

      {/* ── PERFIL ── */}
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
        <Text variant="titleMedium" style={{ marginTop: 12, fontWeight: 'bold' }}>
          {PERFIL.nome}
        </Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, marginTop: 2 }}>
          {PERFIL.cargo}
        </Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13, marginTop: 4 }}>
          {PERFIL.localizacao}
        </Text>
      </View>

      {/* ── SOBRE ── */}
      <SectionTitle title="Quem sou eu" />
      <Card style={{ marginBottom: SECTION_GAP }}>
        <Card.Content style={{ paddingVertical: 14 }}>
          <Text style={{ lineHeight: 22, fontSize: 13, color: theme.colors.onSurface }}>
            {PERFIL.sobre}
          </Text>
        </Card.Content>
      </Card>

      {/* ── FORMAÇÃO ── */}
      <SectionTitle title="Formação" />
      <Card style={{ marginBottom: SECTION_GAP }}>
        <Card.Content style={{ paddingVertical: 14 }}>
          <Text style={{ fontWeight: '600', fontSize: 13 }}>{PERFIL.formacao}</Text>
        </Card.Content>
      </Card>

      {/* ── HABILIDADES ── */}
      <SectionTitle title="Habilidades" />
      <Card style={{ marginBottom: SECTION_GAP }}>
        <Card.Content style={{ paddingVertical: 14 }}>
          {habilidades.map((h) => (
            <View key={h.id} style={{ marginBottom: 12 }}>
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
      <Card>
        <Card.Content style={{ paddingVertical: 6 }}>
          {contatos.map((contato, index) => (
            <View
              key={contato.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < contatos.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.surfaceVariant,
              }}
            >
              <Text
                style={{ color: accent, flex: 1, fontSize: 14 }}
                onPress={() => Linking.openURL(contato.url)}
              >
                {contato.tipo}
              </Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>→</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}