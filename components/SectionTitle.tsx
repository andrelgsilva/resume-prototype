import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function SectionTitle({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <View
        style={{
          width: 4,
          height: 18,
          borderRadius: 2,
          backgroundColor: theme.colors.primary,
          marginRight: 8,
        }}
      />
      <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
  );
}