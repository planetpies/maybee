
import React from 'react';
import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6 relative">
      <img
        src="/bee-cursor.png"
        alt="bee"
        className="pointer-events-none fixed top-4 right-4 w-12 animate-bounce"
      />

      <h1 className="text-3xl md:text-5xl mb-4 text-center">
        Don’t let your trip go unseen. Connect & Drop a Bee.
      </h1>

      <p className="text-center max-w-2xl mb-6">
        Maybee is a global artist map built for creators & curators on the move.
        The foundation of how we connect or collaborate has changed. Come here, drop a Bee.
        <br /><br />
        Whether you're gigging or just travelling through new cities, had plans to be somewhere on
        Holliday already, or just have a few days either side of a work trip – why not connect with
        other creatives.
        <br /><br />
        List your location and availability. Promoters, collaborators, and brands can find you — and you can find them.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 border border-green-400 text-white w-64"
          />
          <button
            type="submit"
            className="bg-green-400 text-black px-5 py-3 rounded hover:bg-green-300 transition"
          >
            interested & early? get notified first when we launch.
          </button>
        </form>
      ) : (
        <p className="mt-4 text-green-300">Thanks! You’re on the list. 🐝</p>
      )}

      <div className="absolute bottom-4 text-xs text-green-700">
        a very real mission in progress · honey bee reports incoming
      </div>
    </div>
  );
}
