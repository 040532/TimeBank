import React, { useState } from 'react';
import api from '../api/client';

export default function AuthPage({ onLogin }: { onLogin: (token: string, user: any) => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      if (isRegister) {
        const res = await api.post('/auth/register', form);
        onLogin(res.data.token, res.data.user);
      } else {
        const res = await api.post('/auth/login', { email: form.email, password: form.password });
        onLogin(res.data.token, res.data.user);
      }
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Request failed');
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h1>{isRegister ? 'Register to TimeBank' : 'Login to TimeBank'}</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
        {isRegister && (
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div>
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          <button type="button" onClick={() => setIsRegister((s) => !s)} style={{ marginLeft: 8 }}>
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </div>
        {err && <div style={{ color: 'red' }}>{err}</div>}
      </form>
    </div>
  );
}
