import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm Kiya, your Help Desk Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Conversation ID remains same during the chat
  const conversationIdRef = useRef(
    `user-${Date.now()}`
  );

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Send message
  const sendMessage = async (voiceText = null) => {
    const message = (voiceText || input).trim();

    if (!message || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const url =
        `http://localhost:8081/api/ai/chat` +
        `?query=${encodeURIComponent(message)}` +
        `&conversationId=${encodeURIComponent(
          conversationIdRef.current
        )}`;

      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the Help Desk server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Voice recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();

    // Change to hi-IN for Hindi voice
    recognition.lang = "en-US";

    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      setInput(transcript);

      const lastResult =
        event.results[event.results.length - 1];

      if (lastResult.isFinal) {
        recognition.stop();

        setTimeout(() => {
          sendMessage(transcript);
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission was denied. Please allow microphone access."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-bold">
            K
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              Kiya
            </h1>

            <p className="text-blue-100 text-sm">
              SubString Technologies • Help Desk Assistant
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            Online
          </div>

        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-800 rounded-bl-md"
                }`}
              >
                {message.text}
              </div>

            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">

              <div className="bg-slate-100 px-5 py-4 rounded-2xl rounded-bl-md flex gap-1.5">

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />

              </div>

            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Voice status */}
        {isListening && (
          <div className="text-center text-sm text-red-500 font-medium pb-2">
            🎤 Listening... Speak now
          </div>
        )}

        {/* Input */}
        <div className="border-t bg-white p-4">

          <div className="flex items-center gap-3">

            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? "Listening..."
                  : "Type or speak your message..."
              }
              disabled={loading}
              className="flex-1 border border-slate-300 rounded-full px-5 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {/* Microphone */}
            <button
              onClick={startListening}
              disabled={loading}
              title="Speak"
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              🎤
            </button>

            {/* Send */}
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Send
            </button>

          </div>

          <p className="text-xs text-slate-400 text-center mt-3">
            Press Enter to send • Use 🎤 to speak
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;