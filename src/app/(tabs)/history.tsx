import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useBookingStore } from '@/store/useBookingStore';
import { Calendar, Clock, Star } from 'lucide-react-native';
import { RatingModal } from '@/components/RatingModal';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const history = useBookingStore((state) => state.bookingHistory);
  const rebook = useBookingStore((state) => state.rebook);
  const router = useRouter();

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleRebook = (item: any) => {
    rebook(item);
    router.push('/booking');
  };

  const handleRate = (item: any) => {
    setSelectedBooking(item);
    setRatingModalVisible(true);
  };

  const handleRatingSubmit = (ratings: any) => {
    setRatingModalVisible(false);
    Alert.alert('شكراً لك', 'تم إرسال تقييمك بنجاح');
  };

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Calendar color={theme.colors.textSecondary} size={64} />
        <Text style={styles.emptyText}>لا يوجد حجوزات سابقة</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>سجل الحجوزات</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.shopName}>{item.shop.name}</Text>
              <Text style={[styles.status, { color: item.status === 'Cancelled' ? 'red' : theme.colors.primary }]}>
                {item.status === 'Upcoming' ? 'قادم' : item.status === 'Completed' ? 'مكتمل' : 'ملغي'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>{item.time}</Text>
              <Clock color={theme.colors.textSecondary} size={16} style={{ marginLeft: 8 }} />
              <Text style={styles.rowText}>{new Date(item.date).toLocaleDateString('ar-EG')}</Text>
              <Calendar color={theme.colors.textSecondary} size={16} style={{ marginLeft: 8 }} />
            </View>
            <View style={styles.row}>
              <Text style={styles.barberName}>الحلاق: {item.barber.name}</Text>
            </View>
            <View style={styles.servicesContainer}>
              {item.services.map(s => (
                <View key={s.id} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{s.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>{item.totalPrice} جنيه</Text>
              <View style={styles.actions}>
                {item.status === 'Completed' && (
                  <TouchableOpacity style={styles.rateBtn} onPress={() => handleRate(item)}>
                    <Star color={theme.colors.card} size={16} />
                    <Text style={styles.rateText}>تقييم</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.rebookBtn} onPress={() => handleRebook(item)}>
                  <Text style={styles.rebookText}>إعادة حجز</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {selectedBooking && (
        <RatingModal 
          visible={ratingModalVisible}
          onClose={() => setRatingModalVisible(false)}
          onSubmit={handleRatingSubmit}
          shopName={selectedBooking.shop.name}
          barberName={selectedBooking.barber.name}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  emptyContainer: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: theme.colors.textSecondary, fontSize: 18, marginTop: 16, fontWeight: 'bold' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, textAlign: 'right', marginTop: 40 },
  card: { backgroundColor: theme.colors.card, padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: theme.colors.border },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 12 },
  shopName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  status: { fontSize: 14, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 },
  rowText: { color: theme.colors.textSecondary, marginLeft: 16, fontSize: 14, fontWeight: 'bold' },
  barberName: { color: theme.colors.text, fontSize: 14, fontWeight: 'bold', textAlign: 'right', width: '100%' },
  servicesContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginTop: 8 },
  serviceTag: { backgroundColor: theme.colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 8, marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
  serviceText: { color: theme.colors.textSecondary, fontSize: 12 },
  cardFooter: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 12 },
  price: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primary },
  actions: { flexDirection: 'row-reverse' },
  rebookBtn: { backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  rebookText: { color: theme.colors.card, fontWeight: 'bold' },
  rateBtn: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.accent, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  rateText: { color: theme.colors.card, fontWeight: 'bold', marginRight: 4 }
});
