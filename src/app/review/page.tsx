'use client';

import { useState, useEffect } from 'react';
import FlashCard, { VocabWord } from '@/components/Flashcard';

export default function ReviewPage() {
  const [words, setWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    try {
      const res = await fetch('/api/vocab');
      if (res.ok) setWords(await res.json());
    } catch (error) {
      console.error("Failed to fetch vocab:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-[#FF9B00] font-semibold text-lg animate-pulse">
      Loading your vocabulary...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">Your Saved Words</h2>
            <p className="text-gray-500 mt-2">
              Click any card to hear it spoken in Dutch. Hover to edit or delete.
            </p>
          </div>
          <div className="bg-orange-100 text-[#FF9B00] px-4 py-2 rounded-lg font-bold">
            Total: {words.length}
          </div>
        </div>

        {words.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <p className="text-gray-500 text-lg">No vocabulary words saved yet!</p>
            <p className="text-gray-400 text-sm mt-2">Go read some texts and tap on words to save them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {words.map((word) => (
              <FlashCard key={word._id} word={word} onUpdated={fetchWords} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
