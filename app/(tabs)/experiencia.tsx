import { ScrollView, View } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { SectionTitle } from '../../components/SectionTitle';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://express-resume.vercel.app';
const USUARIO_ID = 1;

export default function Experiencia() {
  const theme = useTheme();
  const accent = theme.colors.primary;
  const [experiencias, setExperiencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/experiencias`)
      .then((r) => r.json())
      .then((data) => setExperiencias(data.filter((e: any) => e.usuario_id === USUARIO_ID)))
      .finally(() => setLoading(false));
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
      contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
    >
      <SectionTitle title="Experiência Profissional" />

      {experiencias.length === 0 && (
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>
          Nenhuma experiência cadastrada.
        </Text>
      )}

      {experiencias.map((exp) => (
        <Card key={exp.id} style={{ marginBottom: 12 }}>
          <Card.Content style={{ paddingVertical: 14 }}>
            <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>
              {exp.cargo}
            </Text>
            <Text style={{ color: accent, fontSize: 13, marginTop: 2 }}>
              {exp.empresa}
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }}>
              {new Date(exp.data_inicio).toLocaleDateString('pt-BR')} —{' '}
              {exp.data_fim ? new Date(exp.data_fim).toLocaleDateString('pt-BR') : 'Atual'}
            </Text>
            {exp.descricao && (
              <Text style={{ fontSize: 13, marginTop: 8, lineHeight: 19 }}>
                {exp.descricao}
              </Text>
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}