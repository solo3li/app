import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { theme } from '@/constants/theme';
import { dummyData } from '@/constants/dummyData';
import { Search as SearchIcon, Filter, MapPin, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const router = useRouter();

  const filters = ['الكل', 'الأقرب', 'الأعلى تقييماً', 'الأرخص'];

  const filteredShops = dummyData.shops.filter(shop => 
    shop.name.includes(query) || shop.location.includes(query)
  ).sort((a, b) => {
    if (selectedFilter === 'الأعلى تقييماً') return b.rating - a.rating;
    if (selectedFilter === 'الأرخص') return a.priceLevel.length - b.priceLevel.length;
    // For 'الأقرب' we would typically sort by distance, here we mock it by ID order or a parse of the distance string
    if (selectedFilter === 'الأقرب') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>البحث</Text>
      
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن صالون، موقع، أو خدمة..."
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
        <SearchIcon color={theme.colors.primary} size={24} style={styles.searchIcon} />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row-reverse' }}>
          {filters.map(filter => (
            <TouchableOpacity 
              key={filter} 
              style={[styles.filterChip, selectedFilter === filter && styles.activeFilterChip]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredShops}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/shop/${item.id}`)}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.shopName}>{item.name}</Text>
                <View style={styles.ratingBadge}>
                  <Star color="gold" size={12} fill="gold" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>{item.location}</Text>
                  <MapPin color={theme.colors.textSecondary} size={14} style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.priceLevel}>{item.priceLevel}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, textAlign: 'right', marginTop: 40 },
  searchBar: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.card, borderRadius: 12, paddingHorizontal: 16, height: 50, marginBottom: 16, borderWidth: 1, borderColor: theme.colors.border },
  searchInput: { flex: 1, textAlign: 'right', color: theme.colors.text, fontSize: 16 },
  searchIcon: { marginLeft: 8 },
  filtersContainer: { marginBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.colors.card, marginLeft: 8, borderWidth: 1, borderColor: theme.colors.border },
  activeFilterChip: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterText: { color: theme.colors.textSecondary, fontWeight: 'bold' },
  activeFilterText: { color: theme.colors.background },
  card: { backgroundColor: theme.colors.card, borderRadius: 12, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: theme.colors.border },
  image: { width: '100%', height: 150 },
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  shopName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text },
  ratingBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: theme.colors.text, fontWeight: 'bold', fontSize: 12, marginRight: 4 },
  subtitle: { color: theme.colors.textSecondary, fontSize: 14, marginBottom: 12, textAlign: 'right' },
  cardFooter: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  footerRow: { flexDirection: 'row-reverse', alignItems: 'center' },
  footerText: { color: theme.colors.textSecondary, fontSize: 12 },
  priceLevel: { color: theme.colors.primary, fontWeight: 'bold' }
});
