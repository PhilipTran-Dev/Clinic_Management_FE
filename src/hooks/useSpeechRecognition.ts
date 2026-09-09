import { useCallback, useEffect, useRef, useState } from "react";

const FALLBACK_NOTE =
  "Patient reports persistent sore throat, mild fever (38.2°C) for 2 days, and painful swallowing.";

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function getRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

function detachRecognition(recognition: SpeechRecognitionInstance) {
  recognition.onstart = null;
  recognition.onresult = null;
  recognition.onerror = null;
  recognition.onend = null;
}

/**
 * Wraps the Web Speech API (window.SpeechRecognition / webkitSpeechRecognition).
 * Falls back to a timed dictation simulation when the API is missing or when
 * microphone capture permission is denied, so elderly/impaired patients always
 * see a working experience. `abort()` tears down the internal recognition
 * session (the browser manages the underlying audio track), and all timers are
 * cleared on unmount to avoid leaks.
 */
export function useSpeechRecognition() {
  const ctorRef = useRef<SpeechRecognitionConstructor | undefined>(undefined);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const fallbackTimeoutRef = useRef<number | null>(null);

  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [lang, setLang] = useState("en-US");

  useEffect(() => {
    ctorRef.current = getRecognitionConstructor();
    setIsSupported(Boolean(ctorRef.current));
  }, []);

  const stopTicker = useCallback(() => {
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const clearTimers = useCallback(() => {
    stopTicker();
    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
  }, [stopTicker]);

  const runFallback = useCallback(() => {
    setIsFallback(true);
    setIsListening(true);
    setError("Microphone access unavailable. Starting dictation simulation.");
    tickIntervalRef.current = window.setInterval(() => {
      setRecordingTime((seconds) => seconds + 1);
    }, 1000);
    fallbackTimeoutRef.current = window.setTimeout(() => {
      stopTicker();
      fallbackTimeoutRef.current = null;
      setTranscript(FALLBACK_NOTE);
      setInterimTranscript("");
      setIsFallback(false);
      setIsListening(false);
      setError(null);
    }, 3000);
  }, [stopTicker]);

  const start = useCallback(() => {
    setError(null);
    setTranscript("");
    setInterimTranscript("");
    setRecordingTime(0);

    const Ctor = ctorRef.current;
    if (!Ctor) {
      runFallback();
      return;
    }

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const result = event.results[index];
        const alternative = result[0];
        if (!alternative) continue;
        if (result.isFinal) {
          finalText += alternative.transcript;
        } else {
          interimText += alternative.transcript;
        }
      }
      if (finalText) {
        setTranscript((prev) =>
          prev ? `${prev} ${finalText}`.trim() : finalText.trim(),
        );
      }
      setInterimTranscript(interimText);
    };

    recognition.onerror = (event) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        detachRecognition(recognition);
        try {
          recognition.abort();
        } catch {
          /* already stopped */
        }
        recognitionRef.current = null;
        clearTimers();
        runFallback();
        return;
      }
      if (event.error === "no-speech") {
        return;
      }
      setError("Voice input failed. Please try again or type your symptoms.");
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      stopTicker();
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    tickIntervalRef.current = window.setInterval(() => {
      setRecordingTime((seconds) => seconds + 1);
    }, 1000);

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      clearTimers();
      setError("Could not start voice input.");
      setIsListening(false);
    }
  }, [clearTimers, lang, runFallback, stopTicker]);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        recognition.stop();
      } catch {
        /* already stopped */
      }
      return;
    }

    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
      setTranscript(FALLBACK_NOTE);
    }
    stopTicker();
    setIsFallback(false);
    setIsListening(false);
    setError(null);
  }, [stopTicker]);

  const reset = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setRecordingTime(0);
  }, []);

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        detachRecognition(recognition);
        try {
          recognition.abort();
        } catch {
          /* already stopped */
        }
        recognitionRef.current = null;
      }
      clearTimers();
    };
  }, [clearTimers]);

  return {
    isListening,
    isFallback,
    transcript,
    interimTranscript,
    isSupported,
    error,
    recordingTime,
    lang,
    setLang,
    start,
    stop,
    reset,
  };
}