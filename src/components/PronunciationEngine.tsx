'use client';

import { useState, useEffect, useRef } from 'react';

export interface PronunciationEngineProps {
  targetText: string[];
}

export default function PronunciationEngine({ targetText }: PronunciationEngineProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'nl-NL';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          let tempFinal = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              tempFinal += event.results[i][0].transcript;
            } else {
              currentTranscript += event.results[i][0].transcript;
            }
          }
          if (tempFinal) setFinalTranscript(prev => prev + ' ' + tempFinal);
          setTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSpeechStart = () => {
    if (recognitionRef.current && !isListening) {
      setFinalTranscript('');
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSpeechEnd = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const compareTranscripts = () => {
    const targetString = targetText?.[0] || '';
    const currentSpoken = (finalTranscript + ' ' + transcript).trim();
    if (!currentSpoken) return null;

    const referenceWords = targetString.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    const spokenWords = currentSpoken.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/).filter((w: string) => w);

    return (
      <div className="flex flex-wrap gap-1.5 mt-4 p-5 bg-white border-2 border-gray-100 rounded-xl">
        {spokenWords.map((word: string, index: number) => {
          const isCorrect = referenceWords[index] === word;
          return (
            <span key={index} className={`text-xl font-bold transition-colors ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-12 p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
      <h3 className="font-bold text-[#FF9B00] uppercase tracking-wider text-sm mb-4">Practice Pronunciation</h3>
      
      <button
        onMouseDown={handleSpeechStart}
        onMouseUp={handleSpeechEnd}
        onMouseLeave={handleSpeechEnd}
        onTouchStart={handleSpeechStart}
        onTouchEnd={handleSpeechEnd}
        className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-[0.98] ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-[#FF9B00] hover:bg-orange-600'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        {isListening ? 'Listening... Release to Stop' : 'Hold to Speak'}
      </button>

      {compareTranscripts()}
    </div>
  );
}
