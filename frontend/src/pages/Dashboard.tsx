import React, { useEffect, useState } from 'react';
import api from '../api/client';
import OfferCard from '../components/OfferCard';
import RequestsList from '../components/RequestsList';

interface OfferForm {
  title: string;
  description: string;
  durationMinutes: number;
  creditsRate: number;
}

interface User {
  id: number;
  name: string;
  balance: number;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
  refreshUser: (u:User) => void;
}

export default function Dashboard({ user, onLogout, refreshUser }: DashboardProps) {
  const [offers, setOffers] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [form, setForm] = useState<OfferForm>({
    title: '',
    description: '',
    durationMinutes: 60,
    creditsRate: 1,
  });

  const load = async () => {
    const [oRes, rRes] = await Promise.all([api.get('/offers'), api.get('/requests')]);
    setOffers(oRes.data);
    setRequests(rRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/offers', form);
    setForm({ title: '', description: '', durationMinutes: 60, creditsRate: 1 });
    await load();
  };

  const onBook = async (offerId: number) => {
    await api.post(`/offers/${offerId}/book`, {});
    await load();
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>
          Welcome, {user?.name} — balance: {user?.balance ?? '—'}
        </h2>
        <button onClick={onLogout}>Logout</button>
      </header>

      <section style={{ marginTop: 20 }}>
        <h3>Create Offer</h3>
        <form onSubmit={createOffer} style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
          {/* Title */}
          <div>
            <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold' }}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              placeholder="Enter a descriptive title"
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              placeholder="Describe the offer in detail"
              required
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '4px', minHeight: '80px' }}
            />
          </div>

          {/* Duration & Credits */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="durationMinutes" style={{ display: 'block', fontWeight: 'bold' }}>
                Duration (minutes)
              </label>
              <input
                id="durationMinutes"
                type="number"
                value={form.durationMinutes}
                min={1}
                required
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="creditsRate" style={{ display: 'block', fontWeight: 'bold' }}>
                Credits Rate
              </label>
              <input
                id="creditsRate"
                type="number"
                value={form.creditsRate}
                min={0.1}
                step={0.1}
                required
                onChange={(e) => setForm({ ...form, creditsRate: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>
          </div>

          <button type="submit" style={{ padding: '10px 16px', fontWeight: 'bold' }}>
            Create Offer
          </button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Available Offers</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} onBook={() => onBook(o.id)} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Your Requests / Offer Requests</h3>
        <RequestsList requests={requests} reload={load} />
      </section>
    </div>
  );
}
