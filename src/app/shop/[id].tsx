import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView, MotiScrollView } from 'moti';
import { ArrowLeft, Star, Clock, Plus } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { dummyData } from '@/constants/dummyData';
import { useBookingStore } from '@/store/useBookingStore';

export default function ShopDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Find shop (in a real app, you'd fetch it)
  const shop = dummyData.shops.find(s => s.id === id) || dummyData.shops[0];
  const barbers = dummyData.barbers;
  const services = dummyData.services;

  const { selectedBarber, selectedService, setBarber, setService } = useBookingStore();

  const handleBookNow = () => {
    router.push('/booking');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Image & Back Button */}
        <MotiView 
          from={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ type: 'timing', duration: 500 }}
          style={styles.headerContainer}
        >
          <Image source={{ uri: shop.image }} style={styles.headerImage} resizeMode="cover" />
          <View style={styles.overlay} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={theme.colors.card} size={24} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <Text style={styles.shopSubtitle}>{shop.subtitle}</Text>
          </View>
        </MotiView>

        {/* Info & Rating */}
        <View style={styles.infoSection}>
          <View style={styles.ratingRow}>
            <Star color={theme.colors.accent} fill={theme.colors.accent} size={18} />
            <Text style={styles.ratingText}>{shop.rating}</Text>
            <Text style={styles.reviewsText}>({shop.reviews} reviews)</Text>
            <Text style={styles.distanceText}> • {shop.distance}</Text>
          </View>
          <Text style={styles.descriptionText}>{shop.description}</Text>
        </View>

        {/* Barbers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Master Barbers</Text>
          <MotiScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {barbers.map((barber, index) => {
              const isSelected = selectedBarber?.id === barber.id;
              return (
                <MotiView
                  key={barber.id}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'timing', duration: 400, delay: 200 + index * 100 }}
                >
                  <Pressable 
                    style={[styles.barberCard, isSelected && styles.barberCardSelected]} 
                    onPress={() => setBarber(barber)}
                  >
                    <Image source={{ uri: barber.avatar }} style={styles.barberAvatar} />
                    <Text style={[styles.barberName, isSelected && styles.barberNameSelected]}>{barber.name}</Text>
                    <View style={styles.barberRating}>
                      <Star size={12} color={theme.colors.accent} fill={theme.colors.accent} />
                      <Text style={styles.barberRatingText}>{barber.rating}</Text>
                    </View>
                  </Pressable>
                </MotiView>
              );
            })}
          </MotiScrollView>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesList}>
            {services.map((service, index) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <MotiView
                  key={service.id}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 400, delay: 400 + index * 100 }}
                  style={[styles.serviceRow, isSelected && styles.serviceRowSelected]}
                >
                  <View style={styles.serviceInfo}>
                    <Text style={[styles.serviceName, isSelected && styles.serviceTextSelected]}>{service.name}</Text>
                    <View style={styles.serviceMeta}>
                      <Clock size={12} color={isSelected ? theme.colors.card : theme.colors.accent} />
                      <Text style={[styles.serviceDuration, isSelected && styles.serviceTextSelected]}>{service.duration}</Text>
                    </View>
                  </View>
                  <Text style={[styles.servicePrice, isSelected && styles.serviceTextSelected]}>{service.price}</Text>
                  
                  <Pressable 
                    style={[styles.addButton, isSelected && styles.addButtonSelected]} 
                    onPress={() => setService(service)}
                  >
                    <Plus size={16} color={isSelected ? theme.colors.primary : theme.colors.card} />
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Sticky Book Now Button */}
      {(selectedBarber || selectedService) && (
        <MotiView 
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.stickyBottom}
        >
          <Pressable style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>CONTINUE TO BOOKING</Text>
          </Pressable>
        </MotiView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1 },
  headerContainer: { position: 'relative', height: 250 },
  headerImage: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(74, 26, 26, 0.4)' },
  backButton: { position: 'absolute', top: 16, left: 16, padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },
  headerTextContainer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  shopName: { fontFamily: theme.typography.fontFamily.serif, fontSize: 32, color: theme.colors.card, fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 4 },
  shopSubtitle: { fontFamily: theme.typography.fontFamily.serifRegular, fontSize: 16, color: theme.colors.border, marginTop: 4 },
  infoSection: { padding: theme.spacing.lg, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm },
  ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 16, color: theme.colors.text },
  reviewsText: { marginLeft: 4, color: theme.colors.text, opacity: 0.7 },
  distanceText: { color: theme.colors.text, opacity: 0.7 },
  descriptionText: { fontSize: 14, color: theme.colors.text, lineHeight: 22, opacity: 0.9 },
  section: { marginTop: theme.spacing.lg },
  sectionTitle: { fontFamily: theme.typography.fontFamily.serif, fontSize: 20, color: theme.colors.primary, fontWeight: 'bold', paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md },
  horizontalList: { paddingHorizontal: theme.spacing.lg, paddingBottom: 10 },
  barberCard: { alignItems: 'center', marginRight: theme.spacing.lg, padding: theme.spacing.sm, borderRadius: theme.borderRadius.md, borderWidth: 2, borderColor: 'transparent' },
  barberCardSelected: { borderColor: theme.colors.accent, backgroundColor: theme.colors.card },
  barberAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 8 },
  barberName: { fontFamily: theme.typography.fontFamily.serif, fontSize: 14, color: theme.colors.text, fontWeight: 'bold' },
  barberNameSelected: { color: theme.colors.primary },
  barberRating: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  barberRatingText: { fontSize: 12, marginLeft: 2, color: theme.colors.text },
  servicesList: { paddingHorizontal: theme.spacing.lg },
  serviceRow: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.sm, borderWidth: 1, borderColor: theme.colors.border },
  serviceRowSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  serviceInfo: { flex: 1 },
  serviceName: { fontFamily: theme.typography.fontFamily.bold, fontSize: 16, color: theme.colors.text, marginBottom: 4 },
  serviceTextSelected: { color: theme.colors.card },
  serviceMeta: { flexDirection: 'row', alignItems: 'center' },
  serviceDuration: { fontSize: 12, color: theme.colors.text, opacity: 0.7, marginLeft: 4 },
  servicePrice: { fontFamily: theme.typography.fontFamily.serif, fontSize: 18, color: theme.colors.primary, fontWeight: 'bold', marginRight: 16 },
  addButton: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  addButtonSelected: { backgroundColor: theme.colors.card },
  bottomPadding: { height: 100 },
  stickyBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: theme.colors.background, padding: theme.spacing.lg, borderTopWidth: 1, borderTopColor: theme.colors.border, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8 },
  bookButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: theme.borderRadius.md, alignItems: 'center' },
  bookButtonText: { color: theme.colors.card, fontFamily: theme.typography.fontFamily.bold, fontSize: 16, letterSpacing: 1 },
});
