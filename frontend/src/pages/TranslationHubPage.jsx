import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SampleDataBadge from '../components/ui/SampleDataBadge';

export default function TranslationHubPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'sign-to-text';

  const [mode, setMode] = useState(initialMode); // 'sign-to-text' | 'speech-to-text' | 'text-to-speech' | 'text-to-sign'
  const [outputTab, setOutputTab] = useState('text'); // 'text' | 'speech'
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [transcription, setTranscription] = useState('Hello, how are you?');
  const [isPlayingSign, setIsPlayingSign] = useState(false);
  const [speechSpeaking, setSpeechSpeaking] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const qMode = searchParams.get('mode');
    if (qMode) {
      setMode(qMode);
    }
  }, [searchParams]);

  // Audio speech synthesis (PRD FR-06)
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = mode.startsWith('text') && inputText.trim() ? inputText : transcription;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-IN';
      utterance.onstart = () => setSpeechSpeaking(true);
      utterance.onend = () => setSpeechSpeaking(false);
      utterance.onerror = () => setSpeechSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate stopping and translating after a short capture
      setTimeout(() => {
        setIsRecording(false);
        setTranscription('Namaste! Welcome to SignAdapt.');
      }, 3000);
    }
  };

  const handlePlaySign = () => {
    setIsPlayingSign(true);
    setTimeout(() => {
      setIsPlayingSign(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTranscription(`Video loaded: ${file.name} (Processing...)`);
      setTimeout(() => {
        setTranscription('Thank you for sharing your sign recording.');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-space-lg w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Translation Hub</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Convert between Text, Speech and ISL</p>
          </div>
          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-full shadow-sm self-start sm:self-auto border border-surface-variant/30">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">AI ISL Engine v2.4 Active</span>
          </div>
        </div>

        {/* Mode Selector Navigation */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-1.5 shadow-sm overflow-x-auto border border-surface-container-high/40">
          <div className="flex items-center gap-1.5 min-w-max" role="tablist">
            <button
              role="tab"
              aria-selected={mode === 'sign-to-text'}
              className={`flex items-center gap-space-sm px-space-lg py-2.5 rounded-lg font-headline-sm text-headline-sm transition-all ${
                mode === 'sign-to-text'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
              type="button"
              onClick={() => setMode('sign-to-text')}
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              <span>Sign to Text</span>
            </button>

            <button
              role="tab"
              aria-selected={mode === 'speech-to-text'}
              className={`flex items-center gap-space-sm px-space-lg py-2.5 rounded-lg font-headline-sm text-headline-sm transition-all ${
                mode === 'speech-to-text'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
              type="button"
              onClick={() => setMode('speech-to-text')}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
              <span>Speech to Text</span>
            </button>

            <button
              role="tab"
              aria-selected={mode === 'text-to-speech'}
              className={`flex items-center gap-space-sm px-space-lg py-2.5 rounded-lg font-headline-sm text-headline-sm transition-all ${
                mode === 'text-to-speech'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
              type="button"
              onClick={() => setMode('text-to-speech')}
            >
              <span className="material-symbols-outlined text-[20px]">text_fields</span>
              <span>Text to Speech</span>
            </button>

            <button
              role="tab"
              aria-selected={mode === 'text-to-sign'}
              className={`flex items-center gap-space-sm px-space-lg py-2.5 rounded-lg font-headline-sm text-headline-sm transition-all ${
                mode === 'text-to-sign'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
              type="button"
              onClick={() => setMode('text-to-sign')}
            >
              <span className="material-symbols-outlined text-[20px]">sign_language</span>
              <span>Text to Sign</span>
            </button>
          </div>
        </div>

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          
          {/* Left Column: Input / Record Card (6 tracks) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-lowest rounded-xl p-space-xl shadow-sm min-h-[460px] relative overflow-hidden group border border-surface-container-high/40">
            {/* Subtle Decorative Accent Radial Gradient */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary-fixed/30 filter blur-3xl pointer-events-none"></div>

            {/* Center Interactive Area based on Mode */}
            <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-space-xl relative z-10 w-full">
              {mode === 'sign-to-text' && (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary-container shadow-sm mb-space-lg transition-transform duration-300 group-hover:scale-105">
                    <span className="material-symbols-outlined text-[42px]">photo_camera</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-bold">Record or Upload ISL Video</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-xl">
                    Position your hands within the camera frame or select a pre-recorded sign session
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-space-md w-full">
                    <button
                      className={`flex items-center gap-space-sm font-headline-sm text-headline-sm px-space-lg py-3 rounded-lg shadow-md transition-all active:scale-95 ${
                        isRecording
                          ? 'bg-error hover:bg-error/90 text-on-error animate-pulse'
                          : 'bg-primary-container hover:bg-primary text-on-primary'
                      }`}
                      type="button"
                      onClick={toggleRecording}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isRecording ? 'stop_circle' : 'radio_button_checked'}
                      </span>
                      <span>{isRecording ? 'Stop & Translate' : 'Start Recording'}</span>
                    </button>

                    <button
                      className="flex items-center gap-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface font-headline-sm text-headline-sm px-space-lg py-3 rounded-lg shadow-sm transition-all active:scale-95"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">cloud_upload</span>
                      <span>Upload Video</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/quicktime,video/x-msvideo"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </>
              )}

              {mode === 'speech-to-text' && (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-low flex items-center justify-center text-[#059669] shadow-sm mb-space-lg transition-transform duration-300 group-hover:scale-105">
                    <span className="material-symbols-outlined text-[42px]">mic</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs font-bold">Speak or Upload Audio</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-space-xl">
                    Provide microphone voice input to transcribe spoken English or Hindi into ISL
                  </p>
                  <button
                    className={`flex items-center gap-space-sm font-headline-sm text-headline-sm px-space-lg py-3 rounded-lg shadow-md transition-all active:scale-95 ${
                      isRecording ? 'bg-error text-white' : 'bg-primary-container text-on-primary hover:bg-primary'
                    }`}
                    type="button"
                    onClick={toggleRecording}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isRecording ? 'mic_off' : 'mic'}
                    </span>
                    <span>{isRecording ? 'Listening... Click to Stop' : 'Start Listening'}</span>
                  </button>
                </>
              )}

              {(mode === 'text-to-speech' || mode === 'text-to-sign') && (
                <div className="w-full text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
                    <label htmlFor="textInput" className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Enter Input Text (PRD FR-01)
                    </label>
                  </div>
                  <textarea
                    id="textInput"
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type words, phrases or sentences to translate into speech and sign animations..."
                    className="w-full p-space-md rounded-xl border border-surface-container-high bg-surface text-on-surface text-body-md outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (inputText.trim()) {
                          setTranscription(inputText.trim());
                          if (mode === 'text-to-speech') handleSpeak();
                        }
                      }}
                      className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm shadow-sm transition-all"
                    >
                      {mode === 'text-to-speech' ? 'Synthesize Speech' : 'Generate Signs'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Helper / Meta Info */}
            <div className="pt-space-md text-center border-none relative z-10">
              <span className="font-label-sm text-label-sm text-outline tracking-wide uppercase font-semibold">
                Supported formats: MP4, MOV, AVI • Real-time frame processing
              </span>
            </div>
          </div>

          {/* Right Column: Output Card (6 tracks) */}
          <div className="lg:col-span-6 flex flex-col bg-surface-container-lowest rounded-xl p-space-xl shadow-sm min-h-[460px] justify-between border border-surface-container-high/40">
            <div>
              {/* Card Header & Output Mode Tabs */}
              <div className="flex items-center justify-between pb-space-md">
                <div className="flex items-center gap-space-sm">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Output</h2>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-semibold">
                    Realtime
                  </span>
                  <SampleDataBadge label="PRD FR-05" />
                </div>
                {/* Output Format Switcher */}
                <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-headline-sm text-headline-sm transition-all ${
                      outputTab === 'text'
                        ? 'bg-surface-container-lowest text-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                    onClick={() => setOutputTab('text')}
                  >
                    <span className="material-symbols-outlined text-[16px]">subject</span>
                    <span>Text</span>
                  </button>
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-headline-sm text-headline-sm transition-all ${
                      outputTab === 'speech'
                        ? 'bg-surface-container-lowest text-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                    onClick={() => {
                      setOutputTab('speech');
                      handleSpeak();
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Speech</span>
                  </button>
                </div>
              </div>

              {/* Output Transcription Dialogue Banner */}
              <div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between shadow-sm mb-space-lg transition-colors border border-surface-container-high/30">
                <div className="flex items-center gap-space-md min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[18px]">translate</span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                    {transcription}
                  </p>
                </div>
                <button
                  className={`w-9 h-9 rounded-lg bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary text-primary flex items-center justify-center transition-all shadow-sm shrink-0 ${
                    speechSpeaking ? 'scale-110 bg-primary-container text-on-primary' : ''
                  }`}
                  type="button"
                  onClick={handleSpeak}
                  title="Pronounce output via Speech Synthesis"
                  aria-label="Pronounce output"
                >
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
            </div>

            {/* ISL Sign Demonstration Preview Area */}
            <div className="flex-1 flex flex-col justify-end bg-surface-container rounded-xl overflow-hidden relative shadow-sm min-h-[260px] border border-surface-container-high/30">
              <div className="relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105 select-none"
                  alt="Young Indian woman demonstrating ISL"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkcFWWmPS0Jh2kZG8eaYLCCbY7q2pi1wIGES34OyfWDYsG2-ws25CxAAxOmASqNomV1sd1v7z12kn7zNL2o277ZXq0TaeMYTZW6ePwYBQtuLrp-KUmSbiZ9qnjZ3Q9ragBGOMVWlLi84hpeXflSJIXvMEr_Ea8Wgagbv8Y0TUcfEJX72BDPM172NqschJ9paZ-M5bhRpiELFGyRes_DNliYq94htiZYPR73sng_s"
                />
                {/* Video Floating Status Pill */}
                <div className="absolute top-3 left-3 bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="font-label-sm text-label-sm font-semibold tracking-wide">ISL Avatar Feed</span>
                </div>
                {/* Sign Timing Indicator Pill */}
                <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-sm">
                  00:03 / 00:05
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-space-md bg-surface-container-lowest flex items-center justify-between border-t border-surface-container-high/40">
                <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px] text-secondary">speed</span>
                  <span>1.0x Normal Speed</span>
                </div>
                <button
                  className="flex items-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm px-space-lg py-2 rounded-lg shadow-sm transition-all active:scale-95"
                  type="button"
                  onClick={handlePlaySign}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPlayingSign ? 'replay' : 'play_arrow'}
                  </span>
                  <span>{isPlayingSign ? 'Replaying...' : 'Play Sign'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Assistive Guidance Strip */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container-high/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">lightbulb</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Lighting Tip</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Keep foreground hands brightly lit with high contrast backdrop.</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container-high/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dialect Support</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Recognizes Northern &amp; Southern Indian Sign Language variations.</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-surface-container-high/30">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[22px]">download_done</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">Offline Cached</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Top 400 essential daily gestures ready without connectivity.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

