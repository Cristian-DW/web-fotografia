-- ================================
-- SEED DATA: 50 Users + 200 Posts
-- ================================
-- IMPORTANTE: Este script crea SOLO perfiles y posts
-- Los usuarios de autenticación deben crearse manualmente en Supabase Dashboard
-- o usar la API de Admin de Supabase

-- Para crear usuarios con auth, go to Supabase Dashboard > Authentication > Users
-- Password para todos: Lumina2024!

-- ================================
-- STEP 0: Create Follows Table (if not exists)
-- ================================
CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- ================================
-- STEP 1: Create 50 Profiles
-- ================================

INSERT INTO profiles (id, username, display_name, bio, avatar_url, created_at, updated_at)
VALUES
  -- Usuarios 1-10: Fotógrafos
  ('11111111-1111-1111-1111-111111111101', 'carlos_foto', 'Carlos Mendez', 'Fotógrafo de paisajes 📸', 'https://i.pravatar.cc/300?u=carlos', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111102', 'ana_captures', 'Ana García', 'Capturing life moments ✨', 'https://i.pravatar.cc/300?u=ana', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111103', 'miguel_lens', 'Miguel Torres', 'Street photographer | NYC', 'https://i.pravatar.cc/300?u=miguel', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111104', 'sofia_art', 'Sofia Ruiz', 'Arte digital y fotografía', 'https://i.pravatar.cc/300?u=sofia', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111105', 'david_shots', 'David López', 'Canon lover | Nature pics', 'https://i.pravatar.cc/300?u=david', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111106', 'lucia_visual', 'Lucía Fernández', 'Visual storyteller 🎬', 'https://i.pravatar.cc/300?u=lucia', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111107', 'pablo_cam', 'Pablo Sánchez', 'Portrait photographer', 'https://i.pravatar.cc/300?u=pablo', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111108', 'maria_clicks', 'María Jiménez', 'Fashion & lifestyle', 'https://i.pravatar.cc/300?u=maria', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111109', 'jorge_frame', 'Jorge Moreno', 'Filmmaker | Photographer', 'https://i.pravatar.cc/300?u=jorge', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111110', 'elena_view', 'Elena Díaz', 'Travel photographer ✈️', 'https://i.pravatar.cc/300?u=elena', NOW(), NOW()),
  
  -- Usuarios 11-20: Artistas
  ('11111111-1111-1111-1111-111111111111', 'arturo_paint', 'Arturo Vega', 'Digital artist 🎨', 'https://i.pravatar.cc/300?u=arturo', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111112', 'carmen_design', 'Carmen Reyes', 'Graphic designer', 'https://i.pravatar.cc/300?u=carmen', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111113', 'roberto_art', 'Roberto Muñoz', 'Ilustrador freelance', 'https://i.pravatar.cc/300?u=roberto', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111114', 'isabel_create', 'Isabel Castro', 'UI/UX Designer', 'https://i.pravatar.cc/300?u=isabel', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111115', 'fernando_sketch', 'Fernando Ortiz', 'Sketch artist ✏️', 'https://i.pravatar.cc/300?u=fernando', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111116', 'patricia_colors', 'Patricia Herrera', 'Acuarela & óleo', 'https://i.pravatar.cc/300?u=patricia', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111117', 'andres_pixels', 'Andrés Romero', 'Pixel art enthusiast', 'https://i.pravatar.cc/300?u=andres', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111118', 'claudia_3d', 'Claudia Vargas', '3D Artist | Blender', 'https://i.pravatar.cc/300?u=claudia', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111119', 'ricardo_motion', 'Ricardo Flores', 'Motion designer', 'https://i.pravatar.cc/300?u=ricardo', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111120', 'laura_visual', 'Laura Navarro', 'Visual artist', 'https://i.pravatar.cc/300?u=laura', NOW(), NOW()),
  
  -- Usuarios 21-30: Influencers
  ('11111111-1111-1111-1111-111111111121', 'diego_life', 'Diego Aguilar', 'Living my best life 🌟', 'https://i.pravatar.cc/300?u=diego', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111122', 'valentina_style', 'Valentina Cruz', 'Fashion blogger', 'https://i.pravatar.cc/300?u=valentina', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111123', 'sebastian_fitness', 'Sebastián Ramos', 'Fitness coach 💪', 'https://i.pravatar.cc/300?u=sebastian', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111124', 'camila_travel', 'Camila Peña', 'Wanderlust 🌍', 'https://i.pravatar.cc/300?u=camila', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111125', 'nicolas_food', 'Nicolás Medina', 'Foodie & chef', 'https://i.pravatar.cc/300?u=nicolas', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111126', 'daniela_beauty', 'Daniela Rojas', 'Makeup artist 💄', 'https://i.pravatar.cc/300?u=daniela', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111127', 'alejandro_tech', 'Alejandro Silva', 'Tech reviewer 📱', 'https://i.pravatar.cc/300?u=alejandro', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111128', 'natalia_yoga', 'Natalia Guerrero', 'Yoga instructor 🧘‍♀️', 'https://i.pravatar.cc/300?u=natalia', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111129', 'mateo_gaming', 'Mateo Ríos', 'Gamer | Streamer', 'https://i.pravatar.cc/300?u=mateo', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111130', 'victoria_music', 'Victoria Soto', 'Music lover 🎵', 'https://i.pravatar.cc/300?u=victoria', NOW(), NOW()),
  
  -- Usuarios 31-40: Creativos
  ('11111111-1111-1111-1111-111111111131', 'gabriel_write', 'Gabriel Mendoza', 'Writer & poet ✍️', 'https://i.pravatar.cc/300?u=gabriel', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111132', 'valeria_dance', 'Valeria Paredes', 'Dancer | Choreographer', 'https://i.pravatar.cc/300?u=valeria', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111133', 'adrian_music', 'Adrián Campos', 'Producer & DJ 🎧', 'https://i.pravatar.cc/300?u=adrian', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111134', 'renata_film', 'Renata Ibarra', 'Indie filmmaker', 'https://i.pravatar.cc/300?u=renata', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111135', 'emilio_actor', 'Emilio Delgado', 'Actor | Model', 'https://i.pravatar.cc/300?u=emilio', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111136', 'paula_sing', 'Paula Contreras', 'Singer-songwriter 🎤', 'https://i.pravatar.cc/300?u=paula', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111137', 'ivan_comedy', 'Iván Escobar', 'Stand-up comedian 😂', 'https://i.pravatar.cc/300?u=ivan', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111138', 'mariana_chef', 'Mariana Lagos', 'Pastry chef 🍰', 'https://i.pravatar.cc/300?u=mariana', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111139', 'oscar_dj', 'Óscar Villegas', 'Electronic music', 'https://i.pravatar.cc/300?u=oscar', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111140', 'andrea_host', 'Andrea Córdoba', 'Event host | MC', 'https://i.pravatar.cc/300?u=andrea', NOW(), NOW()),
  
  -- Usuarios 41-50: Adventurers
  ('11111111-1111-1111-1111-111111111141', 'felipe_climb', 'Felipe Montoya', 'Mountain climber ⛰️', 'https://i.pravatar.cc/300?u=felipe', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111142', 'lorena_dive', 'Lorena Parra', 'Scuba diver 🤿', 'https://i.pravatar.cc/300?u=lorena', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111143', 'santiago_surf', 'Santiago Cardenas', 'Surfer dude 🏄‍♂️', 'https://i.pravatar.cc/300?u=santiago', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111144', 'juliana_hike', 'Juliana Ospina', 'Hiking enthusiast', 'https://i.pravatar.cc/300?u=juliana', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111145', 'mauricio_bike', 'Mauricio Zapata', 'MTB rider 🚴', 'https://i.pravatar.cc/300?u=mauricio', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111146', 'carolina_run', 'Carolina Mejía', 'Marathon runner 🏃‍♀️', 'https://i.pravatar.cc/300?u=carolina', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111147', 'julian_camp', 'Julián Giraldo', 'Camping & outdoors', 'https://i.pravatar.cc/300?u=julian', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111148', 'monica_kayak', 'Mónica Valencia', 'Kayaking adventures', 'https://i.pravatar.cc/300?u=monica', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111149', 'luis_skate', 'Luis Bermúdez', 'Skater | Videographer', 'https://i.pravatar.cc/300?u=luis', NOW(), NOW()),
  ('11111111-1111-1111-1111-111111111150', 'diana_photo', 'Diana Aristizábal', 'Nature lover 🌿', 'https://i.pravatar.cc/300?u=diana', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ================================
-- STEP 2: Create 200 Posts (4 per user)
-- Using Picsum for random images
-- ================================

DO $$
DECLARE
    user_record RECORD;
    post_count INTEGER;
    captions TEXT[] := ARRAY[
        'Momentos que no se olvidan ✨',
        'La vida es mejor con buenas vistas 🌅',
        'Capturando la magia del momento 📸',
        'Aventuras y descubrimientos 🌟',
        'Cada día es una nueva oportunidad',
        'Viviendo el presente al máximo',
        'La creatividad no tiene límites 🎨',
        'Explorando nuevos horizontes',
        'Felicidad en estado puro 💫',
        'El arte está en todas partes',
        'Naturaleza en su máxima expresión 🌿',
        'Sonrisas y buenos recuerdos',
        'Un día para recordar',
        'La belleza está en los detalles',
        'Siguiendo mis sueños ⭐',
        'Inspiración diaria',
        'Colores que alegran el alma 🌈',
        'Paz interior 🧘',
        'Momentos mágicos',
        'Gratitud por cada día'
    ];
    locations TEXT[] := ARRAY[
        'Bogotá, Colombia',
        'Medellín, Colombia', 
        'Cartagena, Colombia',
        'Cali, Colombia',
        'Santa Marta, Colombia',
        'Barranquilla, Colombia',
        'San Andrés, Colombia',
        'Villa de Leyva',
        'Guatapé, Antioquia',
        'Salento, Quindío',
        'Tayrona, Magdalena',
        'Cocora Valley',
        'Caño Cristales',
        'Leticia, Amazonas',
        'Providencia Island'
    ];
BEGIN
    FOR user_record IN 
        SELECT id FROM profiles 
        WHERE id LIKE '11111111-1111-1111-1111-1111111111%'
    LOOP
        FOR post_count IN 1..4 LOOP
            INSERT INTO posts (user_id, image_url, caption, location, created_at)
            VALUES (
                user_record.id,
                'https://picsum.photos/800/800?random=' || EXTRACT(EPOCH FROM NOW())::INTEGER + post_count + CAST(SUBSTRING(user_record.id::TEXT, 36, 2) AS INTEGER),
                captions[1 + (RANDOM() * 19)::INTEGER],
                CASE WHEN RANDOM() > 0.3 THEN locations[1 + (RANDOM() * 14)::INTEGER] ELSE NULL END,
                NOW() - (RANDOM() * INTERVAL '30 days')
            );
        END LOOP;
    END LOOP;
END $$;

-- ================================
-- VERIFICATION: Check counts
-- ================================
SELECT 'Profiles created:', COUNT(*) FROM profiles WHERE id LIKE '11111111-1111-1111-1111-1111111111%';
SELECT 'Posts created:', COUNT(*) FROM posts;
