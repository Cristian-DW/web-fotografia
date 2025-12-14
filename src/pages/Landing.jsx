import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

// Import sample images for the collage
import Photo1 from '../media/photos-gallery/photo1.jpg';
import Photo2 from '../media/photos-gallery/photo2.jpg';
import Photo3 from '../media/photos-gallery/photo3.jpg';
import Photo4 from '../media/photos-gallery/photo4.jpg';

export default function Landing() {
    const { user, signIn, signUp, signInWithGoogle, loading } = useAuthStore();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        displayName: ''
    });
    const [errors, setErrors] = useState({});

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/feed');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Mínimo 6 caracteres';
        }

        if (!isLogin) {
            if (!formData.username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
                newErrors.username = 'Usuario: 3-20 caracteres, solo letras, números y _';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isLogin) {
            const result = await signIn(formData.email, formData.password);
            if (result.success) {
                toast.success('¡Bienvenido de vuelta!');
                navigate('/feed');
            } else {
                toast.error(result.error || 'Error al iniciar sesión');
            }
        } else {
            const result = await signUp(
                formData.email,
                formData.password,
                formData.username,
                formData.displayName || formData.username
            );

            if (result.success) {
                toast.success('¡Cuenta creada! Revisa tu email para confirmar.');
            } else {
                toast.error(result.error || 'Error al crear cuenta');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const result = await signInWithGoogle();
        if (!result.success) {
            toast.error(result.error || 'Error con Google');
        }
    };

    return (
        <div className="landing">
            {/* Left Side - Creative Visual */}
            <div className="landing__visual">
                <div className="landing__collage">
                    {/* Floating phone mockup with images */}
                    <div className="landing__phone">
                        <div className="landing__phone-screen">
                            <img src={Photo1} alt="" className="landing__phone-img" />
                        </div>
                    </div>

                    {/* Floating photo cards */}
                    <div className="landing__card landing__card--1">
                        <img src={Photo2} alt="" />
                        <div className="landing__card-reactions">
                            <span>🔥</span>
                            <span>❤️</span>
                        </div>
                    </div>

                    <div className="landing__card landing__card--2">
                        <img src={Photo3} alt="" />
                        <div className="landing__card-badge">✨</div>
                    </div>

                    <div className="landing__card landing__card--3">
                        <img src={Photo4} alt="" />
                        <span className="landing__card-heart">♥</span>
                    </div>

                    {/* Floating elements */}
                    <div className="landing__float landing__float--1">💫</div>
                    <div className="landing__float landing__float--2">🎨</div>
                    <div className="landing__float landing__float--3">📸</div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="landing__auth">
                <div className="landing__auth-container">
                    {/* Logo */}
                    <div className="landing__logo">
                        <span className="landing__logo-icon">✦</span>
                        <h1 className="landing__logo-text">Lumina</h1>
                    </div>

                    {/* Tagline */}
                    <p className="landing__tagline">
                        {isLogin
                            ? 'Donde tus momentos cobran vida'
                            : 'Únete a la comunidad creativa'}
                    </p>

                    {/* Description for register */}
                    {!isLogin && (
                        <div className="landing__description">
                            <p>
                                <strong>Lumina</strong> es tu espacio para brillar. Comparte tus fotos,
                                experiencias y conecta con personas que celebran la autenticidad.
                            </p>
                            <ul className="landing__features">
                                <li>📸 Comparte momentos únicos</li>
                                <li>💬 Conecta con tu comunidad</li>
                                <li>✨ Sé auténtico, sé tú</li>
                            </ul>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="landing__form">
                        {!isLogin && (
                            <>
                                <div className="landing__input-group">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Nombre de usuario"
                                        className={`landing__input ${errors.username ? 'landing__input--error' : ''}`}
                                        required
                                    />
                                    {errors.username && <span className="landing__error">{errors.username}</span>}
                                </div>

                                <div className="landing__input-group">
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        placeholder="Nombre completo (opcional)"
                                        className="landing__input"
                                    />
                                </div>
                            </>
                        )}

                        <div className="landing__input-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                                className={`landing__input ${errors.email ? 'landing__input--error' : ''}`}
                                required
                            />
                            {errors.email && <span className="landing__error">{errors.email}</span>}
                        </div>

                        <div className="landing__input-group">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                className={`landing__input ${errors.password ? 'landing__input--error' : ''}`}
                                required
                            />
                            {errors.password && <span className="landing__error">{errors.password}</span>}
                        </div>

                        {!isLogin && (
                            <div className="landing__input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirmar contraseña"
                                    className={`landing__input ${errors.confirmPassword ? 'landing__input--error' : ''}`}
                                    required
                                />
                                {errors.confirmPassword && <span className="landing__error">{errors.confirmPassword}</span>}
                            </div>
                        )}

                        <button type="submit" className="landing__submit" disabled={loading}>
                            {loading ? (
                                <span className="landing__spinner"></span>
                            ) : (
                                isLogin ? 'Iniciar Sesión' : 'Registrarse'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="landing__divider">
                        <span>O</span>
                    </div>

                    {/* Google Login */}
                    <button onClick={handleGoogleSignIn} className="landing__google" disabled={loading}>
                        <svg className="landing__google-icon" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuar con Google
                    </button>

                    {isLogin && (
                        <button className="landing__forgot">
                            ¿Olvidaste tu contraseña?
                        </button>
                    )}

                    {/* Switch Form */}
                    <div className="landing__switch">
                        {isLogin ? (
                            <p>
                                ¿No tienes cuenta?{' '}
                                <button onClick={() => setIsLogin(false)}>Regístrate</button>
                            </p>
                        ) : (
                            <p>
                                ¿Ya tienes cuenta?{' '}
                                <button onClick={() => setIsLogin(true)}>Inicia sesión</button>
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="landing__footer">
                    <p>© 2024 Lumina. Tu espacio para brillar.</p>
                </footer>
            </div>

            <style jsx>{`
        .landing {
          min-height: 100vh;
          display: flex;
          background: var(--bg-primary);
        }

        /* Left Side - Visual */
        .landing__visual {
          display: none;
          flex: 1;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
          position: relative;
          overflow: hidden;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .landing__visual {
            display: flex;
          }
        }

        .landing__collage {
          position: relative;
          width: 400px;
          height: 500px;
        }

        .landing__phone {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 220px;
          height: 440px;
          background: #1a1a1a;
          border-radius: 36px;
          padding: 12px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }

        .landing__phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
        }

        .landing__phone-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .landing__card {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          animation: float 6s ease-in-out infinite;
        }

        .landing__card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .landing__card--1 {
          width: 120px;
          height: 150px;
          top: 20px;
          left: 0;
          animation-delay: 0s;
        }

        .landing__card--2 {
          width: 100px;
          height: 130px;
          bottom: 30px;
          left: 20px;
          animation-delay: 1s;
        }

        .landing__card--3 {
          width: 110px;
          height: 140px;
          top: 40px;
          right: 0;
          animation-delay: 2s;
        }

        .landing__card-reactions {
          position: absolute;
          top: -10px;
          right: -10px;
          display: flex;
          gap: 4px;
        }

        .landing__card-reactions span {
          background: white;
          padding: 4px;
          border-radius: 50%;
          font-size: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .landing__card-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--accent-primary);
          color: white;
          padding: 6px;
          border-radius: 50%;
          font-size: 12px;
        }

        .landing__card-heart {
          position: absolute;
          bottom: 8px;
          right: 8px;
          color: #ef4444;
          font-size: 18px;
        }

        .landing__float {
          position: absolute;
          font-size: 24px;
          animation: floatEmoji 4s ease-in-out infinite;
        }

        .landing__float--1 { top: 10%; left: 10%; animation-delay: 0s; }
        .landing__float--2 { bottom: 20%; right: 15%; animation-delay: 1.5s; }
        .landing__float--3 { top: 30%; right: 5%; animation-delay: 3s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }

        /* Right Side - Auth */
        .landing__auth {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 24px;
          max-width: 500px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .landing__auth {
            max-width: 450px;
            margin: 0;
          }
        }

        .landing__auth-container {
          width: 100%;
          max-width: 350px;
        }

        .landing__logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .landing__logo-icon {
          font-size: 2.5rem;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .landing__logo-text {
          font-family: 'Audiowide', cursive;
          font-size: 2.5rem;
          margin: 0;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .landing__tagline {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 1rem;
        }

        .landing__description {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 16px;
          margin-bottom: 24px;
        }

        .landing__description p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0 0 12px 0;
        }

        .landing__features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .landing__features li {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .landing__form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .landing__input-group {
          position: relative;
        }

        .landing__input {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9375rem;
          transition: var(--transition-fast);
        }

        .landing__input::placeholder {
          color: var(--text-tertiary);
        }

        .landing__input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .landing__input--error {
          border-color: #ef4444;
        }

        .landing__error {
          display: block;
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 4px;
        }

        .landing__submit {
          width: 100%;
          padding: 14px;
          background: var(--accent-gradient);
          border: none;
          border-radius: var(--radius-sm);
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          margin-top: 8px;
        }

        .landing__submit:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .landing__submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .landing__spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .landing__divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
          color: var(--text-tertiary);
          font-size: 0.875rem;
        }

        .landing__divider::before,
        .landing__divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-color);
        }

        .landing__google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .landing__google:hover:not(:disabled) {
          background: var(--bg-secondary);
        }

        .landing__google:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .landing__google-icon {
          width: 18px;
          height: 18px;
        }

        .landing__forgot {
          display: block;
          width: 100%;
          margin-top: 16px;
          background: none;
          border: none;
          color: var(--accent-primary);
          font-size: 0.875rem;
          cursor: pointer;
          text-align: center;
        }

        .landing__forgot:hover {
          text-decoration: underline;
        }

        .landing__switch {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          text-align: center;
        }

        .landing__switch p {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          margin: 0;
        }

        .landing__switch button {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 600;
          cursor: pointer;
        }

        .landing__switch button:hover {
          text-decoration: underline;
        }

        .landing__footer {
          margin-top: 40px;
          text-align: center;
        }

        .landing__footer p {
          color: var(--text-tertiary);
          font-size: 0.75rem;
          margin: 0;
        }
      `}</style>
        </div>
    );
}
