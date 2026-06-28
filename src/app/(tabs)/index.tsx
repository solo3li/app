import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, SafeAreaView, Dimensions } from 'react-native';
const MotiView = View as any;
const MotiScrollView = ScrollView as any;
import { Ionicons } from '@expo/vector-icons';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { dummyData } from '@/constants/dummyData';
import { VintageCard } from '@/components/VintageCard';
import { useRouter } from 'expo-router';
import { useBookingStore } from '@/store/useBookingStore';
import { useUserStore } from '@/store/useUserStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const setShop = useBookingStore(state => state.setShop);
  const user = useUserStore(state => state.user);

  const handleShopPress = (shop: any) => {
    setShop(shop);
    router.push(`/shop/${shop.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <MotiView 
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <Text style={styles.logoText}>BRABER</Text>
          <Text style={styles.logoSubText}>لحلاقة تليق بك</Text>
        </MotiView>

        {/* Welcome Section */}
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
          style={styles.welcomeSection}
        >
          <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/search')}>
            <Search color={theme.colors.primary} size={28} />
          </Pressable>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>مرحباً بك،</Text>
            <Text style={styles.welcomeName}>{user?.name || 'ضيف'}</Text>
          </View>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user?.name?.[0] || 'G'}</Text>
            )}
          </View>
        </MotiView>

        {/* Special Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أحدث العروض</Text>
          <MotiScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          >
            {dummyData.offers.map((offer, index) => (
              <MotiView
                key={offer.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 600, delay: 400 + (index * 100) }}
                style={styles.offerCard}
              >
                <Image source={{ uri: offer.image }} style={styles.offerImage} />
                <View style={styles.offerOverlay}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <View style={styles.offerCodeContainer}>
                    <Text style={styles.offerCode}>كود: {offer.code}</Text>
                  </View>
                </View>
              </MotiView>
            ))}
          </MotiScrollView>
        </View>

        {/* Featured Shops List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أفضل الصالونات</Text>
          <MotiScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {dummyData.shops.map((shop, index) => (
              <VintageCard
                key={shop.id}
                title={shop.name}
                subtitle={shop.subtitle}
                image={shop.images[0]} // Using first image from array
                rating={shop.rating}
                reviews={shop.reviewsCount}
                delay={600 + (index * 200)}
                onPress={() => handleShopPress(shop)}
              />
            ))}
          </MotiScrollView>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.primary },
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoText: { fontSize: 32, color: theme.colors.card, fontWeight: 'bold', letterSpacing: 2 },
  logoSubText: { fontSize: 16, color: theme.colors.accent, marginTop: 8 },
  
  welcomeSection: { flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 16 },
  avatarContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: theme.colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.colors.primary, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontSize: 28, color: theme.colors.primary, fontWeight: 'bold' },
  welcomeTextContainer: { flex: 1, marginRight: 16, alignItems: 'flex-end' },
  welcomeTitle: { fontSize: 16, color: theme.colors.textSecondary },
  welcomeName: { fontSize: 24, color: theme.colors.primary, fontWeight: 'bold' },
  searchButton: { padding: 8, backgroundColor: theme.colors.card, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 20, color: theme.colors.text, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 16, textAlign: 'right' },
  
  horizontalList: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: 'row-reverse' },
  
  offersList: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: 'row-reverse' },
  offerCard: { width: width * 0.8, height: 160, borderRadius: 16, overflow: 'hidden', marginLeft: 16, borderWidth: 1, borderColor: theme.colors.border },
  offerImage: { width: '100%', height: '100%' },
  offerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 16 },
  offerTitle: { color: theme.colors.card, fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'right' },
  offerCodeContainer: { backgroundColor: theme.colors.primary, alignSelf: 'flex-end', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  offerCode: { color: theme.colors.card, fontWeight: 'bold', fontSize: 14 },
  
  bottomPadding: { height: 100 },
});
