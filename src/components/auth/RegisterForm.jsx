import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import toast from 'react-hot-toast';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        displayName: ''
    });
    const [errors, setErrors] = useState({});
    const { signUp, signInWithGoogle, loading } = useAuthStore();
    const { setAuthModalMode, closeAuthModal } = useUIStore();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
            newErrors.username = 'Usuario: 3-20 caracteres, solo letras, números y _';
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Email inválido';
        }

        // Enhanced password validation
        if (formData.password.length < 8) {
            newErrors.password = 'Mínimo 8 caracteres';
        } else if (!/\d/.test(formData.password)) {
            newErrors.password = 'Debe contener al menos un número';
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = 'Debe contener al menos una mayúscula';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await signUp(
            formData.email,
            formData.password,
            formData.username,
            formData.displayName || formData.username
        );

        if (result.success) {
            toast.success('¡Cuenta creada! Revisa tu email para confirmar.');
            closeAuthModal();
        } else {
            toast.error(result.error || 'Error al crear cuenta');
        }
    };

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="auth-form">
            <div className="auth-form__header">
                <h2 className="auth-form__title">Únete a FrameFusion</h2>
                <p className="auth-form__subtitle">Crea tu cuenta y empieza a compartir</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form__body">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`form-input ${errors.username ? 'form-input--error' : ''}`}
                            placeholder="tu_usuario"
                            required
                        />
                        {errors.username && <span className="form-error-text">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="displayName" className="form-label">Nombre (opcional)</label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Tu Nombre"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                        placeholder="tu@email.com"
                        required
                    />
                    {errors.email && <span className="form-error-text">{errors.email}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <span className="form-error-text">{errors.password}</span>}
                        {!errors.password && (
                            <span className="form-helper-text" style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px', display: 'block' }}>
                                Mínimo 8 caracteres, incluye números y mayúsculas
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
                            placeholder="••••••••"
                            required
                        />
                        {errors.confirmPassword && <span className="form-error-text">{errors.confirmPassword}</span>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    {loading ? (
                        <span className="btn-loading">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </span>
                    ) : 'Crear Cuenta'}
                </button>
            </form>

            <div className="auth-form__divider">
                <span>o continúa con</span>
            </div>

            <button onClick={handleGoogleSignIn} className="btn btn-google btn-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
            </button>

            <p className="auth-form__footer">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setAuthModalMode('login')} className="auth-form__link">
                    Inicia Sesión
                </button>
            </p>
        </div>
    );
}
