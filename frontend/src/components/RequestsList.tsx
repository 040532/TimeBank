import React from 'react';
import api from '../api/client';

export default function RequestsList({ requests, reload }: any) {
  const accept = async (id: number) => {
    await api.post(`/requests/${id}/accept`);
    await reload();
  };
  const complete = async (id: number) => {
    await api.post(`/requests/${id}/complete`);
    await reload();
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {requests.map((r: any) => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 10, borderRadius: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{r.offer.title}</strong> — requested by {r.requester.name}
              <div style={{ fontSize: 12, color: '#666' }}>Status: {r.status}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {r.status === 'pending' && r.offer.ownerId === (r.offer.owner?.id) && (
                <button onClick={() => accept(r.id)}>Accept</button>
              )}
              {r.status === 'accepted' && r.offer.ownerId === r.offer.owner?.id && (
                <button onClick={() => complete(r.id)}>Mark Complete</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
