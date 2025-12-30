import React, { useState, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { storage } from '../lib/supabase';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import toast from 'react-hot-toast';

export default function Settings() {
    const { user, profile, updateProfile, signOut } = useAuthStore();
    const { openAuthModal } = useUIStore();
    const [loading, setLoading] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        display_name: profile?.display_name || '',
        username: profile?.username || '',
        bio: profile?.bio || '',
        website: profile?.website || '',
        location: profile?.location || ''
    });

    if (!user) {
        return (
            <div className="container">
                <div className="settings-auth">
                    <h2>Configuración</h2>
                    <p>Inicia sesión para acceder a la configuración</p>
                    <button onClick={() => openAuthModal('login')} className="btn btn--primary">
                        Iniciar Sesión
                    </button>
                </div>

                <style jsx>{`
          .settings-auth {
            text-align: center;
            padding: 64px 24px;
          }
        `}</style>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { success, error } = await updateProfile(formData);

        if (success) {
            toast.success('Perfil actualizado');
        } else {
            toast.error(error || 'Error al actualizar');
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        await signOut();
        toast.success('Sesión cerrada');
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Por favor selecciona una imagen válida (JPG, PNG, WEBP)');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error('La imagen debe ser menor a 5MB');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload avatar
        setUploadingAvatar(true);
        try {
            const { url, error } = await storage.uploadAvatarImage(user.id, file);

            if (error) {
                throw error;
            }

            // Update profile with new avatar
            const { success, error: updateError } = await updateProfile({ avatar_url: url });

            if (success) {
                toast.success('Foto de perfil actualizada');
                setAvatarPreview(null);
            } else {
                throw updateError;
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error('Error al subir la foto');
            setAvatarPreview(null);
        } finally {
            setUploadingAvatar(false);
        }
    };

    return (
        <div className="container">
            <div className="settings">
                <h1 className="settings__title">Configuración</h1>

                {/* Profile Section */}
                <section className="settings-section">
                    <h2 className="settings-section__title">Editar Perfil</h2>

                    <form onSubmit={handleSubmit} className="settings-form">
                        <div className="settings-form__avatar">
                            <Avatar
                                src={avatarPreview || profile?.avatar_url}
                                alt={profile?.display_name || profile?.username}
                                size="xl"
                            />
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleAvatarChange}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleAvatarClick}
                                    loading={uploadingAvatar}
                                    type="button"
                                >
                                    {uploadingAvatar ? 'Subiendo...' : 'Cambiar foto'}
                                </Button>
                                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>
                                    JPG, PNG o WEBP. Máximo 5MB.
                                </p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="display_name"
                                value={formData.display_name}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="tu_usuario"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="form-input form-textarea"
                                placeholder="Cuéntanos sobre ti..."
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sitio web</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://tu-sitio.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Ubicación</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ciudad, País"
                            />
                        </div>

                        <Button type="submit" variant="primary" loading={loading} fullWidth>
                            Guardar cambios
                        </Button>
                    </form>
                </section>

                {/* Account Section */}
                <section className="settings-section">
                    <h2 className="settings-section__title">Cuenta</h2>

                    <div className="settings-item">
                        <div>
                            <h3 className="settings-item__title">Email</h3>
                            <p className="settings-item__value">{user.email}</p>
                        </div>
                    </div>

                    <div className="settings-item settings-item--danger">
                        <div>
                            <h3 className="settings-item__title">Cerrar sesión</h3>
                            <p className="settings-item__desc">Cerrar sesión en este dispositivo</p>
                        </div>
                        <Button variant="danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </div>
                </section>
            </div>

            <style jsx>{`
        .settings {
          padding: 24px 0 64px;
        }
        
        .settings__title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 32px 0;
        }
        
        .settings-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .settings-section__title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 20px 0;
        }
        
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .settings-form__avatar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }
        
        .settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .settings-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .settings-item__title {
          font-size: 0.9375rem;
          font-weight: 500;
          margin: 0 0 4px 0;
        }
        
        .settings-item__value {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
        
        .settings-item__desc {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          margin: 0;
        }
      `}</style>
        </div>
    );
}
