import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams();
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 100);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      // Simulate verification success
      login(phone as string);
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-forward" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>تأكيد رقم الهاتف</Text>
        <Text style={styles.subtitle}>أدخل الكود المكون من 4 أرقام المرسل إلى</Text>
        <Text style={styles.phoneText}>+20 {phone}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => inputs.current[index] = el}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.button, code.join('').length < 4 && styles.buttonDisabled]} 
          onPress={handleVerify}
          disabled={code.join('').length < 4}
        >
          <Text style={styles.buttonText}>تأكيد</Text>
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
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  form: {
    width: '100%',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  codeInput: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center',
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
