'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────
// STYLE CONSTANTS — matches AnnonceCampus visual identity (app/page.tsx)
// ─────────────────────────────────────────────────────────────────────────
const MAROON = '#7A0019'
const MAROON_LIGHT = '#fef2f2'
const MAROON_BORDER = '#fecdd3'
const BG = '#f5f6f8'
const TEXT_DARK = '#0f172a'
const TEXT_MUTED = '#64748b'
const TEXT_FAINT = '#94a3b8'
const BORDER = '#f0f2f5'

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif; background: ${BG}; }
  a { text-decoration: none; }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes drawerIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes pulse { 0%,80%,100%{opacity:.25;transform:scale(0.8);} 40%{opacity:1;transform:scale(1);} }
  @keyframes recPulse { 0%{box-shadow:0 0 0 0 rgba(122,0,25,0.28);} 100%{box-shadow:0 0 0 14px rgba(122,0,25,0);} }
  @media(max-width:768px){
    .nav-links { display: none !important; }
    .hamburger { display: flex !important; }
    .main-pad { padding: 32px 20px !important; }
    .hero-title { font-size: 26px !important; }
  }
`

const links = [
  { label: 'Accueil', href: '/' },
  { label: 'Actualités', href: '/category/actualites' },
  { label: 'Stages', href: '/category/stages' },
  { label: 'Logement', href: '/category/logement' },
  { label: 'Job Étudiant', href: '/category/job-etudiant' },
  { label: 'Événements', href: '/category/evenements' },
  { label: 'Préparer mon TIPE', href: '/tipe' },
  { label: 'À propos', href: '/about' },
]

// ─────────────────────────────────────────────────────────────────────────
// Navbar / Drawer — same pattern as homepage, "Préparer mon TIPE" active
// ─────────────────────────────────────────────────────────────────────────
function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #e8eaed', boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none', transition: 'box-shadow 0.3s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <button className="hamburger" onClick={onMenuOpen} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexDirection: 'column', gap: 5, marginRight: 12 }}>
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#1e293b', borderRadius: 2 }} />
        </button>
        <Link href="/"><img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 120, width: 'auto' }} /></Link>
        <div className="nav-links" style={{ display: 'flex', gap: 2 }}>
          {links.map(item => {
            const active = item.href === '/tipe'
            return (
              <Link key={item.href} href={item.href} style={{ color: active ? MAROON : '#374151', fontSize: 14, fontWeight: active ? 700 : 500, padding: '7px 15px', borderRadius: 8, background: active ? MAROON_LIGHT : 'transparent', transition: 'all 0.18s', letterSpacing: '0.01em' }}
                onMouseEnter={e => { e.currentTarget.style.color = MAROON; e.currentTarget.style.background = MAROON_LIGHT }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? MAROON : '#374151'; e.currentTarget.style.background = active ? MAROON_LIGHT : 'transparent' }}>
                {item.label}
              </Link>
            )
          })}
        </div>
        <div style={{ width: 44 }} />
      </div>
    </nav>
  )
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, backdropFilter: 'blur(3px)' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 290, background: 'white', zIndex: 201, animation: 'drawerIn 0.25s ease', boxShadow: '6px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <img src="/logo.jpg" alt="AnnonceCampus" style={{ height: 100, width: 'auto' }} />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 24, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <nav style={{ padding: '12px', flex: 1 }}>
          {links.map(item => (
            <Link key={item.href} href={item.href} onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', color: item.href === '/tipe' ? MAROON : '#1e293b', fontWeight: item.href === '/tipe' ? 700 : 500, fontSize: 15, borderRadius: 10, marginBottom: 2 }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: 'white', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 36px' }}>
        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>© {new Date().getFullYear()} AnnonceCampus · L'info étudiante en temps réel</p>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────
type Screen = 'setup' | 'interview' | 'report'
type PvEntry = { question: string; answer: string }
type ReportItem = { question: string; score: number; points_forts: string; a_ameliorer: string }
type ReportData = { items: ReportItem[]; conseils_generaux: string[] }

const MAX_QUESTIONS = 5
const SCORE_MAX = 20

// ─────────────────────────────────────────────────────────────────────────
// Calls to our own server routes (app/api/tipe/*) — the Gemini key stays
// server-side in GEMINI_API_KEY, never exposed to the visitor's browser.
// ─────────────────────────────────────────────────────────────────────────
async function askJury(presentationText: string, history: { role: string; text: string }[]) {
  const res = await fetch('/api/tipe/interview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ presentationText, history }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erreur du jury')
  return data.reply as string
}

async function generateReport(transcriptText: string) {
  const res = await fetch('/api/tipe/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcriptText }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erreur de correction')
  return data.report as ReportData
}

async function createSubmission(opts: { studentName: string; studentEmail: string; file: File | null }): Promise<string | null> {
  const formData = new FormData()
  formData.append('studentName', opts.studentName)
  formData.append('studentEmail', opts.studentEmail)
  if (opts.file) formData.append('pdf', opts.file)

  try {
    const res = await fetch('/api/tipe/submit', { method: 'POST', body: formData })
    const data = await res.json()
    if (!res.ok) {
      console.error('Sanity create failed:', data.error)
      return null
    }
    return data.id as string
  } catch (e) {
    console.error('Sanity create failed:', e)
    return null
  }
}

async function completeSubmission(submissionId: string | null, transcript: PvEntry[], report: ReportData) {
  if (!submissionId) return
  try {
    const res = await fetch('/api/tipe/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId, transcript, report }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error('Sanity complete failed:', data.error)
    }
  } catch (e) {
    console.error('Sanity complete failed:', e)
  }
}

// ─────────────────────────────────────────────────────────────────────────
// PDF text extraction — client-side via pdf.js (free, no server needed)
// requires: npm install pdfjs-dist
// ─────────────────────────────────────────────────────────────────────────
async function extractPdfText(file: File, onProgress: (pct: number) => void): Promise<string> {
  const pdfjsLib: any = await import('pdfjs-dist/legacy/build/pdf.mjs')
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`

  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((it: any) => it.str).join(' ')
    fullText += pageText + '\n\n'
    onProgress(Math.round((i / pdf.numPages) * 100))
  }
  return fullText
}

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────
export default function TipePage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>('setup')

  // setup
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractProgress, setExtractProgress] = useState(0)
  const [presentationText, setPresentationText] = useState('')
  const [setupError, setSetupError] = useState('')

  // interview
  const [history, setHistory] = useState<{ role: string; text: string }[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [pvLog, setPvLog] = useState<PvEntry[]>([])
  const [liveTranscript, setLiveTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [statusText, setStatusText] = useState('EN ATTENTE')
  const [thinking, setThinking] = useState(false)
  const [micDisabled, setMicDisabled] = useState(true)
  const [speechSupported, setSpeechSupported] = useState(true);

  // report
  const [report, setReport] = useState<ReportData | null>(null)
  const [reportError, setReportError] = useState('')

  const recognizerRef = useRef<any>(null)
  const frenchVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const submissionIdPromiseRef = useRef<Promise<string | null> | null>(null)

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      setSpeechSupported(false)
      return
    }
    const recognizer = new SpeechRecognitionAPI()
    recognizer.lang = 'fr-FR'
    recognizer.continuous = true
    recognizer.interimResults = true
    let finalTranscript = ''
    recognizer.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) finalTranscript += t + ' '
        else interim += t
      }
      setLiveTranscript((finalTranscript + interim).trim())
    }
    recognizer.onstart = () => { finalTranscript = ''; setIsRecording(true) }
    recognizer.onend = () => setIsRecording(false)
    recognizer.onerror = () => setIsRecording(false)
    recognizerRef.current = recognizer

    if ('speechSynthesis' in window) {
      const pick = () => {
        const voices = speechSynthesis.getVoices()
        const frenchVoices = voices.filter(v => v.lang === 'fr-FR' || v.lang.startsWith('fr'))
        // Prefer higher-quality voices (e.g. "Google français") over the
        // default robotic system voice, when the browser offers them.
        frenchVoiceRef.current =
          frenchVoices.find(v => v.name.toLowerCase().includes('google')) ||
          frenchVoices.find(v => v.name.toLowerCase().includes('natural')) ||
          frenchVoices.find(v => v.lang === 'fr-FR') ||
          frenchVoices[0] ||
          null
      }
      speechSynthesis.onvoiceschanged = pick
      pick()
    }
  }, [])

  function speak(text: string, onEnd: () => void) {
    if (!('speechSynthesis' in window)) { onEnd(); return }
    speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'fr-FR'
    if (frenchVoiceRef.current) utter.voice = frenchVoiceRef.current
    utter.rate = 0.98
    utter.onend = onEnd
    utter.onerror = onEnd
    speechSynthesis.speak(utter)
  }

  async function handleFileChange(f: File | null) {
    setFile(f)
    setSetupError('')
    if (!f) return
    setExtracting(true)
    setExtractProgress(0)
    try {
      const text = await extractPdfText(f, setExtractProgress)
      if (text.trim().length < 200) {
        setSetupError("Le PDF semble vide ou illisible (scan image sans texte ?). Essaie un autre fichier.")
        setPresentationText('')
      } else {
        setPresentationText(text)
      }
    } catch (e) {
      console.error('PDF extraction error:', e)
      setSetupError("Impossible de lire ce PDF. Vérifie que le fichier n'est pas corrompu.")
    } finally {
      setExtracting(false)
    }
  }

  async function startInterview() {
    setSetupError('')
    if (!studentEmail.trim()) return setSetupError('Ton email est nécessaire.')
    if (!presentationText) return setSetupError('Dépose ton PDF de présentation TIPE.')

    setScreen('interview')
    setThinking(true)
    setStatusText('LE JURY LIT TA PRÉSENTATION')

    // Save name/email/PDF right away — don't wait for the interview to
    // finish, so we still get the submission even if the student drops off.
    submissionIdPromiseRef.current = createSubmission({ studentName, studentEmail, file })

    const opening = { role: 'user', text: "Commence l'entretien : présente-toi brièvement comme jury (une phrase) puis pose ta première question." }
    try {
      const reply = await askJury(presentationText, [opening])
      const newHistory = [opening, { role: 'assistant', text: reply }]
      setHistory(newHistory)
      setQuestionCount(1)
      askQuestion(reply)
    } catch (e: any) {
      setCurrentQuestion('')
      setSetupError('Erreur de connexion au jury : ' + e.message)
      setScreen('setup')
    }
    setThinking(false)
  }

  function askQuestion(text: string) {
    setCurrentQuestion(text)
    setLiveTranscript('')
    setMicDisabled(true)
    setStatusText('LE JURY PARLE')
    speak(text, () => {
      setStatusText('À TOI DE RÉPONDRE')
      setMicDisabled(false)
    })
  }

  function toggleMic() {
    if (!recognizerRef.current) return
    if (isRecording) recognizerRef.current.stop()
    else recognizerRef.current.start()
  }

  async function submitAnswer(answerOverride?: string) {
    const answer = (answerOverride ?? liveTranscript).trim()
    if (!answer) return
    if (isRecording && recognizerRef.current) recognizerRef.current.stop()

    const entry = { question: currentQuestion, answer }
    setPvLog(prev => [...prev, entry])
    setMicDisabled(true)
    setStatusText('LE JURY RÉFLÉCHIT')
    setThinking(true)

    const newHistory = [...history, { role: 'user', text: answer }]
    setHistory(newHistory)

    if (questionCount >= MAX_QUESTIONS) {
      setThinking(false)
      await finishInterview(newHistory, [...pvLog, entry])
      return
    }

    try {
      const reply = await askJury(presentationText, newHistory)
      const updated = [...newHistory, { role: 'assistant', text: reply }]
      setHistory(updated)
      setQuestionCount(c => c + 1)
      askQuestion(reply)
    } catch (e: any) {
      setCurrentQuestion("Erreur de connexion. Tu peux terminer l'entretien pour voir ta correction.")
    }
    setThinking(false)
  }

  async function finishInterview(finalHistory?: { role: string; text: string }[], finalLog?: PvEntry[]) {
    speechSynthesis.cancel()
    setScreen('report')
    setReportError('')
    setThinking(true)

    const log = finalLog ?? pvLog
    const transcriptText = log.map((t, i) => `Question ${i + 1}: ${t.question}\nRéponse: ${t.answer}`).join('\n\n')

    try {
      const data = await generateReport(transcriptText)
      setReport(data)
      const submissionId = await submissionIdPromiseRef.current
      completeSubmission(submissionId, log, data)
    } catch (e: any) {
      setReportError("Erreur lors de la génération de la correction : " + e.message)
    }
    setThinking(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: BG }}>
      <style>{STYLES}</style>
      <Navbar onMenuOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="main-pad" style={{ maxWidth: 760, margin: '0 auto', padding: '52px 36px 100px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 36 }}>
          <span style={{ display: 'inline-block', background: MAROON_LIGHT, color: MAROON, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 20, marginBottom: 14 }}>
            Préparation TIPE · Gratuit
          </span>
          <h1 className="hero-title" style={{ fontSize: 34, fontWeight: 800, color: TEXT_DARK, lineHeight: 1.15, marginBottom: 10 }}>
            Simulateur de jury TIPE
          </h1>
          <p style={{ color: TEXT_MUTED, fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>
            Dépose ta présentation TIPE complète en PDF. Un jury IA la lit, puis t'interroge à l'oral comme le jour J. Réponds au micro et reçois une correction détaillée à la fin.
          </p>
        </div>

        {/* ── SETUP ── */}
        {screen === 'setup' && (
          <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: `1px solid ${BORDER}`, padding: 28 }}>

            {setupError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecdd3', color: '#991b1b', fontSize: 13, padding: '10px 14px', borderRadius: 8, marginBottom: 18, lineHeight: 1.5 }}>
                {setupError}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={fieldLabel}>Prénom</label>
                <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Ton prénom" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={fieldLabel}>Email</label>
                <input value={studentEmail} onChange={e => setStudentEmail(e.target.value)} placeholder="toi@exemple.com" style={inputStyle} />
              </div>
            </div>

            <label style={{ ...fieldLabel, marginTop: 18 }}>Ta présentation TIPE (PDF, 18-60 pages)</label>
            <div
              onClick={() => document.getElementById('pdf-input')?.click()}
              style={{ border: `2px dashed ${file ? MAROON : '#e2e8f0'}`, borderRadius: 10, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: file ? MAROON_LIGHT : '#fafbfc', transition: 'all 0.2s' }}
            >
              <input id="pdf-input" type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFileChange(e.target.files?.[0] || null)} />
              {extracting ? (
                <div>
                  <div style={{ width: 26, height: 26, border: `2.5px solid ${MAROON}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 10px' }} />
                  <p style={{ color: TEXT_MUTED, fontSize: 13 }}>Lecture du PDF... {extractProgress}%</p>
                </div>
              ) : file ? (
                <p style={{ color: MAROON, fontWeight: 700, fontSize: 14 }}>📄 {file.name} — prêt</p>
              ) : (
                <p style={{ color: TEXT_FAINT, fontSize: 14 }}>Clique pour choisir ton fichier PDF</p>
              )}
            </div>

            <button
              onClick={startInterview}
              disabled={extracting}
              style={{ marginTop: 22, background: MAROON, color: 'white', border: 'none', borderRadius: 8, padding: '13px 24px', fontSize: 14, fontWeight: 700, cursor: extracting ? 'not-allowed' : 'pointer', opacity: extracting ? 0.5 : 1, width: '100%' }}
            >
              Commencer l'entretien
            </button>
          </div>
        )}

        {/* ── INTERVIEW ── */}
        {screen === 'interview' && (
          <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,0.06)', border: `1px solid ${BORDER}`, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: thinking ? '#e2e8f0' : MAROON }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: TEXT_MUTED }}>{statusText}</span>
            </div>

            <div style={{ borderLeft: `3px solid ${MAROON}`, paddingLeft: 16, marginBottom: 22 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: MAROON, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Le jury demande</div>
              <div style={{ fontSize: 18, fontWeight: 600, fontStyle: 'italic', color: TEXT_DARK, lineHeight: 1.45 }}>
                {thinking && !currentQuestion ? 'Le jury réfléchit…' : currentQuestion}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '10px 0 4px' }}>
              {speechSupported ? (
                <>
                  <button
                    onClick={toggleMic}
                    disabled={micDisabled}
                    style={{
                      width: 68, height: 68, borderRadius: '50%', border: `2px solid ${isRecording ? MAROON : '#e2e8f0'}`,
                      background: isRecording ? MAROON : '#fafbfc', color: isRecording ? 'white' : MAROON, fontSize: 24,
                      cursor: micDisabled ? 'not-allowed' : 'pointer', opacity: micDisabled ? 0.4 : 1,
                      animation: isRecording ? 'recPulse 1.4s infinite' : 'none',
                    }}
                  >
                    {isRecording ? '■' : '🎤'}
                  </button>
                  <p style={{ fontSize: 12.5, color: TEXT_FAINT }}>
                    {isRecording ? 'Enregistrement... clique pour arrêter' : micDisabled ? 'Écoute la question...' : 'Clique pour répondre'}
                  </p>
                  <div style={{ background: '#fafbfc', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '12px 14px', fontSize: 14, color: liveTranscript ? TEXT_DARK : TEXT_FAINT, fontStyle: liveTranscript ? 'normal' : 'italic', width: '100%', minHeight: 44 }}>
                    {liveTranscript || 'Ta réponse apparaîtra ici'}
                  </div>
                </>
              ) : (
                <textarea
                  value={liveTranscript}
                  onChange={e => setLiveTranscript(e.target.value)}
                  placeholder="Ton navigateur ne supporte pas la reconnaissance vocale — tape ta réponse ici."
                  style={{ ...inputStyle, minHeight: 90, width: '100%' }}
                />
              )}

              <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 4 }}>
                <button
                  onClick={() => submitAnswer()}
                  disabled={!liveTranscript.trim() || thinking}
                  style={{ flex: 1, background: MAROON, color: 'white', border: 'none', borderRadius: 8, padding: '12px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', opacity: (!liveTranscript.trim() || thinking) ? 0.4 : 1 }}
                >
                  Envoyer la réponse
                </button>
                {questionCount >= MAX_QUESTIONS && (
                  <button
                    onClick={() => finishInterview()}
                    style={{ background: 'transparent', color: MAROON, border: `1px solid ${MAROON_BORDER}`, borderRadius: 8, padding: '12px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Terminer
                  </button>
                )}
              </div>
            </div>

            {pvLog.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_FAINT, marginBottom: 10, borderBottom: `1px solid ${BORDER}`, paddingBottom: 8 }}>
                  Procès-verbal de l'entretien
                </div>
                {pvLog.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontSize: 11, color: TEXT_FAINT, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p style={{ fontSize: 13.5, fontStyle: 'italic', color: TEXT_DARK, marginBottom: 4 }}>"{e.question}"</p>
                      <p style={{ fontSize: 12.5, color: TEXT_MUTED }}>{e.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REPORT ── */}
        {screen === 'report' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: TEXT_DARK, marginBottom: 18 }}>Bilan de ton entretien</h2>

            {thinking && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div style={{ width: 28, height: 28, border: `2.5px solid ${MAROON}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              </div>
            )}

            {reportError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecdd3', color: '#991b1b', fontSize: 13, padding: '12px 16px', borderRadius: 8 }}>{reportError}</div>
            )}

            {report && (
              <>
                {report.items.map((item, i) => (
                  <div key={i} style={{ background: 'white', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px', marginBottom: 12, boxShadow: '0 2px 14px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                      <p style={{ fontSize: 15, fontStyle: 'italic', fontWeight: 600, color: TEXT_DARK, lineHeight: 1.4 }}>"{item.question}"</p>
                      <span style={{ flexShrink: 0, background: MAROON_LIGHT, color: MAROON, fontWeight: 800, fontSize: 12.5, borderRadius: 20, padding: '4px 10px', whiteSpace: 'nowrap' }}>
                        {item.score}/{SCORE_MAX}
                      </span>
                    </div>
                    <p style={{ fontSize: 13.5, color: TEXT_MUTED, marginBottom: 6 }}><b style={{ color: TEXT_DARK }}>Points forts —</b> {item.points_forts}</p>
                    <p style={{ fontSize: 13.5, color: TEXT_MUTED }}><b style={{ color: TEXT_DARK }}>À améliorer —</b> {item.a_ameliorer}</p>
                  </div>
                ))}

                <div style={{ background: MAROON_LIGHT, border: `1px solid ${MAROON_BORDER}`, borderRadius: 12, padding: '20px 22px', marginTop: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: MAROON, marginBottom: 10 }}>Conseils pour le jour J</h3>
                  <ul style={{ paddingLeft: 18, fontSize: 13.5, color: TEXT_DARK, lineHeight: 1.8 }}>
                    {report.conseils_generaux.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

const fieldLabel: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, color: TEXT_MUTED, textTransform: 'uppercase',
  letterSpacing: '0.04em', marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#fafbfc', border: `1px solid #e2e8f0`, borderRadius: 8,
  padding: '11px 14px', fontSize: 14, color: TEXT_DARK,
}

/* ────────────────────────────────────────────────────────────────────────
   NOTES POUR L'INTÉGRATION FINALE :

   1. DÉPENDANCE (déjà faite) : npm install pdfjs-dist

   2. CLÉ API — CÔTÉ SERVEUR MAINTENANT :
      Ajoute dans .env.local (dev) :
        GEMINI_API_KEY=AIza...
      Et dans Vercel → Project Settings → Environment Variables (prod),
      même nom, même valeur. Ne JAMAIS préfixer par NEXT_PUBLIC_ (ça
      l'exposerait au navigateur). Place les deux fichiers de route dans :
        app/api/tipe/interview/route.ts
        app/api/tipe/report/route.ts

   3. SANITY : ce composant ne sauvegarde encore rien dans Sanity. Pour
      persister les soumissions (nom, email, transcript, rapport), créer
      sanity/schemaTypes/tipeSubmissionType.ts et l'enregistrer dans
      sanity/schemaTypes/index.ts, puis écrire depuis les routes API
      ci-dessus via un client Sanity avec token d'écriture (différent du
      client de lecture utilisé pour les articles).

   4. RATE-LIMIT : la clé étant maintenant cachée, le risque n'est plus le
      vol de clé mais l'abus de volume (quelqu'un qui spam le formulaire).
      Une fois Sanity branché (point 3), limiter par email : un entretien
      actif à la fois par email, par exemple.
──────────────────────────────────────────────────────────────────────── */
