import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { Bell, Tag, Info, CheckCircle } from 'lucide-react-native';

export default function NotificationsScreen() {
  const { notifications, markNotificationRead } = useUserStore();

  const getIcon = (type: string) => {
    switch(type) {
      case 'offer': return <Tag color={theme.colors.primary} size={24} />;
      case 'booking': return <CheckCircle color="green" size={24} />;
      case 'reminder': return <Bell color="orange" size={24} />;
      default: return <Info color={theme.colors.textSecondary} size={24} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>الإشعارات</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, !item.read && styles.unreadCard]}
            onPress={() => markNotificationRead(item.id)}
          >
            <View style={styles.iconContainer}>
              {getIcon(item.type)}
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, textAlign: 'right', marginTop: 40 },
  card: { flexDirection: 'row-reverse', backgroundColor: theme.colors.card, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.border },
  unreadCard: { backgroundColor: theme.colors.background, borderColor: theme.colors.primary },
  iconContainer: { marginLeft: 16, justifyContent: 'center' },
  contentContainer: { flex: 1, alignItems: 'flex-end' },
  title: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  message: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 8, textAlign: 'right' },
  date: { fontSize: 12, color: theme.colors.primary }
});
