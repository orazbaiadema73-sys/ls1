import React, { useState } from 'react';
import { View } from 'react-native';

// Авторизация экрандары — кинотеатр жобасынан өзгертпей көшіріледі
import LoginScreen from './src/components/LoginScreen';
import ForgetPassword from './src/components/ForgetPassword';
import VerifyCode from './src/components/VerifyCode';
import ResetPassword from './src/components/ResetPassword';
import Registration from './src/components/Registration';
import ChooseCity from './src/components/ChooseCity';

// Кафеге арналған жаңа экрандар
import MenuScreen from './src/components/MenuScreen';
import ProductDetail from './src/components/ProductDetail';
import CartScreen from './src/components/CartScreen';
import ProfileScreen from './src/components/ProfileScreen';
import BottomNav from './src/components/BottomNav';

import { CartItem, Product, Size } from './src/data/menu';

type Screen =
  | 'login' | 'forgot' | 'verify' | 'reset' | 'register' | 'city'
  | 'menu' | 'cart' | 'profile' | 'product';

type VerifyFlow = 'forgot' | 'register';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | null>(null);
  const [verifyFlow, setVerifyFlow] = useState<VerifyFlow>('forgot');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: Size, qty: number) => {
    const key = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { key, product, size, qty }];
    });
  };

  const changeQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (screen === 'login') {
    return (
      <LoginScreen
        onForgotPassword={() => setScreen('forgot')}
        onRegister={() => setScreen('register')}
        onLoginSuccess={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'forgot') {
    return (
      <ForgetPassword
        onBack={() => setScreen('login')}
        onContinue={(p) => { setPhone(p); setVerifyFlow('forgot'); setScreen('verify'); }}
      />
    );
  }

  if (screen === 'register') {
    return (
      <Registration
        onBack={() => setScreen('login')}
        onLogin={() => setScreen('login')}
        onContinue={({ name, phone: p }) => {
          setUserName(name); setPhone(p); setVerifyFlow('register'); setScreen('verify');
        }}
      />
    );
  }

  if (screen === 'verify') {
    return (
      <VerifyCode
        onBack={() => setScreen(verifyFlow === 'forgot' ? 'forgot' : 'register')}
        phone={phone}
        onSubmitCode={() => setScreen(verifyFlow === 'forgot' ? 'reset' : 'city')}
        onResend={() => console.log('Кодты қайта жіберу')}
      />
    );
  }

  if (screen === 'reset') {
    return <ResetPassword onBack={() => setScreen('verify')} onContinue={() => setScreen('login')} />;
  }

  if (screen === 'city') {
    return (
      <ChooseCity
        onBack={() => setScreen('verify')}
        onContinue={(c) => { setCity(c); setScreen('menu'); }}
      />
    );
  }

  if (screen === 'product' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setScreen('menu')}
        onAdd={(product, size, qty) => {
          addToCart(product, size, qty);
          setScreen('menu');
        }}
      />
    );
  }

  // menu / cart / profile — астында BottomNav
  const tab = screen === 'cart' ? 'cart' : screen === 'profile' ? 'profile' : 'menu';

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {tab === 'menu' && (
        <MenuScreen
          city={city}
          onSelectProduct={(p) => { setSelectedProduct(p); setScreen('product'); }}
          onQuickAdd={(p) => addToCart(p, 'S', 1)}
          onOpenProfile={() => setScreen('profile')}
        />
      )}

      {tab === 'cart' && (
        <CartScreen
          items={cart}
          onChangeQty={changeQty}
          onOrder={() => { setCart([]); setScreen('menu'); }}
          onGoMenu={() => setScreen('menu')}
        />
      )}

      {tab === 'profile' && (
        <ProfileScreen name={userName} phone={phone || undefined} onLogout={() => setScreen('login')} />
      )}

      <BottomNav active={tab} cartCount={cartCount} onChange={(t) => setScreen(t)} />
    </View>
  );
}
