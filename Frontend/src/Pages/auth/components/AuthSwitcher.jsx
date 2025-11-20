import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FacebookLogin from '@greatsumini/react-facebook-login';
import { useGoogleLogin } from '@react-oauth/google';

import { FacebookLoginAPI, GoogleLoginAPI, LoginAPI, SingUpAPI } from '@/API/GeneralAPI';
import { handleError, handleInfo, handleSuccess } from '@/Util/Alerts';

import PawButton from '@/components/buttons/PawButton';
import FlipAuthToggle from './FlipAuthToggle';

function isEmailLike(v) {
  return typeof v === 'string' && v.includes('@') && v.includes('.');
}

export default function AuthSwitcher() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
  });
  const facbook_id = import.meta.env.VITE_Facebook_Key;
  // ---- GOOGLE LOGIN ----
  const GoogleMechanism = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${credentialResponse.access_token}` } }
        );
        const userInfo = await userInfoResponse.json();

        const response = await GoogleLoginAPI({ email: userInfo.email, name: userInfo.name });
        const data = await response.json();

        if (data.success) {
          localStorage.setItem('username', JSON.stringify(data.user_name));
          localStorage.setItem('token', data.token);
          handleSuccess('Login Successful');

          if (!data.pass_changed) {
            handleInfo('Please change your password for security reasons. You can do this in the profile section.');
          }
          navigate('/');
        } else {
          handleError(data.message || 'Google login failed');
        }
      } catch (err) {
        handleError(err?.message || 'Google login failed');
      }
    },
    onError: () => handleError('Google login failed'),
  });

  // ---- FACEBOOK (profile) CALLBACK ----
  const handleFacebookProfile = async (profile) => {
    try {
      const res = await FacebookLoginAPI({ email: profile.email, name: profile.name });
      const data = await res;

      if (data.success) {
        localStorage.setItem('username', JSON.stringify(data.user_name));
        localStorage.setItem('token', data.token);
        handleSuccess('Login Successful');

        if (!data.pass_changed) {
          handleInfo('Please change your password for security reasons. You can do this in the profile section.');
        }
        navigate('/');
      } else {
        handleError(data.message || 'Facebook login failed');
      }
    } catch (err) {
      handleError(err?.message || 'Facebook login failed');
    }
  };

  // ---- SUBMIT HANDLER (LOGIN / SIGNUP) ----
  const onSubmit = async ({ name, password }) => {
    // “name” is actually the email field (per your request)
    if (!isEmailLike(name)) {
      return setError('name', { message: 'Please enter a valid email' });
    }
    if (!password) return setError('password', { message: 'Please enter your password' });

    if (mode === 'login') {
      try {
        const resp = await LoginAPI({ email: name, password });
        const data = await resp.json();

        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', JSON.stringify(data.user_name));
          localStorage.setItem('userAuth', JSON.stringify('user'));
          handleSuccess('Login Successful');
          setTimeout(() => navigate('/'), 800);
        } else {
          handleError(data.message || 'Login failed');
        }
      } catch (err) {
        handleError(err?.message || 'Login failed');
      }
      return;
    }

    // signup
    const derivedName = name.split('@')[0] || 'Petopia User';
    try {
      const resp = await SingUpAPI({ name: derivedName, email: name, password });
      const data = await resp.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_name', JSON.stringify(data.user_name));
        handleSuccess('Signup Successful');
        setTimeout(() => navigate('/'), 800);
      } else {
        handleError(data.message || 'Signup failed');
      }
    } catch (err) {
      handleError(err?.message || 'Signup failed');
    }
  };

  const headerTitle = useMemo(
    () => (mode === 'login' ? 'Welcome back, human.' : 'Join the pack.'),
    [mode]
  );
  const submitLabel = useMemo(
    () => (isSubmitting ? (mode === 'login' ? 'Logging in...' : 'Creating...') : (mode === 'login' ? 'Login' : 'Sign Up')),
    [isSubmitting, mode]
  );

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-[640px]"
    >
      <div className="w-full text-black">
        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-2">{headerTitle}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email (fixed label for both modes) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border px-4 py-3 bg-gray-200 focus:border focus:border-ink-primary/30 outline-none transition
                                ${fieldState.error ? 'border-red-500' : 'border-transparent'} `}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          {/* Password (fixed label) */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border px-4 py-3 bg-gray-200 focus:border focus:border-ink-primary/30 outline-none transition
                                ${fieldState.error ? 'border-red-500' : 'border-transparent'} `}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          {/* Context text ABOVE submit button (per your spec) */}
          {mode === 'login' ? (
            <div className="text-xs text-ink-secondary -mt-1">
              <p className="mb-1">
                <a href="#" className="underline hover:opacity-80">Forgot password?</a>
              </p>
            </div>
          ) : (
            <div className="text-xs text-ink-secondary -mt-1">
              By continuing, you agree to our{' '}
              <a className="underline hover:opacity-80" href="#">Terms</a> &{' '}
              <a className="underline hover:opacity-80" href="#">Privacy</a>.
            </div>
          )}

          {/* Submit: use your PawButton as the ONLY submit button */}
          <div className="mt-1 w-full">
            {/* If PawButton supports type prop, this is enough: */}
            {/* <PawButton type="submit" loading={isSubmitting} label={submitLabel} /> */}

            {/* If not, wrap it in a native submit button to guarantee form submit: */}
            <button type="submit" disabled={isSubmitting} className="w-full disabled:opacity-70">
              <PawButton loading={isSubmitting} label={submitLabel} />
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center justify-center gap-3 text-xs text-ink-secondary">
            <span className="h-px w-16 bg-ink-secondary/30" />
            <span>or continue with</span>
            <span className="h-px w-16 bg-ink-secondary/30" />
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); GoogleMechanism(); }}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-primary/20 hover:bg-gray-100 px-4 py-2  transition"
            >
              <img src="/petopia/google-icon.png" alt="Google" width="18" height="18" />
              <span className="font-medium">Google</span>
            </button>

            <FacebookLogin
              appId={facbook_id}
              autoLoad={false}
              fields="name,email,picture"
              onSuccess={() => handleSuccess('Facebook flow started')}
              onFail={(err) => handleError(err)}
              onProfileSuccess={(profile) => handleFacebookProfile(profile)}
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); renderProps.onClick(); }}
                  disabled={isSubmitting || renderProps.isDisabled}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-primary/20 px-4 py-2 hover:bg-gray-100 transition"
            >
                  <img src="/petopia/facebook-icon.png" alt="Facebook" width="18" height="18" />
                  <span className="font-medium">Facebook</span>
                </button>
              )}
            />
          </div>

          {/* Toggle (kept at bottom like your last layout) */}
          <div className="flex justify-center mb-6">
            <FlipAuthToggle
              mode={mode}
              onToggle={() => setMode(mode === 'login' ? 'signup' : 'login')}
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
