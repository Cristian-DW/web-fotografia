import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { db, storage } from '../../lib/supabase';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Avatar from '../shared/Avatar';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const { user, profile } = useAuthStore();
  const { createPostModalOpen, closeCreatePostModal } = useUIStore();
  const [step, setStep] = useState('select'); // 'select' | 'edit' | 'uploading'
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes');
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar 5MB');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setStep('edit');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect({ target: { files: [droppedFile] } });
    }
  };

  const handleSubmit = async () => {
    if (!file || !user) {
      console.error('❌ Missing required data:', { file: !!file, user: !!user });
      toast.error('Faltan datos necesarios');
      return;
    }

    console.log('🚀 Starting post creation...', {
      userId: user.id,
      fileSize: file.size,
      fileType: file.type
    });

    setUploading(true);
    setStep('uploading');

    try {
      // Upload image with timeout
      console.log('📤 Uploading image...');
      const uploadPromise = storage.uploadPostImage(user.id, file);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Upload timeout')), 30000)
      );

      const { url, error: uploadError } = await Promise.race([uploadPromise, timeoutPromise]);

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw uploadError;
      }

      console.log('✅ Image uploaded:', url);

      // Create post
      console.log('📝 Creating post record...');
      const postData = {
        user_id: user.id,
        image_url: url,
        caption: caption.trim() || null,
        location: location.trim() || null
      };
      console.log('Post data:', postData);

      const { error: postError } = await db.createPost(postData);

      if (postError) {
        console.error('❌ Post creation error:', postError);
        throw postError;
      }

      console.log('✅ Post created successfully');
      toast.success('¡Publicación creada!');
      handleClose();
    } catch (error) {
      console.error('❌ Error creating post:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });

      let errorMessage = 'Error al publicar';
      if (error.message === 'Upload timeout') {
        errorMessage = 'La subida de imagen tardó demasiado. Verifica tu conexión.';
      } else if (error.message?.includes('permission')) {
        errorMessage = 'No tienes permisos. Verifica las políticas RLS en Supabase.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      toast.error(errorMessage);
      setStep('edit');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setCaption('');
    setLocation('');
    setStep('select');
    closeCreatePostModal();
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={createPostModalOpen}
      onClose={handleClose}
      title={step === 'select' ? 'Crear nueva publicación' : 'Nueva publicación'}
      size="lg"
    >
      <div className="create-post">
        {step === 'select' && (
          <div
            className="create-post__dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="create-post__file-input"
            />
            <div className="create-post__dropzone-content">
              <svg className="create-post__dropzone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="create-post__dropzone-text">
                Arrastra una foto aquí
              </p>
              <Button variant="primary">
                Seleccionar del dispositivo
              </Button>
            </div>
          </div>
        )}

        {step === 'edit' && preview && (
          <div className="create-post__editor">
            <div className="create-post__preview">
              <img src={preview} alt="Preview" className="create-post__preview-image" />
            </div>
            <div className="create-post__form">
              <div className="create-post__user">
                <Avatar
                  src={profile?.avatar_url}
                  alt={profile?.display_name || profile?.username}
                  size="sm"
                />
                <span className="create-post__username">{profile?.username}</span>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escribe una descripción..."
                className="create-post__caption"
                maxLength={2200}
              />
              <div className="create-post__caption-count">
                {caption.length}/2200
              </div>
              <div className="create-post__location">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Añadir ubicación"
                  className="create-post__location-input"
                />
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={handleSubmit}
                loading={uploading}
              >
                Compartir
              </Button>
            </div>
          </div>
        )}

        {step === 'uploading' && (
          <div className="create-post__uploading">
            <div className="create-post__uploading-spinner">
              <svg className="animate-spin w-12 h-12" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p>Publicando...</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .create-post {
          min-height: 400px;
        }
        
        .create-post__dropzone {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        
        .create-post__dropzone:hover {
          border-color: var(--accent-primary);
          background: rgba(139, 92, 246, 0.05);
        }
        
        .create-post__file-input {
          display: none;
        }
        
        .create-post__dropzone-content {
          text-align: center;
        }
        
        .create-post__dropzone-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          color: var(--text-tertiary);
        }
        
        .create-post__dropzone-text {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        
        .create-post__editor {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        
        @media (min-width: 640px) {
          .create-post__editor {
            grid-template-columns: 1fr 280px;
          }
        }
        
        .create-post__preview {
          aspect-ratio: 1 / 1;
          max-height: 500px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }
        
        .create-post__preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .create-post__form {
          padding: 16px;
          display: flex;
          flex-direction: column;
          border-left: 1px solid var(--border-color);
        }
        
        .create-post__user {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .create-post__username {
          font-weight: 600;
        }
        
        .create-post__caption {
          flex: 1;
          min-height: 120px;
          padding: 0;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 0.9375rem;
          resize: none;
        }
        
        .create-post__caption::placeholder {
          color: var(--text-tertiary);
        }
        
        .create-post__caption:focus {
          outline: none;
        }
        
        .create-post__caption-count {
          text-align: right;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }
        
        .create-post__location {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 16px;
          color: var(--text-tertiary);
        }
        
        .create-post__location-input {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }
        
        .create-post__location-input::placeholder {
          color: var(--text-tertiary);
        }
        
        .create-post__location-input:focus {
          outline: none;
        }
        
        .create-post__uploading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
          color: var(--text-secondary);
        }
        
        .create-post__uploading-spinner {
          color: var(--accent-primary);
        }
      `}</style>
    </Modal>
  );
}
