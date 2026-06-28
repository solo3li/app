import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.length > 0) {
      router.push({ pathname: '/auth/verify', params: { phone } });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Ionicons name="cut" size={60} color={theme.colors.primary} />
        <Text style={styles.title}>مرحباً بك في بربر</Text>
        <Text style={styles.subtitle}>أفضل صالونات الحلاقة بين يديك</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>رقم الهاتف</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+20</Text>
          <TextInput
            style={styles.input}
            placeholder="10xxxxxxxxx"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, phone.length === 0 && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={phone.length === 0}
        >
          <Text style={styles.buttonText}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
  },
  countryCode: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'right',
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
