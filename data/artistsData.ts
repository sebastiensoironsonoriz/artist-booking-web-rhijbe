
export interface Artist {
  id: string;
  name: string;
  genre: string;
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  youtubeLinks: string[];
  facebookLink: string;
  availability: {
    [date: string]: boolean; // true = available, false = booked
  };
}

export const artistsData: Artist[] = [
  {
    id: '1',
    name: 'Les Étoiles du Jazz',
    genre: 'Jazz',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    shortDescription: 'Quartet de jazz moderne avec une touche contemporaine. Parfait pour les événements élégants.',
    fullDescription: 'Les Étoiles du Jazz est un quartet professionnel formé en 2018, spécialisé dans le jazz moderne et contemporain. Composé de musiciens diplômés du Conservatoire de Paris, le groupe propose un répertoire varié allant des standards de jazz aux compositions originales. Leur style unique mélange tradition et modernité, créant une ambiance sophistiquée parfaite pour vos événements privés, mariages, ou soirées d\'entreprise.',
    youtubeLinks: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=oHg5SJYRHA0'
    ],
    facebookLink: 'https://www.facebook.com/etoilesdujazz',
    availability: {
      '2024-02-15': true,
      '2024-02-16': false,
      '2024-02-17': true,
      '2024-02-18': true,
    }
  },
  {
    id: '2',
    name: 'Acoustic Dreams',
    genre: 'Folk Acoustique',
    price: 800,
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop',
    shortDescription: 'Duo acoustique folk avec des mélodies envoûtantes et des harmonies parfaites.',
    fullDescription: 'Acoustic Dreams est un duo folk acoustique composé de Sarah et Thomas, deux artistes passionnés par la musique authentique. Leur répertoire comprend des reprises de grands classiques folk et leurs propres compositions. Avec leurs voix harmonieuses et leur maîtrise de la guitare acoustique, ils créent une atmosphère intime et chaleureuse, idéale pour les mariages, anniversaires et événements privés.',
    youtubeLinks: [
      'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      'https://www.youtube.com/watch?v=09R8_2nJtjg'
    ],
    facebookLink: 'https://www.facebook.com/acousticdreamsmusic',
    availability: {
      '2024-02-15': false,
      '2024-02-16': true,
      '2024-02-17': true,
      '2024-02-18': false,
    }
  },
  {
    id: '3',
    name: 'Electric Pulse',
    genre: 'Rock Électrique',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    shortDescription: 'Groupe de rock électrique énergique pour des soirées inoubliables.',
    fullDescription: 'Electric Pulse est un groupe de rock électrique formé de quatre musiciens expérimentés. Spécialisés dans le rock moderne et les reprises de grands hits, ils apportent une énergie explosive à vos événements. Leur show dynamique et leur présence scénique captivante font d\'eux le choix parfait pour les festivals, soirées d\'entreprise et célébrations qui demandent de l\'ambiance.',
    youtubeLinks: [
      'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      'https://www.youtube.com/watch?v=QH2-TGUlwu4'
    ],
    facebookLink: 'https://www.facebook.com/electricpulseband',
    availability: {
      '2024-02-15': true,
      '2024-02-16': true,
      '2024-02-17': false,
      '2024-02-18': true,
    }
  },
  {
    id: '4',
    name: 'Symphonie Classique',
    genre: 'Musique Classique',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop',
    shortDescription: 'Ensemble de musique classique pour des événements prestigieux et raffinés.',
    fullDescription: 'Symphonie Classique est un ensemble de musique classique composé de musiciens professionnels issus des plus grands orchestres français. Ils proposent un répertoire allant de Bach à Debussy, en passant par Mozart et Chopin. Parfait pour les mariages haut de gamme, galas, et événements corporatifs prestigieux, leur prestation apporte une touche d\'élégance et de raffinement incomparable.',
    youtubeLinks: [
      'https://www.youtube.com/watch?v=jgpJVI3tDbY',
      'https://www.youtube.com/watch?v=rOjHhS5MtvA'
    ],
    facebookLink: 'https://www.facebook.com/symphonieclassique',
    availability: {
      '2024-02-15': true,
      '2024-02-16': false,
      '2024-02-17': false,
      '2024-02-18': true,
    }
  },
  {
    id: '5',
    name: 'Urban Beats',
    genre: 'Hip-Hop/R&B',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    shortDescription: 'Collectif hip-hop et R&B pour une ambiance urbaine et moderne.',
    fullDescription: 'Urban Beats est un collectif de trois artistes spécialisés dans le hip-hop et le R&B contemporain. Avec leur style unique mêlant rap français et influences internationales, ils créent une ambiance urbaine et moderne. Leurs performances incluent du beatboxing, du rap freestyle et des reprises R&B revisitées. Parfait pour les événements jeunes, soirées d\'entreprise modernes et festivals urbains.',
    youtubeLinks: [
      'https://www.youtube.com/watch?v=YQHsXMglC9A',
      'https://www.youtube.com/watch?v=hTWKbfoikeg'
    ],
    facebookLink: 'https://www.facebook.com/urbanbeatsofficial',
    availability: {
      '2024-02-15': false,
      '2024-02-16': true,
      '2024-02-17': true,
      '2024-02-18': false,
    }
  }
];
