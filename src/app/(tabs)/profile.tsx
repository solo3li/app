import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { dummyData } from '@/constants/dummyData';
import { LogOut, Settings, Heart, ChevronLeft, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, favoriteShopIds, logout, toggleFavorite } = useUserStore();
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
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>تعديل الملف الشخصي</Text>
          <ChevronLeft color={theme.colors.textSecondary} size={20} />
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
  menuText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
});
