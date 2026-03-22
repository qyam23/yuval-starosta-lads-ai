import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { generateIndustrialImage } from "../services/imageService";
import { Search, Image as ImageIcon, Loader2, History, Clock } from "lucide-react";
import { useAuth } from "../context/FirebaseContext";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function IndustrialAI() {
  const { user, signIn } = useAuth();
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, "ai_history"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "ai_history");
    });

    return () => unsubscribe();
  }, [user]);

  const saveToHistory = async (q: string, res: string, img: string | null) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "ai_history"), {
        userId: user.uid,
        query: q,
        response: res,
        imageUrl: img,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "ai_history");
    }
  };

  const handleSearch = async () => {
    if (!queryText) return;
    if (!user) {
      signIn();
      return;
    }

    setIsLoading(true);
    setResponse("");
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: queryText,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      const textResponse = result.text || "No response generated.";
      setResponse(textResponse);
      await saveToHistory(queryText, textResponse, null);
    } catch (error) {
      console.error("Search error:", error);
      setResponse("Error connecting to Industrial Intelligence network.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!queryText) return;
    if (!user) {
      signIn();
      return;
    }

    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
      const img = await generateIndustrialImage(queryText);
      setGeneratedImage(img);
      if (img) {
        await saveToHistory(queryText, "Visual concept generated.", img);
      }
    } catch (error) {
      console.error("Image generation error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <section id="ai-lab" className="border-y border-white/8 bg-[#08111d]/86 px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">ER Labs Interface</span>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Industrial Intelligence Interface</h2>
            <p className="mb-10 mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Use the ER Labs layer to interrogate production questions, map process logic, and generate visual concepts for manufacturing environments. The interface is positioned as a working intelligence tool, not a marketing demo.
            </p>

            <div className="glass-card mb-8 rounded-[1.5rem] p-6 sm:p-7">
              {!user && (
                <div className="mb-6 rounded-xl border border-industrial-accent/20 bg-industrial-accent/10 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-industrial-accent">Authentication Required</p>
                  <p className="text-sm text-slate-300">Please sign in to access the Industrial Intelligence network and save your history.</p>
                </div>
              )}

              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Ask about extrusion optimization or factory layout..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-industrial-accent"
                />
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-xl bg-industrial-accent px-6 py-3 font-bold uppercase tracking-wider text-industrial-dark transition-all hover:bg-white disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-industrial-accent py-3 font-bold uppercase tracking-wider text-industrial-accent transition-all hover:bg-industrial-accent hover:text-industrial-dark disabled:opacity-50"
                >
                  {isGeneratingImage ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                  Generate Concept
                </button>
              </div>
            </div>

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 border-l-2 border-industrial-accent bg-white/5 p-6 text-sm leading-relaxed text-slate-300"
              >
                <p className="whitespace-pre-wrap">{response}</p>
              </motion.div>
            )}

            {history.length > 0 && (
              <div className="mt-12">
                <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <History size={14} />
                  <span>Recent Intelligence History</span>
                </div>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="group cursor-pointer border border-white/5 bg-white/2 p-4 transition-all hover:border-industrial-accent/30">
                      <div className="mb-2 flex items-start justify-between">
                        <p className="truncate pr-4 text-sm font-medium text-white transition-colors group-hover:text-industrial-accent">{item.query}</p>
                        <Clock size={12} className="text-slate-600" />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        {item.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center">
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-industrial-accent/10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-35" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,19,0.2),rgba(6,11,19,0.72))]" />
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: "linear-gradient(rgba(212,175,55,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.11) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
            </div>

            {generatedImage ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={generatedImage}
                alt="AI Generated Industrial Concept"
                className="h-full w-full rounded-[1.75rem] object-cover shadow-[0_0_50px_rgba(68,110,169,0.12)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative z-10 max-w-md p-12 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-industrial-accent/20">
                  <Cpu className="text-industrial-accent/40" size={40} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {isGeneratingImage ? "Visualizing Concept..." : "Awaiting Input Parameters"}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Configure a process question, line optimization scenario, or plant concept to generate a working response.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cpu({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}
