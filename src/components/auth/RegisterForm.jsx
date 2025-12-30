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
    const { signUp, loading } = useAuthStore();
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

            <p className="auth-form__footer">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => setAuthModalMode('login')} className="auth-form__link">
                    Inicia Sesión
                </button>
            </p>
        </div>
    );
}
