'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [cefrLevel, setCefrLevel] = useState('A1');
  const [lessonNumber, setLessonNumber] = useState(1);
  const [dutchText, setDutchText] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [newTextId, setNewTextId] = useState<string | null>(null);
  
  const [existingTexts, setExistingTexts] = useState<any[]>([]);

  const fetchTexts = async () => {
    try {
      const res = await fetch('/api/texts');
      if (res.ok) setExistingTexts(await res.json());
    } catch (e) {
      console.error('Error fetching texts', e);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCefrLevel('A1');
    setLessonNumber(1);
    setDutchText('');
    setEnglishTranslation('');
  };

  const handleEditClick = (text: any) => {
    setEditingId(text._id);
    setTitle(text.title);
    setCefrLevel(text.cefrLevel || 'A1');
    setLessonNumber(text.lessonNumber || 1);
    setDutchText(text.text.join('\n\n'));
    setEnglishTranslation(text.englishTranslation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this text? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/texts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id })
      });
      if (res.ok) {
        fetchTexts();
        if (editingId === id) resetForm();
      }
    } catch (e) {
      console.error('Failed to delete', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dutchText || !englishTranslation) return;
    
    setStatus('submitting');
    setErrorMessage('');
    setNewTextId(null);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = { _id: editingId, title, cefrLevel, lessonNumber, dutchText, englishTranslation };
      
      const res = await fetch('/api/texts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setNewTextId(data.text._id);
        resetForm();
        fetchTexts();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to save text');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              {editingId ? 'Edit Existing Text' : 'Add New Text'}
            </h2>
            <p className="text-gray-500 mt-2">Manage the Delft method lessons in your database.</p>
          </div>
          {editingId && (
            <button 
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status === 'success' && newTextId && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Text Successfully Saved!</h3>
            <Link 
              href={`/read/${newTextId}`}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg mt-4"
            >
              Read this text now →
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold">
            Error: {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="cefrLevel" className="block text-sm font-bold text-gray-700 mb-2">CEFR Level</label>
              <select
                id="cefrLevel"
                required
                value={cefrLevel}
                onChange={(e) => setCefrLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF9B00] focus:ring-2 focus:ring-orange-200 transition-colors bg-white"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label htmlFor="lessonNumber" className="block text-sm font-bold text-gray-700 mb-2">Lesson Number</label>
              <input
                id="lessonNumber"
                type="number"
                min="1"
                required
                value={lessonNumber}
                onChange={(e) => setLessonNumber(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF9B00] focus:ring-2 focus:ring-orange-200 transition-colors"
              />
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Lesson Title</label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. At the Supermarket"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF9B00] focus:ring-2 focus:ring-orange-200 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dutchText" className="block text-sm font-bold text-gray-700 mb-2">Dutch Text</label>
            <textarea
              id="dutchText"
              required
              value={dutchText}
              onChange={(e) => setDutchText(e.target.value)}
              rows={8}
              placeholder="Paste the full Dutch text here. Separate paragraphs with an empty line..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF9B00] focus:ring-2 focus:ring-orange-200 transition-colors resize-y leading-relaxed"
            />
          </div>

          <div>
            <label htmlFor="englishTranslation" className="block text-sm font-bold text-gray-700 mb-2">English Translation</label>
            <textarea
              id="englishTranslation"
              required
              value={englishTranslation}
              onChange={(e) => setEnglishTranslation(e.target.value)}
              rows={5}
              placeholder="Provide the complete English translation..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF9B00] focus:ring-2 focus:ring-orange-200 transition-colors resize-y leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 bg-[#FF9B00] text-white text-lg font-extrabold rounded-xl hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:transform-none"
          >
            {status === 'submitting' ? 'Saving to Database...' : (editingId ? 'Update Text' : 'Upload Text')}
          </button>
        </form>

        {/* Existing Texts List */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Existing Texts in Database</h2>
          
          {existingTexts.length === 0 ? (
            <p className="text-gray-500 italic">No texts found. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {existingTexts.map((text) => (
                <div key={text._id} className="bg-white p-5 rounded-2xl border border-gray-200 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-orange-100 text-[#FF9B00] text-xs font-bold px-2 py-1 rounded">
                        {text.cefrLevel || 'A1'}
                      </span>
                      <span className="text-sm font-bold text-gray-400">
                        Lesson {text.lessonNumber || 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{text.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditClick(text)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(text._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
