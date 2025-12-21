/**
 * Script para crear 50 usuarios de prueba con autenticación en Supabase
 * 
 * REQUISITOS:
 * 1. Instalar: npm install @supabase/supabase-js
 * 2. Obtener SUPABASE_SERVICE_ROLE_KEY desde Supabase Dashboard > Settings > API
 * 3. Ejecutar: node create-test-users.js
 */

const { createClient } = require('@supabase/supabase-js');

// Configuración
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'TU_SUPABASE_URL';
const SUPABASE_SERVICE_KEY = 'TU_SERVICE_ROLE_KEY'; // ⚠️ NUNCA subas esto a Git!
const PASSWORD = 'Lumina2024!'; // Password para todos los usuarios

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const users = [
    // Fotógrafos
    { id: '11111111-1111-1111-1111-111111111101', email: 'carlos@test.com', username: 'carlos_foto', display_name: 'Carlos Mendez' },
    { id: '11111111-1111-1111-1111-111111111102', email: 'ana@test.com', username: 'ana_captures', display_name: 'Ana García' },
    { id: '11111111-1111-1111-1111-111111111103', email: 'miguel@test.com', username: 'miguel_lens', display_name: 'Miguel Torres' },
    { id: '11111111-1111-1111-1111-111111111104', email: 'sofia@test.com', username: 'sofia_art', display_name: 'Sofia Ruiz' },
    { id: '11111111-1111-1111-1111-111111111105', email: 'david@test.com', username: 'david_shots', display_name: 'David López' },
    { id: '11111111-1111-1111-1111-111111111106', email: 'lucia@test.com', username: 'lucia_visual', display_name: 'Lucía Fernández' },
    { id: '11111111-1111-1111-1111-111111111107', email: 'pablo@test.com', username: 'pablo_cam', display_name: 'Pablo Sánchez' },
    { id: '11111111-1111-1111-1111-111111111108', email: 'maria@test.com', username: 'maria_clicks', display_name: 'María Jiménez' },
    { id: '11111111-1111-1111-1111-111111111109', email: 'jorge@test.com', username: 'jorge_frame', display_name: 'Jorge Moreno' },
    { id: '11111111-1111-1111-1111-111111111110', email: 'elena@test.com', username: 'elena_view', display_name: 'Elena Díaz' },

    // Artistas
    { id: '11111111-1111-1111-1111-111111111111', email: 'arturo@test.com', username: 'arturo_paint', display_name: 'Arturo Vega' },
    { id: '11111111-1111-1111-1111-111111111112', email: 'carmen@test.com', username: 'carmen_design', display_name: 'Carmen Reyes' },
    { id: '11111111-1111-1111-1111-111111111113', email: 'roberto@test.com', username: 'roberto_art', display_name: 'Roberto Muñoz' },
    { id: '11111111-1111-1111-1111-111111111114', email: 'isabel@test.com', username: 'isabel_create', display_name: 'Isabel Castro' },
    { id: '11111111-1111-1111-1111-111111111115', email: 'fernando@test.com', username: 'fernando_sketch', display_name: 'Fernando Ortiz' },
    { id: '11111111-1111-1111-1111-111111111116', email: 'patricia@test.com', username: 'patricia_colors', display_name: 'Patricia Herrera' },
    { id: '11111111-1111-1111-1111-111111111117', email: 'andres@test.com', username: 'andres_pixels', display_name: 'Andrés Romero' },
    { id: '11111111-1111-1111-1111-111111111118', email: 'claudia@test.com', username: 'claudia_3d', display_name: 'Claudia Vargas' },
    { id: '11111111-1111-1111-1111-111111111119', email: 'ricardo@test.com', username: 'ricardo_motion', display_name: 'Ricardo Flores' },
    { id: '11111111-1111-1111-1111-111111111120', email: 'laura@test.com', username: 'laura_visual', display_name: 'Laura Navarro' },

    // Influencers
    { id: '11111111-1111-1111-1111-111111111121', email: 'diego@test.com', username: 'diego_life', display_name: 'Diego Aguilar' },
    { id: '11111111-1111-1111-1111-111111111122', email: 'valentina@test.com', username: 'valentina_style', display_name: 'Valentina Cruz' },
    { id: '11111111-1111-1111-1111-111111111123', email: 'sebastian@test.com', username: 'sebastian_fitness', display_name: 'Sebastián Ramos' },
    { id: '11111111-1111-1111-1111-111111111124', email: 'camila@test.com', username: 'camila_travel', display_name: 'Camila Peña' },
    { id: '11111111-1111-1111-1111-111111111125', email: 'nicolas@test.com', username: 'nicolas_food', display_name: 'Nicolás Medina' },
    { id: '11111111-1111-1111-1111-111111111126', email: 'daniela@test.com', username: 'daniela_beauty', display_name: 'Daniela Rojas' },
    { id: '11111111-1111-1111-1111-111111111127', email: 'alejandro@test.com', username: 'alejandro_tech', display_name: 'Alejandro Silva' },
    { id: '11111111-1111-1111-1111-111111111128', email: 'natalia@test.com', username: 'natalia_yoga', display_name: 'Natalia Guerrero' },
    { id: '11111111-1111-1111-1111-111111111129', email: 'mateo@test.com', username: 'mateo_gaming', display_name: 'Mateo Ríos' },
    { id: '11111111-1111-1111-1111-111111111130', email: 'victoria@test.com', username: 'victoria_music', display_name: 'Victoria Soto' },

    // Creativos
    { id: '11111111-1111-1111-1111-111111111131', email: 'gabriel@test.com', username: 'gabriel_write', display_name: 'Gabriel Mendoza' },
    { id: '11111111-1111-1111-1111-111111111132', email: 'valeria@test.com', username: 'valeria_dance', display_name: 'Valeria Paredes' },
    { id: '11111111-1111-1111-1111-111111111133', email: 'adrian@test.com', username: 'adrian_music', display_name: 'Adrián Campos' },
    { id: '11111111-1111-1111-1111-111111111134', email: 'renata@test.com', username: 'renata_film', display_name: 'Renata Ibarra' },
    { id: '11111111-1111-1111-1111-111111111135', email: 'emilio@test.com', username: 'emilio_actor', display_name: 'Emilio Delgado' },
    { id: '11111111-1111-1111-1111-111111111136', email: 'paula@test.com', username: 'paula_sing', display_name: 'Paula Contreras' },
    { id: '11111111-1111-1111-1111-111111111137', email: 'ivan@test.com', username: 'ivan_comedy', display_name: 'Iván Escobar' },
    { id: '11111111-1111-1111-1111-111111111138', email: 'mariana@test.com', username: 'mariana_chef', display_name: 'Mariana Lagos' },
    { id: '11111111-1111-1111-1111-111111111139', email: 'oscar@test.com', username: 'oscar_dj', display_name: 'Óscar Villegas' },
    { id: '11111111-1111-1111-1111-111111111140', email: 'andrea@test.com', username: 'andrea_host', display_name: 'Andrea Córdoba' },

    // Aventureros
    { id: '11111111-1111-1111-1111-111111111141', email: 'felipe@test.com', username: 'felipe_climb', display_name: 'Felipe Montoya' },
    { id: '11111111-1111-1111-1111-111111111142', email: 'lorena@test.com', username: 'lorena_dive', display_name: 'Lorena Parra' },
    { id: '11111111-1111-1111-1111-111111111143', email: 'santiago@test.com', username: 'santiago_surf', display_name: 'Santiago Cardenas' },
    { id: '11111111-1111-1111-1111-111111111144', email: 'juliana@test.com', username: 'juliana_hike', display_name: 'Juliana Ospina' },
    { id: '11111111-1111-1111-1111-111111111145', email: 'mauricio@test.com', username: 'mauricio_bike', display_name: 'Mauricio Zapata' },
    { id: '11111111-1111-1111-1111-111111111146', email: 'carolina@test.com', username: 'carolina_run', display_name: 'Carolina Mejía' },
    { id: '11111111-1111-1111-1111-111111111147', email: 'julian@test.com', username: 'julian_camp', display_name: 'Julián Giraldo' },
    { id: '11111111-1111-1111-1111-111111111148', email: 'monica@test.com', username: 'monica_kayak', display_name: 'Mónica Valencia' },
    { id: '11111111-1111-1111-1111-111111111149', email: 'luis@test.com', username: 'luis_skate', display_name: 'Luis Bermúdez' },
    { id: '11111111-1111-1111-1111-111111111150', email: 'diana@test.com', username: 'diana_photo', display_name: 'Diana Aristizábal' }
];

async function createUser(user) {
    try {
        // Crear usuario en auth.users
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: PASSWORD,
            email_confirm: true, // Auto-confirmar email
            user_metadata: {
                username: user.username,
                display_name: user.display_name
            }
        });

        if (authError) {
            console.error(`❌ Error creando ${user.username}:`, authError.message);
            return false;
        }

        console.log(`✅ Usuario creado: ${user.username} (${user.email})`);
        return true;
    } catch (error) {
        console.error(`❌ Error en ${user.username}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Iniciando creación de usuarios de prueba...\n');
    console.log(`📧 Password para todos: ${PASSWORD}\n`);

    let created = 0;
    let failed = 0;

    for (const user of users) {
        const success = await createUser(user);
        if (success) created++;
        else failed++;

        // Pequeña pausa para no sobrecargar la API
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('\n📊 Resumen:');
    console.log(`✅ Creados: ${created}`);
    console.log(`❌ Fallidos: ${failed}`);
    console.log('\n💡 Ahora ejecuta supabase-seed-data.sql para crear los posts');
}

main();
