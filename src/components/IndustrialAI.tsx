import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { generateIndustrialImage } from "../services/imageService";
import { Search, Image as ImageIcon, Loader2, Send, History, Clock } from "lucide-react";
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
    <section id="ai-lab" className="py-32 px-6 bg-industrial-dark/50 border-y border-industrial-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-industrial-accent uppercase tracking-widest text-sm font-bold mb-4 block">ER Labs</span>
            <h2 className="text-5xl font-bold mb-8 tracking-tighter">Industrial Intelligence Interface</h2>
            <p className="text-slate-400 mb-12 leading-relaxed">
              Access real-time industrial data and generate advanced manufacturing concepts. Our AI-driven intelligence system provides deep insights into process optimization and factory design.
            </p>
            
            <div className="glass-card p-6 rounded-lg mb-8">
              {!user && (
                <div className="mb-6 p-4 bg-industrial-accent/10 border border-industrial-accent/20 rounded-sm">
                  <p className="text-xs text-industrial-accent uppercase tracking-widest font-bold mb-2">Authentication Required</p>
                  <p className="text-sm text-slate-300">Please sign in to access the Industrial Intelligence network and save your history.</p>
                </div>
              )}
              
              <div className="flex gap-4 mb-6">
                <input 
                  type="text" 
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Ask about extrusion optimization or factory layout..."
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-industrial-accent outline-none transition-all"
                />
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-industrial-accent text-industrial-dark px-6 py-3 font-bold uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                </button>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="flex-1 border border-industrial-accent text-industrial-accent py-3 font-bold uppercase tracking-wider hover:bg-industrial-accent hover:text-industrial-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
                className="bg-white/5 p-6 border-l-2 border-industrial-accent text-slate-300 text-sm leading-relaxed mb-8"
              >
                <p className="whitespace-pre-wrap">{response}</p>
              </motion.div>
            )}

            {history.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase tracking-widest text-xs font-bold">
                  <History size={14} />
                  <span>Recent Intelligence History</span>
                </div>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 border border-white/5 bg-white/2 hover:border-industrial-accent/30 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-white group-hover:text-industrial-accent transition-colors truncate pr-4">{item.query}</p>
                        <Clock size={12} className="text-slate-600" />
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                        {item.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="relative flex items-center justify-center min-h-[400px]">
            <div className="absolute inset-0 border border-industrial-accent/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/industrial-network/1200/800')] bg-cover bg-center grayscale" />
            </div>
            
            {generatedImage ? (
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={generatedImage} 
                alt="AI Generated Industrial Concept" 
                className="w-full h-full object-cover rounded-lg shadow-[0_0_50px_rgba(0,229,255,0.1)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 border-2 border-industrial-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Cpu className="text-industrial-accent/40" size={40} />
                </div>
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
                  {isGeneratingImage ? "Visualizing Concept..." : "Awaiting Input Parameters"}
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
