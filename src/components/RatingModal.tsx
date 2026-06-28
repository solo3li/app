import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '@/constants/theme';
import { Star, X } from 'lucide-react-native';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (ratings: any) => void;
  shopName: string;
  barberName: string;
}

export const RatingModal = ({ visible, onClose, onSubmit, shopName, barberName }: RatingModalProps) => {
  const [shopRating, setShopRating] = useState(0);
  const [barberRating, setBarberRating] = useState(0);
  const [comment, setComment] = useState('');

  const renderStars = (rating: number, setRating: (r: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Star 
              size={32} 
              color={star <= rating ? "gold" : theme.colors.border} 
              fill={star <= rating ? "gold" : "transparent"} 
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmit = () => {
    onSubmit({ shopRating, barberRating, comment });
    setShopRating(0);
    setBarberRating(0);
    setComment('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>تقييم الزيارة</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.subtitle}>كيف كانت تجربتك في {shopName}؟</Text>
            {renderStars(shopRating, setShopRating)}

            <Text style={styles.subtitle}>كيف كان أداء الحلاق {barberName}؟</Text>
            {renderStars(barberRating, setBarberRating)}

            <Text style={styles.subtitle}>أضف تعليقاً (اختياري)</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              placeholder="اكتب تعليقك هنا..."
              placeholderTextColor={theme.colors.textSecondary}
              value={comment}
              onChangeText={setComment}
              textAlignVertical="top"
            />

            <TouchableOpacity 
              style={[styles.submitBtn, (!shopRating || !barberRating) && { opacity: 0.5 }]}
              onPress={handleSubmit}
              disabled={!shopRating || !barberRating}
            >
              <Text style={styles.submitText}>إرسال التقييم</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: theme.colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: 16, color: theme.colors.text, marginTop: 16, marginBottom: 8, textAlign: 'right', fontWeight: 'bold' },
  starsContainer: { flexDirection: 'row-reverse', justifyContent: 'center', marginBottom: 16 },
  textInput: { backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 16, color: theme.colors.text, textAlign: 'right', height: 100, marginBottom: 24 },
  submitBtn: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  submitText: { color: theme.colors.card, fontSize: 18, fontWeight: 'bold' }
});
