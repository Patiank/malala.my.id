import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const VISITOR_KEY = 'malala_visitor_id';
const SESSION_KEY = 'malala_session_id';
const CONSENT_KEY = 'malala_cookie_consent';

// Generate or retrieve persistent anonymous visitor ID
export function getAnonymousVisitorId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}

// Generate or retrieve current session ID (lives in sessionStorage)
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return 'session_' + Date.now();
  }
}

// Check if user has accepted the cookie consent
export function isCookieConsentAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

// Throttling map to avoid duplicate spam signals
const recentSignals = new Set<string>();

/**
 * Log an anonymous tourism signal for intelligence analysis (Dinas Pariwisata).
 * Fully non-blocking, fail-safe, and privacy-compliant.
 */
export async function logTourismSignal(
  eventType: 'view_destination' | 'save_bookmark' | 'generate_itinerary' | 'view_event' | 'download_pdf' | 'affiliate_click' | 'session_start',
  payload: Record<string, any> = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    // Unique deduplication key for 10 seconds (e.g. rapid multiple clicks)
    const dedupKey = `${eventType}_${payload.targetId || payload.category || payload.duration || ''}`;
    if (recentSignals.has(dedupKey)) return;
    recentSignals.add(dedupKey);
    setTimeout(() => recentSignals.delete(dedupKey), 10000);

    const visitorId = getAnonymousVisitorId();
    const sessionId = getSessionId();

    const signalDoc = {
      visitorId,
      sessionId,
      eventType,
      timestamp: new Date().toISOString(),
      screen: window.innerWidth < 768 ? 'mobile' : 'desktop',
      language: navigator.language || 'id-ID',
      ...payload,
    };

    // Save asynchronously without blocking UI
    addDoc(collection(db, 'tourism_signals'), signalDoc).catch(() => {
      // Silently catch network or permission errors
    });
  } catch {
    // Fail-safe
  }
}
