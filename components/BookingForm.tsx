
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Artist } from '../data/artistsData';

interface BookingFormProps {
  artist: Artist;
  onClose: () => void;
}

export default function BookingForm({ artist, onClose }: BookingFormProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  console.log('Rendering booking form for artist:', artist.name);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const checkAvailability = () => {
    const dateKey = eventDate.toISOString().split('T')[0];
    const isAvailable = artist.availability[dateKey];
    
    console.log('Checking availability for date:', dateKey, 'Result:', isAvailable);
    
    if (isAvailable === false) {
      return false;
    }
    // If not explicitly set to false, assume available
    return true;
  };

  const handleSubmitBooking = () => {
    console.log('Submitting booking request');
    
    if (!clientName || !clientEmail || !clientPhone || !eventLocation) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const isAvailable = checkAvailability();
    
    if (!isAvailable) {
      Alert.alert(
        'Non disponible',
        `Désolé, ${artist.name} n'est pas disponible le ${formatDate(eventDate)}. Veuillez choisir une autre date.`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Simulate booking request
    Alert.alert(
      'Demande envoyée !',
      `Votre demande de réservation pour ${artist.name} le ${formatDate(eventDate)} à ${formatTime(eventTime)} a été envoyée.\n\nNous vous rappellerons dans les 24h pour confirmer les modalités.\n\nPrix: ${artist.price}€`,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Booking request confirmed, closing form');
            onClose();
          }
        }
      ]
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setEventTime(selectedTime);
    }
  };

  return (
    <ScrollView style={{ maxHeight: '80%' }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 8 }]}>
          Réserver {artist.name}
        </Text>
        <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 24 }]}>
          Vérification de disponibilité gratuite
        </Text>

        {/* Client Information */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Vos informations
          </Text>
          
          <Text style={commonStyles.inputLabel}>Nom complet *</Text>
          <TextInput
            style={[commonStyles.input, { marginBottom: 16 }]}
            value={clientName}
            onChangeText={setClientName}
            placeholder="Votre nom et prénom"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={commonStyles.inputLabel}>Email *</Text>
          <TextInput
            style={[commonStyles.input, { marginBottom: 16 }]}
            value={clientEmail}
            onChangeText={setClientEmail}
            placeholder="votre@email.com"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={commonStyles.inputLabel}>Téléphone *</Text>
          <TextInput
            style={[commonStyles.input, { marginBottom: 16 }]}
            value={clientPhone}
            onChangeText={setClientPhone}
            placeholder="06 12 34 56 78"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        {/* Event Information */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Détails de l&apos;événement
          </Text>

          <Text style={commonStyles.inputLabel}>Date de l&apos;événement *</Text>
          <TouchableOpacity
            style={[commonStyles.input, { marginBottom: 16, justifyContent: 'center' }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {formatDate(eventDate)}
            </Text>
          </TouchableOpacity>

          <Text style={commonStyles.inputLabel}>Heure de début *</Text>
          <TouchableOpacity
            style={[commonStyles.input, { marginBottom: 16, justifyContent: 'center' }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {formatTime(eventTime)}
            </Text>
          </TouchableOpacity>

          <Text style={commonStyles.inputLabel}>Lieu de l&apos;événement *</Text>
          <TextInput
            style={[commonStyles.input, { marginBottom: 16 }]}
            value={eventLocation}
            onChangeText={setEventLocation}
            placeholder="Adresse complète du lieu"
            placeholderTextColor={colors.textSecondary}
            multiline
          />

          <Text style={commonStyles.inputLabel}>Description de l&apos;événement</Text>
          <TextInput
            style={[commonStyles.input, { marginBottom: 16, height: 80, textAlignVertical: 'top' }]}
            value={eventDescription}
            onChangeText={setEventDescription}
            placeholder="Type d'événement, nombre d'invités, ambiance souhaitée..."
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        {/* Availability Check */}
        <View style={[commonStyles.card, { marginBottom: 20, backgroundColor: checkAvailability() ? colors.backgroundAlt : '#FEF2F2' }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
            Disponibilité
          </Text>
          <Text style={[commonStyles.text, { color: checkAvailability() ? colors.success : colors.error }]}>
            {checkAvailability() 
              ? `✓ ${artist.name} est disponible le ${formatDate(eventDate)}`
              : `✗ ${artist.name} n'est pas disponible le ${formatDate(eventDate)}`
            }
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[buttonStyles.primary, { marginBottom: 12, paddingVertical: 16 }]}
          onPress={handleSubmitBooking}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
            Envoyer la demande
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.secondary]}
          onPress={onClose}
        >
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
            Annuler
          </Text>
        </TouchableOpacity>

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={eventTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
    </ScrollView>
  );
}
