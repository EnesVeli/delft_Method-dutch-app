'use client';

import { useState } from 'react';

export type VocabWord = {
  _id: string;
  dutchWord: string;
  englishMeaning: string;
  spacedRepetitionInterval: number;
  sourceCefrLevel?: string | null;
  sourceLessonNumber?: number | null;
};

export interface FlashcardProps {
  word: VocabWord;
  onUpdated: () => void;
}

type EditState = {
  dutchWord: string;
  englishMeaning: string;
};

function SpeakButton({ word }: { word: string }) {
  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'nl-NL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  return (
    <button
      onClick={speak}
      title="Play pronunciation"
      className="p-1.5 rounded-lg text-gray-300 hover:text-[#FF9B00] hover:bg-orange-50 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0a9 9 0 01-9-9 9 9 0 019-9m0 18a9 9 0 009-9 9 9 0 00-9-9" /></svg>
    </button>
  );
}

export default function FlashCard({ word, onUpdated }: FlashcardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState<EditState>({ dutchWord: word.dutchWord, englishMeaning: word.englishMeaning });
  const [saving, setSaving] = useState(false);

  const handleCardClick = () => {
    if (isEditing) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.dutchWord);
    utterance.lang = 'nl-NL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaving(true);
    try {
      const res = await fetch('/api/vocab', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: word._id, dutchWord: editState.dutchWord, englishMeaning: editState.englishMeaning })
      });
      if (res.ok) {
        setIsEditing(false);
        onUpdated();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Delete "${word.dutchWord}"?`)) return;
    await fetch('/api/vocab', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: word._id })
    });
    onUpdated();
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all relative group cursor-pointer select-none"
    >
      {/* Level Badge */}
      <div className="absolute top-0 right-0 bg-orange-50 text-[#FF9B00] px-3 py-1 text-xs font-black rounded-bl-xl border-b border-l border-orange-100">
        Level {word.spacedRepetitionInterval}
      </div>

      {/* Source context tag */}
      {word.sourceCefrLevel && (
        <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          From: {word.sourceCefrLevel} Lesson {word.sourceLessonNumber}
        </div>
      )}

      {isEditing ? (
        <div onClick={e => e.stopPropagation()} className="space-y-2 mt-2">
          <input
            type="text"
            value={editState.dutchWord}
            onChange={e => setEditState(s => ({ ...s, dutchWord: e.target.value }))}
            className="w-full px-3 py-1.5 text-lg font-bold border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9B00]"
            autoFocus
          />
          <input
            type="text"
            value={editState.englishMeaning}
            onChange={e => setEditState(s => ({ ...s, englishMeaning: e.target.value }))}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9B00]"
          />
          <div className="flex gap-2 pt-1">
            <button onClick={handleSave} disabled={saving} className="flex-1 py-1.5 bg-[#FF9B00] text-white text-xs font-bold rounded-lg hover:bg-orange-600 disabled:opacity-60 transition-colors">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={e => { e.stopPropagation(); setIsEditing(false); setEditState({ dutchWord: word.dutchWord, englishMeaning: word.englishMeaning }); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mt-2 mb-1">
            <h3 className="text-2xl font-bold text-gray-800 leading-tight">{word.dutchWord}</h3>
            <SpeakButton word={word.dutchWord} />
          </div>
          <p className="text-md text-gray-500 font-medium mb-4">{word.englishMeaning}</p>

          {/* Action buttons — visible on hover */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-gray-50">
            <button
              onClick={e => { e.stopPropagation(); setIsEditing(true); }}
              className="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
