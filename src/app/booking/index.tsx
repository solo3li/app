import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useBookingStore } from '@/store/useBookingStore';

export default function BookingScreen() {
  const router = useRouter();
  const { selectedShop, selectedBarber, selectedService, selectedTime, setTime, confirmBooking } = useBookingStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Generate some dummy times for today
  const availableTimes = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert('Missing Info', 'Please select a time for your appointment.');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      confirmBooking();
      setIsConfirmed(true);
    }, 1000);
  };

  const handleDone = () => {
    router.replace('/');
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
          <CheckCircle size={80} color={theme.colors.accent} style={{ marginBottom: 20 }} />
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successText}>We look forward to seeing you.</Text>
          
          <Pressable style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>BACK TO HOME</Text>
          </Pressable>
        </MotiView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={theme.colors.primary} size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Complete Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shop:</Text>
            <Text style={styles.summaryValue}>{selectedShop?.name || 'Not selected'}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Barber:</Text>
            <Text style={styles.summaryValue}>{selectedBarber?.name || 'Any Barber'}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service:</Text>
            <Text style={styles.summaryValue}>{selectedService?.name || 'Not selected'}</Text>
          </View>
          
          <View style={[styles.summaryRow, { borderBottomWidth: 0, marginTop: 10 }]}>
            <Text style={styles.totalLabel}>Total Price:</Text>
            <Text style={styles.totalValue}>{selectedService?.price || '$0'}</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.dateSelector}>
            <CalendarIcon size={20} color={theme.colors.primary} />
            <Text style={styles.dateText}>Today, Oct 24</Text>
          </View>
          
          <View style={styles.timeGrid}>
            {availableTimes.map((time, index) => {
              const isSelected = selectedTime === time;
              return (
                <MotiView 
                  key={index}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 100 }}
                >
                  <Pressable
                    style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                    onPress={() => setTime(time)}
                  >
                    <Clock size={16} color={isSelected ? theme.colors.card : theme.colors.primary} style={{ marginRight: 6 }} />
                    <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>{time}</Text>
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
        </View>

        {/* Payment Method (Dummy) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <View style={styles.radioSelected} />
            <Text style={styles.paymentText}>Pay at Shop (Cash/Card)</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <Pressable 
          style={[styles.confirmButton, !selectedTime && { opacity: 0.5 }]} 
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>CONFIRM BOOKING</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  backButton: { padding: 4 },
  headerTitle: { fontFamily: theme.typography.fontFamily.serif, fontSize: 20, color: theme.colors.primary, fontWeight: 'bold' },
  container: { flex: 1, padding: theme.spacing.lg },
  
  summaryCard: { backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border, marginBottom: theme.spacing.xl, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  summaryLabel: { fontSize: 16, color: theme.colors.text, opacity: 0.8 },
  summaryValue: { fontSize: 16, color: theme.colors.primary, fontWeight: 'bold', fontFamily: theme.typography.fontFamily.serif },
  totalLabel: { fontSize: 18, color: theme.colors.text, fontWeight: 'bold' },
  totalValue: { fontSize: 22, color: theme.colors.accent, fontWeight: 'bold', fontFamily: theme.typography.fontFamily.serif },
  
  section: { marginBottom: theme.spacing.xl },
  sectionTitle: { fontFamily: theme.typography.fontFamily.serif, fontSize: 20, color: theme.colors.primary, fontWeight: 'bold', marginBottom: theme.spacing.md },
  
  dateSelector: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.sm, borderWidth: 1, borderColor: theme.colors.border, marginBottom: theme.spacing.md },
  dateText: { marginLeft: 12, fontSize: 16, color: theme.colors.primary, fontWeight: 'bold' },
  
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '48%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.card, paddingVertical: 16, borderRadius: theme.borderRadius.sm, borderWidth: 1, borderColor: theme.colors.border, marginBottom: theme.spacing.md },
  timeSlotSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  timeText: { fontSize: 14, color: theme.colors.primary, fontWeight: 'bold' },
  timeTextSelected: { color: theme.colors.card },
  
  paymentMethod: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.sm, borderWidth: 1, borderColor: theme.colors.accent },
  radioSelected: { width: 20, height: 20, borderRadius: 10, borderWidth: 6, borderColor: theme.colors.primary, marginRight: 12 },
  paymentText: { fontSize: 16, color: theme.colors.primary, fontWeight: 'bold' },
  
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: theme.spacing.lg, backgroundColor: theme.colors.background, borderTopWidth: 1, borderTopColor: theme.colors.border },
  confirmButton: { backgroundColor: theme.colors.accent, paddingVertical: 16, borderRadius: theme.borderRadius.md, alignItems: 'center' },
  confirmButtonText: { color: theme.colors.card, fontFamily: theme.typography.fontFamily.bold, fontSize: 16, letterSpacing: 1 },

  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl, backgroundColor: theme.colors.primary },
  successTitle: { fontFamily: theme.typography.fontFamily.serif, fontSize: 28, color: theme.colors.card, fontWeight: 'bold', marginBottom: 12 },
  successText: { fontSize: 16, color: theme.colors.border, marginBottom: 40, textAlign: 'center' },
  doneButton: { backgroundColor: theme.colors.card, paddingVertical: 16, paddingHorizontal: 32, borderRadius: theme.borderRadius.md, width: '100%', alignItems: 'center' },
  doneButtonText: { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold, fontSize: 16, letterSpacing: 1 },
});
