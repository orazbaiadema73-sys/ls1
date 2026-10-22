import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const MENU_ITEMS = [
  { icon: '🧾', label: 'Тапсырыс тарихы' },
  { icon: '❤️', label: 'Таңдаулылар' },
  { icon: '🎁', label: 'Бонустар' },
  { icon: '⚙️', label: 'Баптаулар' },
  { icon: '❓', label: 'Көмек' },
];

type Props = {
  name?: string;
  phone?: string;
  onLogout: () => void;
};

export default function ProfileScreen({ name, phone, onLogout }: Props) {
  const displayName = name ?? 'Қонақ';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Профиль</Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{displayName}</Text>
            {phone ? <Text style={styles.phone}>{phone}</Text> : null}
          </View>
        </View>

        {MENU_ITEMS.map((item) => (
          <Pressable key={item.label} style={styles.menuItem} onPress={() => console.log('Ашылды:', item.label)}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        <Pressable style={styles.logout} onPress={onLogout}>
          <Text style={styles.logoutText}>Шығу</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  title: { fontSize: 22, fontWeight: '700', color: '#1B1923', marginBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FA', borderRadius: 18, padding: 16, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#A855F7', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  name: { fontSize: 16, fontWeight: '700', color: '#1B1923' },
  phone: { fontSize: 13, color: '#AAA9B2', marginTop: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F2' },
  menuIcon: { fontSize: 18, marginRight: 14 },
  menuLabel: { flex: 1, fontSize: 15, color: '#1B1923' },
  chevron: { fontSize: 20, color: '#D9D8DE' },
  logout: { height: 54, borderRadius: 16, borderWidth: 1.5, borderColor: '#F3D2D2', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 20 },
  logoutText: { color: '#E05555', fontSize: 15, fontWeight: '600' },
});
