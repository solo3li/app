import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, SafeAreaView } from 'react-native';
import { MotiView, MotiScrollView } from 'moti';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { dummyData } from '@/constants/dummyData';
import { VintageCard } from '@/components/VintageCard';
import { useRouter } from 'expo-router';
import { useBookingStore } from '@/store/useBookingStore';

export default function HomeScreen() {
  const router = useRouter();
  const setShop = useBookingStore(state => state.setShop);

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
          <Text style={styles.logoText}>THE GENTLEMAN'S TRIM</Text>
          <Text style={styles.logoSubText}>EST. 1928</Text>
        </MotiView>

        {/* Welcome Section */}
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
          style={styles.welcomeSection}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back,</Text>
            <Text style={styles.welcomeName}>Arthur!</Text>
          </View>
          <Pressable style={styles.searchButton}>
            <Search color={theme.colors.primary} size={28} />
          </Pressable>
        </MotiView>

        {/* Horizontal Shop List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover Classic Barbershops</Text>
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
                image={shop.image}
                rating={shop.rating}
                reviews={shop.reviews}
                delay={400 + (index * 200)}
                onPress={() => handleShopPress(shop)}
              />
            ))}
          </MotiScrollView>
        </View>

        {/* Special Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 800 }}
            style={styles.offerCard}
          >
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>{dummyData.offers[0].title}</Text>
              <Text style={styles.offerCode}>CODE: {dummyData.offers[0].code}</Text>
            </View>
            <View style={styles.offerIconContainer}>
              <Text style={styles.offerIcon}>✂️</Text>
            </View>
          </MotiView>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoText: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: 28,
    color: theme.colors.card,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logoSubText: {
    fontFamily: theme.typography.fontFamily.serifRegular,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.accent,
    letterSpacing: 4,
    marginTop: 4,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  avatarText: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: 28,
    color: theme.colors.card,
    fontWeight: 'bold',
  },
  welcomeTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  welcomeTitle: {
    fontFamily: theme.typography.fontFamily.serifRegular,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary,
  },
  welcomeName: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: theme.spacing.sm,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  horizontalList: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  offerCard: {
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderStyle: 'dashed',
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offerCode: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.accent,
  },
  offerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  offerIcon: {
    fontSize: 24,
  },
  bottomPadding: {
    height: 100,
  }
});
