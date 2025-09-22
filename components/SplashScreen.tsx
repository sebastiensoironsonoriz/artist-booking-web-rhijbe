
import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('SplashScreen mounted, starting timer');
    
    // Wait 3 seconds, then fade out
    const timer = setTimeout(() => {
      console.log('Starting fade out animation');
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 500ms fade out
        useNativeDriver: true,
      }).start(() => {
        console.log('Fade out animation completed');
        onFinish();
      });
    }, 3000); // 3 seconds display time

    return () => {
      console.log('SplashScreen unmounting, clearing timer');
      clearTimeout(timer);
    };
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../assets/images/47125e01-c97b-4dfb-af0a-90a03064ee5e.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  image: {
    width: width * 0.9,
    height: height * 0.6,
    maxWidth: 400,
    maxHeight: 300,
  },
});
