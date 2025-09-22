
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { artistsData } from '../../data/artistsData';
import Icon from '../../components/Icon';
import BookingForm from '../../components/BookingForm';
import SimpleBottomSheet from '../../components/BottomSheet';

export default function ArtistDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const artist = artistsData.find(a => a.id === id);

  if (!artist) {
    console.log('Artist not found for id:', id);
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.center, { flex: 1 }]}>
          <Text style={commonStyles.title}>Artiste non trouvé</Text>
          <TouchableOpacity 
            style={[buttonStyles.primary, { marginTop: 20 }]}
            onPress={() => router.back()}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Retour
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  console.log('Rendering artist detail for:', artist.name);

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erreur', 'Impossible d\'ouvrir ce lien');
      }
    } catch (error) {
      console.log('Error opening link:', error);
      Alert.alert('Erreur', 'Impossible d\'ouvrir ce lien');
    }
  };

  const handleBookingRequest = () => {
    console.log('Opening booking form for artist:', artist.name);
    setShowBookingForm(true);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={[commonStyles.row, { padding: 20, paddingBottom: 0 }]}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: colors.backgroundAlt,
              marginRight: 16,
            }}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, marginBottom: 0 }]}>
            Détails de l&apos;artiste
          </Text>
        </View>

        {/* Artist Image */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Image
            source={{ uri: artist.image }}
            style={{
              width: '100%',
              height: 250,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Artist Info */}
        <View style={commonStyles.section}>
          <View style={commonStyles.spaceBetween}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.title}>{artist.name}</Text>
              <Text style={[commonStyles.text, { color: colors.textSecondary, marginBottom: 8 }]}>
                {artist.genre}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 0 }]}>
                {artist.price}€
              </Text>
              <Text style={commonStyles.textSecondary}>
                par événement
              </Text>
            </View>
          </View>

          <Text style={[commonStyles.text, { marginTop: 16, lineHeight: 26 }]}>
            {artist.fullDescription}
          </Text>
        </View>

        {/* Social Links */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Liens et Médias
          </Text>
          
          {/* YouTube Links */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
              Vidéos YouTube
            </Text>
            {artist.youtubeLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[buttonStyles.outline, { marginBottom: 8 }]}
                onPress={() => handleOpenLink(link)}
              >
                <View style={commonStyles.row}>
                  <Icon name="logo-youtube" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>
                    Vidéo {index + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Facebook Link */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
              Page Facebook
            </Text>
            <TouchableOpacity
              style={[buttonStyles.outline]}
              onPress={() => handleOpenLink(artist.facebookLink)}
            >
              <View style={commonStyles.row}>
                <Icon name="logo-facebook" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>
                  Voir la page Facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Booking Button */}
        <View style={[commonStyles.section, { marginBottom: 40 }]}>
          <TouchableOpacity
            style={[buttonStyles.primary, { paddingVertical: 16 }]}
            onPress={handleBookingRequest}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
              Demander une réservation
            </Text>
          </TouchableOpacity>
          
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
            La vérification de disponibilité est gratuite
          </Text>
        </View>
      </ScrollView>

      {/* Booking Form Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={showBookingForm}
        onClose={() => setShowBookingForm(false)}
      >
        <BookingForm 
          artist={artist}
          onClose={() => setShowBookingForm(false)}
        />
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
