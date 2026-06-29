import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '@/constants/theme';
import { useShopStore } from '@/store/useShopStore';
import { Package, ChevronRight, CheckCircle2, Circle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const orders = useShopStore((state) => state.orders);
  const router = useRouter();

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد التجهيز';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التوصيل';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return '#FF9800';
      default: return theme.colors.textSecondary;
    }
  };

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronRight color={theme.colors.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>طلباتي</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Package color={theme.colors.textSecondary} size={64} />
          <Text style={styles.emptyText}>لا توجد طلبات سابقة</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronRight color={theme.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>طلباتي من المتجر</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>طلب #{item.id.replace('ord_', '').toUpperCase()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{getStatusText(item.status)}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.detailText}>التاريخ: {new Date(item.date).toLocaleDateString('ar-EG')}</Text>
              <Text style={styles.detailText}>الإجمالي: {item.totalAmount} ج</Text>
            </View>
            
            <View style={styles.trackingContainer}>
              {item.trackingSteps.map((step, index) => (
                <View key={index} style={styles.trackingStep}>
                  {/* Icon */}
                  <View style={styles.stepIconContainer}>
                    {step.completed ? (
                      <CheckCircle2 color={theme.colors.primary} size={20} fill={theme.colors.primary + '30'} />
                    ) : (
                      <Circle color={theme.colors.border} size={20} />
                    )}
                  </View>
                  
                  {/* Line */}
                  {index < item.trackingSteps.length - 1 && (
                    <View style={[styles.stepLine, step.completed && styles.stepLineCompleted]} />
                  )}
                  
                  {/* Text */}
                  <View style={styles.stepTextContainer}>
                    <Text style={[styles.stepTitle, step.completed && styles.stepTitleCompleted]}>{step.title}</Text>
                    {step.date ? <Text style={styles.stepDate}>{new Date(step.date).toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingTop: 40 },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: theme.colors.textSecondary, fontSize: 18, marginTop: 16, fontWeight: 'bold' },
  listContent: { padding: 16 },
  card: { backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: theme.colors.border },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  orderDetails: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingBottom: 12 },
  detailText: { fontSize: 14, color: theme.colors.textSecondary },
  trackingContainer: { marginTop: 8 },
  trackingStep: { flexDirection: 'row-reverse', alignItems: 'flex-start' },
  stepIconContainer: { width: 24, alignItems: 'center', zIndex: 2 },
  stepLine: { position: 'absolute', right: 11, top: 20, width: 2, height: '100%', backgroundColor: theme.colors.border, zIndex: 1 },
  stepLineCompleted: { backgroundColor: theme.colors.primary },
  stepTextContainer: { flex: 1, marginRight: 16, paddingBottom: 24 },
  stepTitle: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500', textAlign: 'right' },
  stepTitleCompleted: { color: theme.colors.text, fontWeight: 'bold' },
  stepDate: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2, textAlign: 'right' },
});
