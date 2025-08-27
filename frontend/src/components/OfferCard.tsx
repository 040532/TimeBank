import React from 'react';

export default function OfferCard({ offer, onBook }: { offer: any, onBook: () => void }) {
  return (
    <div style={{
      border: '1px solid #ddd', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div>
        <h4 style={{ margin: 0 }}>{offer.title}</h4>
        <div style={{ fontSize: 13, color: '#444' }}>{offer.description}</div>
        <small>Duration: {offer.durationMinutes} min • Rate: {offer.creditsRate} credits/hr • By: {offer.owner?.name}</small>
      </div>
      <div>
        <button onClick={onBook}>Book</button>
      </div>
    </div>
  );
}
