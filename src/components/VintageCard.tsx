import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ViewStyle, StyleProp } from 'react-native';
import { MotiView } from 'moti';
import { theme } from '@/constants/theme';
import { Star } from 'lucide-react-native';

interface VintageCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  delay?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function VintageCard({ title, subtitle, image, rating, reviews, delay = 0, onPress, style }: VintageCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay }}
      style={[styles.container, style]}
    >
      <Pressable onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && { opacity: 0.9 }]}>
        {image && (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        )}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          
          {rating !== undefined && (
            <View style={styles.ratingContainer}>
              <Star size={14} color={theme.colors.accent} fill={theme.colors.accent} />
              <Text style={styles.ratingText}>
                {rating} <Text style={styles.reviewsText}>| {reviews} reviews</Text>
              </Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.vintageButton}>
              <Text style={styles.vintageButtonText}>VIEW & BOOK</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginRight: theme.spacing.md,
    width: 200,
  },
  pressable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 140,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontFamily: theme.typography.fontFamily.serif,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  reviewsText: {
    fontWeight: 'normal',
    opacity: 0.6,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  vintageButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.sm,
    width: '100%',
    alignItems: 'center',
  },
  vintageButtonText: {
    color: theme.colors.card,
    fontSize: theme.typography.sizes.sm,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
