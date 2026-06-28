import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
const MotiView = View as any;
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useBookingStore } from '@/store/useBookingStore';

export default function BookingScreen() {
  const router = useRouter();
  const { 
    selectedShop, selectedBarber, selectedServices, 
    selectedTime, setTime, 
    selectedPaymentMethod, setPaymentMethod,
    setDate,
    confirmBooking 
  } = useBookingStore();
  
  const [isConfirmed, setIsConfirmed] = useState(false);

  const availableTimes = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];
  const paymentMethods = [
    { id: 'cash', label: 'كاش في المحل' },
    { id: 'online', label: 'دفع أونلاين (بطاقة)' },
    { id: 'deposit', label: 'دفع عربون (حجز موعد)' }
  ] as const;

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.map(s => parseInt(s.duration)).reduce((sum, d) => sum + (isNaN(d) ? 30 : d), 0);

  // Set date to today mock
  React.useEffect(() => {
    setDate(new Date());
  }, []);

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert('تنبيه', 'يرجى اختيار وقت الحجز');
      return;
    }
    if (!selectedPaymentMethod) {
      Alert.alert('تنبيه', 'يرجى اختيار طريقة الدفع');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      confirmBooking();
      setIsConfirmed(true);
    }, 1000);
  };

  const handleDone = () => {
    router.replace('/(tabs)/history');
  };

  if (isConfirmed) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <MotiView 
          style={styles.successContainer}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <Ionicons name="checkmark-circle" size={80} color="green" style={{ marginBottom: 20 }} />
          <Text style={styles.successTitle}>تم تأكيد الحجز!</Text>
          <Text style={styles.successText}>بانتظارك في الموعد المحدد.</Text>
          
          <Pressable style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>عرض الحجوزات</Text>
          </Pressable>
        </MotiView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>تأكيد الحجز</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-forward" color={theme.colors.primary} size={24} />
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>الملخص</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>{selectedShop?.name}</Text>
            <Text style={styles.summaryLabel}>الصالون:</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>{selectedBarber?.name}</Text>
            <Text style={styles.summaryLabel}>الحلاق:</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              {selectedServices.map(s => (
                <Text key={s.id} style={styles.summaryValueSmall}>- {s.name}</Text>
              ))}
            </View>
            <Text style={styles.summaryLabel}>الخدمات:</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryValueSmall}>{totalDuration} دقيقة</Text>
            <Text style={styles.summaryLabel}>المدة التقريبية:</Text>
          </View>
          
          <View style={[styles.summaryRow, { borderBottomWidth: 0, marginTop: 10 }]}>
            <Text style={styles.totalValue}>{totalPrice} جنيه</Text>
            <Text style={styles.totalLabel}>الإجمالي:</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر الوقت</Text>
          <View style={styles.dateSelector}>
            <Text style={styles.dateText}>اليوم, {new Date().toLocaleDateString('ar-EG')}</Text>
            <Ionicons name="calendar" size={20} color={theme.colors.primary} style={{ marginLeft: 8 }} />
          </View>
          
          <View style={styles.timeGrid}>
            {availableTimes.map((time, index) => {
              const isSelected = selectedTime === time;
              return (
                <MotiView 
                  key={index}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 50 }}
                  style={{ width: '48%' }}
                >
                  <Pressable
                    style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                    onPress={() => setTime(time)}
                  >
                    <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>{time}</Text>
                    <Ionicons name="time" size={16} color={isSelected ? theme.colors.card : theme.colors.primary} style={{ marginLeft: 6 }} />
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          {paymentMethods.map((method) => {
            const isSelected = selectedPaymentMethod === method.id;
            return (
              <Pressable 
                key={method.id}
                style={[styles.paymentMethod, isSelected && styles.paymentMethodSelected]}
                onPress={() => setPaymentMethod(method.id as any)}
              >
                <Text style={[styles.paymentText, isSelected && styles.paymentTextSelected]}>{method.label}</Text>
                <View style={[styles.radio, isSelected && styles.radioSelected]} />
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <Pressable 
          style={[styles.confirmButton, (!selectedTime || !selectedPaymentMethod) && { opacity: 0.5 }]} 
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>تأكيد وحجز</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, color: theme.colors.primary, fontWeight: 'bold' },
  container: { flex: 1, padding: 16 },
  
  summaryCard: { backgroundColor: theme.colors.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  summaryLabel: { fontSize: 16, color: theme.colors.textSecondary, marginLeft: 8 },
  summaryValue: { fontSize: 16, color: theme.colors.text, fontWeight: 'bold', textAlign: 'left', flex: 1 },
  summaryValueSmall: { fontSize: 14, color: theme.colors.text, textAlign: 'left' },
  totalLabel: { fontSize: 18, color: theme.colors.text, fontWeight: 'bold', marginLeft: 8 },
  totalValue: { fontSize: 22, color: theme.colors.primary, fontWeight: 'bold' },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, color: theme.colors.primary, fontWeight: 'bold', marginBottom: 16, textAlign: 'right' },
  
  dateSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 16, backgroundColor: theme.colors.card, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 16 },
  dateText: { fontSize: 16, color: theme.colors.text, fontWeight: 'bold' },
  
  timeGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.card, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 12 },
  timeSlotSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  timeText: { fontSize: 14, color: theme.colors.text, fontWeight: 'bold' },
  timeTextSelected: { color: theme.colors.card },
  
  paymentMethod: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 16, backgroundColor: theme.colors.card, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 12 },
  paymentMethodSelected: { borderColor: theme.colors.primary, backgroundColor: theme.colors.background },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.colors.border, marginLeft: 12 },
  radioSelected: { borderWidth: 6, borderColor: theme.colors.primary },
  paymentText: { fontSize: 16, color: theme.colors.text, fontWeight: 'bold' },
  paymentTextSelected: { color: theme.colors.primary },
  
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: theme.colors.background, borderTopWidth: 1, borderTopColor: theme.colors.border },
  confirmButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  confirmButtonText: { color: theme.colors.card, fontSize: 18, fontWeight: 'bold' },

  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: theme.colors.background },
  successTitle: { fontSize: 28, color: theme.colors.text, fontWeight: 'bold', marginBottom: 12 },
  successText: { fontSize: 16, color: theme.colors.textSecondary, marginBottom: 40, textAlign: 'center' },
  doneButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, width: '100%', alignItems: 'center' },
  doneButtonText: { color: theme.colors.card, fontSize: 18, fontWeight: 'bold' },
});
