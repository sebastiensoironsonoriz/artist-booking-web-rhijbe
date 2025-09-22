import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { artistsData } from '../data/artistsData';

export default function ArtistCatalog() {
  console.log('Rendering Artist Catalog with', artistsData.length, 'artists');

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Catalogue d&apos;Artistes</Text>
          <Text style={commonStyles.textSecondary}>
            Découvrez nos artistes et réservez pour vos événements
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {artistsData.map((artist) => (
            <View key={artist.id} style={commonStyles.artistCard}>
              <Image
                source={{ uri: artist.image }}
                style={{
                  width: '100%',
                  height: 200,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
                resizeMode="cover"
              />
              
              <View style={{ padding: 16 }}>
                <View style={commonStyles.spaceBetween}>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
                      {artist.name}
                    </Text>
                    <Text style={commonStyles.textSecondary}>
                      {artist.genre}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[commonStyles.text, { fontWeight: '700', color: colors.primary }]}>
                      {artist.price}€
                    </Text>
                    <Text style={commonStyles.textSecondary}>
                      par événement
                    </Text>
                  </View>
                </View>

                <Text style={[commonStyles.text, { marginTop: 12, marginBottom: 16 }]}>
                  {artist.shortDescription}
                </Text>

                <Link href={`/artist/${artist.id}`} asChild>
                  <TouchableOpacity style={buttonStyles.primary}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                      Plus d&apos;infos
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
