import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import toast from 'react-hot-toast';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading, error } = useAuthStore();
    const { setAuthModalMode, closeAuthModal } = useUIStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn(email, password);
        if (result.success) {
            toast.success('¡Bienvenido de vuelta!');
            closeAuthModal();
        } else {
            toast.error(result.error || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-form__header">
                <h2 className="auth-form__title">Bienvenido</h2>
                <p className="auth-form__subtitle">Inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form__body">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    {loading ? (
                        <span className="btn-loading">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </span>
                    ) : 'Iniciar Sesión'}
                </button>
            </form>

            <p className="auth-form__footer">
                ¿No tienes cuenta?{' '}
                <button onClick={() => setAuthModalMode('register')} className="auth-form__link">
                    Regístrate
                </button>
            </p>
        </div>
    );
}
