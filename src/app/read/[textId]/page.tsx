'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PronunciationEngine from '@/components/PronunciationEngine';

export default function ReadPage({ params }: { params: Promise<{ textId: string }> }) {
  const { textId } = use(params);
  const router = useRouter();
  const [delftText, setDelftText] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Popover State
  const [popoverIndex, setPopoverIndex] = useState(-1);
  const [translationInput, setTranslationInput] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchText() {
      try {
        const response = await fetch(`/api/texts/${textId}`);
        if (response.ok) {
          const data = await response.json();
          setDelftText(data);
        }
      } catch (error) {
        console.error("Error fetching text:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchText();
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [textId]);

  const handlePlay = () => {
    if (!delftText || !delftText.text) return;
    
    const fullText = delftText.text.join(' ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'nl-NL';
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const textBefore = fullText.substring(0, event.charIndex);
        const wordIndex = textBefore.trim() === '' ? 0 : textBefore.trim().split(/\s+/).length;
        setActiveWordIndex(wordIndex);
      }
    };

    utterance.onend = () => {
      setActiveWordIndex(-1);
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setActiveWordIndex(-1);
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setActiveWordIndex(-1);
  };

  const handleWordClick = (index: number) => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    }
    // Toggle off if already open
    if (popoverIndex === index) {
      setPopoverIndex(-1);
      if (isPlaying) window.speechSynthesis.resume();
      return;
    }
    setPopoverIndex(index);
    setTranslationInput('');
    setSaveStatus('idle');
  };

  const handleFinish = async () => {
    const newStatus = !delftText.isCompleted; // Calculate the opposite of current state
    
    try {
      const response = await fetch(`/api/texts/${delftText._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: newStatus }) // Send the exact state we want
      });
      
      if (response.ok) {
        setDelftText((prev: any) => ({ ...prev, isCompleted: newStatus })); // Update UI to the new state
        router.refresh(); // Update the library progress bar
      } else {
        console.error("Failed to update database.");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleSaveVocab = async (word: string) => {
    if (!translationInput.trim()) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dutchWord: word,
          englishMeaning: translationInput.trim(),
          sourceTextId: textId,
          sourceCefrLevel: delftText?.cefrLevel || null,
          sourceLessonNumber: delftText?.lessonNumber || null,
        })
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => {
          setPopoverIndex(-1);
          if (isPlaying) window.speechSynthesis.resume();
        }, 1200);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading text...</div>;
  if (!delftText) return <div className="min-h-screen flex items-center justify-center text-red-500">Text not found</div>;

  const words = delftText.text.join(' ').split(/\s+/);

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Back to Library */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-[#FF9B00] transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>

        <h1 className="text-4xl font-extrabold text-[#FF9B00] mb-8">{delftText.title}</h1>
        
        <div className="text-2xl leading-[2.5rem] font-medium text-gray-800 space-x-1.5 flex flex-wrap relative">
          {words.map((word: string, index: number) => {
            const isPopoverOpen = popoverIndex === index;
            const cleanWord = word.replace(/[.,!?;:]/g, ''); // Use clean word for saving
            
            return (
              <span key={index} className={`relative inline-block ${isPopoverOpen ? 'z-50' : 'z-10'}`}>
                <span
                  onClick={() => handleWordClick(index)}
                  className={`transition-all duration-100 rounded px-1.5 py-0.5 cursor-pointer ${
                    index === activeWordIndex 
                      ? 'bg-[#FF9B00] text-white shadow-md scale-105' 
                      : 'hover:bg-orange-100 text-gray-700'
                  }`}
                >
                  {word}
                </span>

                {isPopoverOpen && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 z-[100] animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col gap-3">
                      <span className="font-bold text-lg text-gray-800 border-b pb-1">{cleanWord}</span>
                      <input 
                        type="text" 
                        value={translationInput}
                        onChange={e => setTranslationInput(e.target.value)}
                        placeholder="Contextual meaning..."
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#FF9B00] focus:ring-1 focus:ring-[#FF9B00]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveVocab(cleanWord);
                        }}
                      />
                      <button 
                        onClick={() => handleSaveVocab(cleanWord)}
                        disabled={saveStatus === 'saving' || !translationInput.trim()}
                        className="w-full py-2 bg-[#FF9B00] text-white text-sm font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                      >
                        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved! ✓' : 'Save Word'}
                      </button>
                      {saveStatus === 'error' && <span className="text-xs text-red-500 text-center font-semibold mt-1">Failed to save</span>}
                    </div>
                    {/* Popover Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white"></div>
                  </div>
                )}
              </span>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-400 uppercase tracking-wider text-sm mb-3">Translation</h3>
          <p className="text-lg text-gray-600 italic">{delftText.englishTranslation}</p>
        </div>

        {/* Pronunciation Practice Section */}
        <PronunciationEngine targetText={delftText.text} />

        {/* Mark as Finished */}
        <div className="mt-8">
          <button
            onClick={handleFinish}
            className={`w-full py-5 rounded-2xl font-extrabold text-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 ${
              delftText.isCompleted
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {delftText.isCompleted ? (
              <>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                Finished!
              </>
            ) : (
              <>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Mark as Finished
              </>
            )}
          </button>
        </div>

        {/* Previous / Next Lesson Navigation */}
        {(delftText.prevLesson || delftText.nextLesson) && (
          <div className="flex justify-between items-center pt-6 pb-10 border-t border-gray-100 gap-4">
            {delftText.prevLesson ? (
              <Link
                href={`/read/${delftText.prevLesson._id}`}
                className="flex items-center gap-2 group flex-1"
              >
                <div className="flex items-center gap-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl px-4 py-3 transition-all w-full">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FF9B00] group-hover:-translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide group-hover:text-[#FF9B00] transition-colors">← Vorige Les</div>
                    <div className="text-sm font-bold text-gray-700 truncate">{delftText.prevLesson.title}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {delftText.nextLesson ? (
              <Link
                href={`/read/${delftText.nextLesson._id}`}
                className="flex items-center gap-2 group flex-1"
              >
                <div className="flex items-center gap-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl px-4 py-3 transition-all w-full justify-end text-right">
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide group-hover:text-[#FF9B00] transition-colors">Volgende Les →</div>
                    <div className="text-sm font-bold text-gray-700 truncate">{delftText.nextLesson.title}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FF9B00] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="flex gap-4 w-full max-w-md justify-center">
          {!isPlaying ? (
            <button onClick={handlePlay} className="flex-1 py-3 bg-[#FF9B00] text-white rounded-full font-bold shadow-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
              Play Audio
            </button>
          ) : (
            <button onClick={handleStop} className="flex-1 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg hover:bg-red-600 hover:-translate-y-0.5 transition-all">
              Stop Audio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
