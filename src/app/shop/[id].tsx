import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
const MotiView = View as any;
const MotiScrollView = ScrollView as any;
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { dummyData } from '@/constants/dummyData';
import { useBookingStore } from '@/store/useBookingStore';
import { MapPin, Star, CheckCircle, Wifi, Wind, Coffee, Car, Map, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ShopDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const shop = dummyData.shops.find(s => s.id === id) || dummyData.shops[0];
  const { selectedBarber, selectedServices, setBarber, toggleService, setShop } = useBookingStore();

  // On mount or when shop changes, set the shop in store (which clears barber/services)
  React.useEffect(() => {
    setShop(shop);
  }, [shop]);

  const handleBookNow = () => {
    // If barber and at least one service is selected, go to booking wizard
    if (selectedBarber && selectedServices.length > 0) {
      router.push('/booking');
    }
  };

  const getAmenityIcon = (name: string) => {
    if (name.includes('WiFi')) return <Wifi size={16} color={theme.colors.textSecondary} />;
    if (name.includes('مكيف')) return <Wind size={16} color={theme.colors.textSecondary} />;
    if (name.includes('مشروبات') || name.includes('قهوة')) return <Coffee size={16} color={theme.colors.textSecondary} />;
    if (name.includes('موقف')) return <Car size={16} color={theme.colors.textSecondary} />;
    return <CheckCircle size={16} color={theme.colors.textSecondary} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Image & Back Button */}
        <View style={styles.headerContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {shop.images.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.headerImage} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.overlay} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" color={theme.colors.card} size={24} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <Text style={styles.shopSubtitle}>{shop.subtitle}</Text>
          </View>
        </View>

        {/* Info & Rating */}
        <View style={styles.infoSection}>
          <View style={styles.ratingRow}>
            <Star name="star" color="gold" size={18} fill="gold" />
            <Text style={styles.ratingText}>{shop.rating}</Text>
            <Text style={styles.reviewsText}>({shop.reviewsCount} تقييم)</Text>
            <Text style={styles.distanceText}> • {shop.distance}</Text>
          </View>
          <View style={styles.ratingRow}>
            <MapPin color={theme.colors.textSecondary} size={16} />
            <Text style={styles.locationText}>{shop.location}</Text>
            <Pressable style={styles.mapButton} onPress={() => alert('محاكاة: فتح خرائط جوجل للوصول إلى الصالون...')}>
              <Map size={14} color={theme.colors.primary} />
              <Text style={styles.mapButtonText}>الموقع</Text>
            </Pressable>
          </View>
          <Text style={styles.descriptionText}>{shop.description}</Text>
          
          <View style={styles.amenitiesContainer}>
            {shop.amenities.map((amenity, idx) => (
              <View key={idx} style={styles.amenityBadge}>
                {getAmenityIcon(amenity)}
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Barbers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر الحلاق</Text>
          <MotiScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {shop.barbers.map((barber, index) => {
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
                      <Star size={12} color="gold" fill="gold" />
                      <Text style={styles.barberRatingText}>{barber.rating}</Text>
                    </View>
                    {barber.availableTimes.length === 0 && (
                      <Pressable style={styles.waitlistBtn} onPress={() => alert('تم إضافتك لقائمة الانتظار! سنعلمك عند توفر موعد.')}>
                        <Clock size={10} color="#fff" />
                        <Text style={styles.waitlistBtnText}>انتظار</Text>
                      </Pressable>
                    )}
                  </Pressable>
                </MotiView>
              );
            })}
          </MotiScrollView>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الخدمات</Text>
          <View style={styles.servicesList}>
            {shop.services.map((service, index) => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <MotiView
                  key={service.id}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 400, delay: 400 + index * 100 }}
                >
                  <Pressable 
                    style={[styles.serviceRow, isSelected && styles.serviceRowSelected]}
                    onPress={() => toggleService(service)}
                  >
                    <View style={styles.serviceInfo}>
                      <Text style={[styles.serviceName, isSelected && styles.serviceTextSelected]}>{service.name}</Text>
                      <View style={styles.serviceMeta}>
                        <Ionicons name="time" size={12} color={isSelected ? theme.colors.card : theme.colors.accent} />
                        <Text style={[styles.serviceDuration, isSelected && styles.serviceTextSelected]}>{service.duration}</Text>
                      </View>
                    </View>
                    <Text style={[styles.servicePrice, isSelected && styles.serviceTextSelected]}>{service.price} ج</Text>
                    
                    <View style={[styles.addButton, isSelected && styles.addButtonSelected]}>
                      <Ionicons name={isSelected ? "checkmark" : "add"} size={16} color={isSelected ? theme.colors.primary : theme.colors.card} />
                    </View>
                  </Pressable>
                </MotiView>
              );
            })}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التقييمات</Text>
          <View style={styles.reviewsList}>
            {shop.reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.userAvatar }} style={styles.reviewerAvatar} />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.userName}</Text>
                    <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.reviewRatingBadge}>
                    <Star size={12} color="gold" fill="gold" />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Sticky Book Now Button */}
      {(selectedBarber && selectedServices.length > 0) && (
        <MotiView 
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.stickyBottom}
        >
          <Pressable style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>استمرار ({selectedServices.reduce((acc, s) => acc + s.price, 0)} ج)</Text>
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
  headerImage: { width: width, height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  backButton: { position: 'absolute', top: 40, left: 16, padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, zIndex: 10 },
  headerTextContainer: { position: 'absolute', bottom: 20, right: 20, left: 20, alignItems: 'flex-end' },
  shopName: { fontSize: 28, color: theme.colors.card, fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 4, textAlign: 'right' },
  shopSubtitle: { fontSize: 16, color: theme.colors.border, marginTop: 4, textAlign: 'right' },
  infoSection: { padding: 16, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  ratingRow: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
  ratingText: { marginRight: 4, fontWeight: 'bold', fontSize: 16, color: theme.colors.text },
  reviewsText: { marginRight: 4, color: theme.colors.text, opacity: 0.7 },
  distanceText: { color: theme.colors.text, opacity: 0.7, marginRight: 4 },
  locationText: { color: theme.colors.textSecondary, marginRight: 4, fontSize: 14, flex: 1, textAlign: 'right' },
  mapButton: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(233, 30, 99, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 8 },
  mapButtonText: { color: theme.colors.primary, fontSize: 12, marginRight: 4, fontWeight: 'bold' },
  descriptionText: { fontSize: 14, color: theme.colors.text, lineHeight: 22, opacity: 0.9, textAlign: 'right', marginTop: 8 },
  amenitiesContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', marginTop: 12 },
  amenityBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 8, marginBottom: 8 },
  amenityText: { color: theme.colors.textSecondary, fontSize: 12, marginRight: 4 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 20, color: theme.colors.primary, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 12, textAlign: 'right' },
  horizontalList: { paddingHorizontal: 16, paddingBottom: 10, flexDirection: 'row-reverse' },
  barberCard: { alignItems: 'center', marginLeft: 16, padding: 8, borderRadius: 12, borderWidth: 2, borderColor: 'transparent', backgroundColor: theme.colors.background },
  barberCardSelected: { borderColor: theme.colors.primary, backgroundColor: theme.colors.card },
  barberAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 8 },
  barberName: { fontSize: 14, color: theme.colors.text, fontWeight: 'bold' },
  barberNameSelected: { color: theme.colors.primary },
  barberRating: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 2 },
  barberRatingText: { fontSize: 12, marginRight: 2, color: theme.colors.text },
  waitlistBtn: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#FF9800', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  waitlistBtnText: { color: '#fff', fontSize: 10, marginRight: 2, fontWeight: 'bold' },
  servicesList: { paddingHorizontal: 16 },
  serviceRow: { flexDirection: 'row-reverse', alignItems: 'center', padding: 16, backgroundColor: theme.colors.card, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
  serviceRowSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  serviceInfo: { flex: 1, alignItems: 'flex-end' },
  serviceName: { fontSize: 16, color: theme.colors.text, marginBottom: 4, fontWeight: 'bold' },
  serviceTextSelected: { color: theme.colors.card },
  serviceMeta: { flexDirection: 'row-reverse', alignItems: 'center' },
  serviceDuration: { fontSize: 12, color: theme.colors.text, opacity: 0.7, marginRight: 4 },
  servicePrice: { fontSize: 18, color: theme.colors.primary, fontWeight: 'bold', marginLeft: 16 },
  addButton: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  addButtonSelected: { backgroundColor: theme.colors.card },
  reviewsList: { paddingHorizontal: 16 },
  reviewCard: { backgroundColor: theme.colors.card, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.border },
  reviewHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 12 },
  reviewerInfo: { flex: 1, alignItems: 'flex-end' },
  reviewerName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  reviewDate: { fontSize: 12, color: theme.colors.textSecondary },
  reviewRatingBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  reviewRatingText: { fontSize: 12, fontWeight: 'bold', marginRight: 4, color: theme.colors.text },
  reviewComment: { textAlign: 'right', color: theme.colors.text, fontSize: 14, marginTop: 8 },
  bottomPadding: { height: 100 },
  stickyBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: theme.colors.background, padding: 16, borderTopWidth: 1, borderTopColor: theme.colors.border, elevation: 10 },
  bookButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  bookButtonText: { color: theme.colors.card, fontSize: 18, fontWeight: 'bold' },
});
