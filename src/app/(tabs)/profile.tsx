import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { dummyData } from '@/constants/dummyData';
import { LogOut, Settings, Heart, ChevronLeft, MapPin, Wallet, Award, Share2, Moon, Sun, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, favoriteShopIds, logout, toggleFavorite, walletBalance, loyaltyPoints, referralCode, isDarkMode, toggleTheme } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'خروج', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const favoriteShops = dummyData.shops.filter(s => favoriteShopIds.includes(s.id));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userPhone}>+20 {user?.phone}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionBtn}>
          <Settings color={theme.colors.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Stats Section: Wallet & Points */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
            <Wallet color="#4CAF50" size={24} />
          </View>
          <Text style={styles.statLabel}>المحفظة</Text>
          <Text style={styles.statValue}>{walletBalance} ج</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
            <Award color="#FFC107" size={24} />
          </View>
          <Text style={styles.statLabel}>نقاط الولاء</Text>
          <Text style={styles.statValue}>{loyaltyPoints}</Text>
        </View>
      </View>

      {/* Referral Section */}
      <View style={styles.referralContainer}>
        <View style={styles.referralInfo}>
          <Text style={styles.referralTitle}>اكسب رصيد مجاني!</Text>
          <Text style={styles.referralDesc}>شارك كودك مع أصدقائك واحصل على 50 ج لكل صديق يسجل.</Text>
        </View>
        <TouchableOpacity style={styles.referralBtn}>
          <Text style={styles.referralBtnText}>{referralCode}</Text>
          <Share2 color={theme.colors.primary} size={16} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الصالونات المفضلة</Text>
        {favoriteShops.length === 0 ? (
          <View style={styles.emptyFav}>
            <Heart color={theme.colors.border} size={48} />
            <Text style={styles.emptyText}>لم تقم بإضافة صالونات مفضلة بعد</Text>
          </View>
        ) : (
          favoriteShops.map(shop => (
            <TouchableOpacity key={shop.id} style={styles.favCard} onPress={() => router.push(`/shop/${shop.id}`)}>
              <Image source={{ uri: shop.images[0] }} style={styles.favImage} />
              <View style={styles.favInfo}>
                <Text style={styles.favName}>{shop.name}</Text>
                <View style={styles.favLocation}>
                  <MapPin size={12} color={theme.colors.textSecondary} />
                  <Text style={styles.favLocationText}>{shop.location}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(shop.id)} style={{ padding: 8 }}>
                <Heart color="red" fill="red" size={24} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/shop/orders')}>
          <View style={styles.menuItemLeft}>
            <ShoppingBag color={theme.colors.primary} size={20} />
            <Text style={[styles.menuText, { marginRight: 12 }]}>طلباتي من المتجر</Text>
          </View>
          <ChevronLeft color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Settings color={theme.colors.textSecondary} size={20} />
            <Text style={[styles.menuText, { marginRight: 12 }]}>تعديل الملف الشخصي</Text>
          </View>
          <ChevronLeft color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
          <View style={styles.menuItemLeft}>
            {isDarkMode ? <Moon color={theme.colors.textSecondary} size={20} /> : <Sun color={theme.colors.textSecondary} size={20} />}
            <Text style={[styles.menuText, { marginRight: 12 }]}>الوضع الليلي</Text>
          </View>
          <View style={[styles.toggleSwitch, isDarkMode && styles.toggleSwitchActive]}>
            <View style={[styles.toggleKnob, isDarkMode && styles.toggleKnobActive]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>طرق الدفع</Text>
          <ChevronLeft color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>تواصل معنا</Text>
          <ChevronLeft color={theme.colors.textSecondary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
          <Text style={[styles.menuText, { color: 'red' }]}>تسجيل الخروج</Text>
          <LogOut color="red" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 24, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingTop: 60 },
  userInfo: { flexDirection: 'row-reverse', alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: theme.colors.primary, marginLeft: 16 },
  userDetails: { alignItems: 'flex-end' },
  userName: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text },
  userPhone: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  actionBtn: { padding: 8, backgroundColor: theme.colors.background, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  
  section: { padding: 16, marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, textAlign: 'right' },
  
  emptyFav: { alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: theme.colors.card, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  emptyText: { fontSize: 16, color: theme.colors.textSecondary, marginTop: 16, fontWeight: 'bold' },
  
  favCard: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.card, padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.border },
  favImage: { width: 60, height: 60, borderRadius: 8, marginLeft: 12 },
  favInfo: { flex: 1, alignItems: 'flex-end' },
  favName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  favLocation: { flexDirection: 'row-reverse', alignItems: 'center' },
  favLocationText: { fontSize: 12, color: theme.colors.textSecondary, marginRight: 4 },
  
  menuSection: { backgroundColor: theme.colors.card, marginTop: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.colors.border },
  menuItem: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border, marginHorizontal: 16 },
  menuItemLeft: { flexDirection: 'row-reverse', alignItems: 'center' },
  menuText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  
  statsContainer: { flexDirection: 'row-reverse', paddingHorizontal: 16, marginTop: 16, justifyContent: 'space-between' },
  statCard: { flex: 1, backgroundColor: theme.colors.card, padding: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: theme.colors.border, elevation: 2 },
  statIconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statLabel: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text },
  
  referralContainer: { flexDirection: 'row-reverse', margin: 16, padding: 16, backgroundColor: 'rgba(233, 30, 99, 0.05)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(233, 30, 99, 0.2)', alignItems: 'center', justifyContent: 'space-between' },
  referralInfo: { flex: 1, alignItems: 'flex-end', marginLeft: 12 },
  referralTitle: { fontSize: 16, fontWeight: 'bold', color: '#E91E63', marginBottom: 4 },
  referralDesc: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'right' },
  referralBtn: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(233, 30, 99, 0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  referralBtnText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 14 },
  
  toggleSwitch: { width: 50, height: 28, borderRadius: 14, backgroundColor: theme.colors.border, padding: 2, justifyContent: 'center' },
  toggleSwitchActive: { backgroundColor: theme.colors.primary },
  toggleKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2, alignSelf: 'flex-start' },
  toggleKnobActive: { alignSelf: 'flex-end' },
});
