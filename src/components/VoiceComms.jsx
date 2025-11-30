import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff } from 'lucide-react';

const VoiceComms = ({ onInput }) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = 'en-US';

            rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onInput(transcript);
                setIsListening(false);
            };

            rec.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            rec.onend = () => {
                setIsListening(false);
            };

            setRecognition(rec);
            setSupported(true);
        }
    }, [onInput]);

    const toggleListening = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    if (!supported) return null;

    return (
        <button
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors ${isListening
                    ? 'bg-red-500/20 text-red-500 animate-pulse'
                    : 'text-slate-500 hover:text-cyan-500'
                }`}
            title="Voice Comms"
        >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
    );
};

VoiceComms.propTypes = {
    onInput: PropTypes.func.isRequired
};

export default VoiceComms;
