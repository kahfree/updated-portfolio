"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface Show {
  id: number;
  name: string;
  image: string | null;
  totalEpisodes: number;
  watchedEpisodes: number;
  addedAt: number;
}

interface StoredData { active: Show[]; archived: Show[] }
interface TVMazeShow { id: number; name: string; image: { medium: string } | null }
interface TVMazeResult { show: TVMazeShow }

const KEY = "tv-backlog-v1";
const empty: StoredData = { active: [], archived: [] };
const load = (): StoredData => { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : empty; } catch { return empty; } };
const save = (d: StoredData) => localStorage.setItem(KEY, JSON.stringify(d));

export default function BacklogPage() {
  const [data, setData] = useState<StoredData>(empty);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TVMazeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [justCompleted, setJustCompleted] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const episodeInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setData(load()); setHydrated(true); }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node))
        setResults([]);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearching(false); return; }
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setSearching(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const json: TVMazeResult[] = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`).then(r => r.json());
        setResults(json.slice(0, 7));
      } catch { setResults([]); }
      finally { setSearching(false); }
    }, 280);
  }, [query]);

  const isAdded = (id: number) => data.active.some(s => s.id === id) || data.archived.some(s => s.id === id);

  async function addShow(show: TVMazeShow) {
    if (isAdded(show.id)) return;
    setAdding(show.id);
    try {
      const eps: unknown[] = await fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`).then(r => r.json());
      const next: StoredData = { ...data, active: [{ id: show.id, name: show.name, image: show.image?.medium ?? null, totalEpisodes: Array.isArray(eps) ? eps.length : 0, watchedEpisodes: 0, addedAt: Date.now() }, ...data.active] };
      setData(next); save(next); setQuery(""); setResults([]);
    } finally { setAdding(null); }
  }

  function updateWatched(id: number, delta: number) {
    const updated = data.active.map(s => s.id !== id ? s : { ...s, watchedEpisodes: Math.max(0, Math.min(s.totalEpisodes, s.watchedEpisodes + delta)) });
    const done = updated.filter(s => s.totalEpisodes > 0 && s.watchedEpisodes >= s.totalEpisodes);
    if (done.length) { setJustCompleted(done[0].id); setTimeout(() => setJustCompleted(null), 2000); }
    const next: StoredData = { active: updated.filter(s => !(s.totalEpisodes > 0 && s.watchedEpisodes >= s.totalEpisodes)), archived: [...done, ...data.archived] };
    setData(next); save(next);
  }

  function startEdit(show: Show) {
    setEditingId(show.id); setEditValue(String(show.watchedEpisodes));
    setTimeout(() => episodeInputRef.current?.select(), 0);
  }

  function commitEdit(id: number) {
    const n = parseInt(editValue, 10);
    const show = data.active.find(s => s.id === id);
    if (!isNaN(n) && show) updateWatched(id, Math.max(0, Math.min(show.totalEpisodes, n)) - show.watchedEpisodes);
    setEditingId(null); setEditValue("");
  }

  function remove(id: number, list: "active" | "archived") {
    const next = { ...data, [list]: data[list].filter(s => s.id !== id) };
    setData(next); save(next);
  }

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-zinc-800/60 backdrop-blur-md bg-zinc-950/70 sticky top-0">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm flex items-center gap-1.5 group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>caffrey.dev</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">📺</span>
            <h1 className="text-lg font-bold tracking-tight"><span className="text-emerald-400">TV</span> Backlog</h1>
          </div>
          <div className="text-xs text-zinc-600">{data.active.length} show{data.active.length !== 1 ? "s" : ""}</div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {/* Search */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for a TV show..."
              className="w-full bg-zinc-900/90 border border-zinc-700/50 rounded-2xl pl-11 pr-12 py-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all backdrop-blur-sm" />
            {searching && <div className="absolute right-4 top-1/2 -translate-y-1/2"><div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" /></div>}
          </div>
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div ref={dropdownRef} initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700/50 rounded-2xl overflow-hidden z-50 shadow-2xl shadow-black/60">
                {results.map(({ show }) => {
                  const added = isAdded(show.id), isLoading = adding === show.id;
                  return (
                    <button key={show.id} disabled={added || isLoading} onClick={() => addShow(show)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/70 transition-colors text-left disabled:cursor-not-allowed border-b border-zinc-800/40 last:border-0">
                      <div className="w-9 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {show.image?.medium ? <img src={show.image.medium} alt={show.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">?</div>}
                      </div>
                      <span className={`font-medium flex-1 truncate ${added ? "text-zinc-600" : "text-zinc-200"}`}>{show.name}</span>
                      <span className="text-xs flex-shrink-0">
                        {added ? <span className="text-zinc-600">Added</span> : isLoading ? <span className="text-emerald-400">Loading...</span> : <span className="text-emerald-500">+ Add</span>}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {data.active.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 text-zinc-600">
            <div className="text-7xl mb-5 select-none">📺</div>
            <p className="text-zinc-500 text-lg font-medium mb-1">Nothing in your backlog</p>
            <p className="text-zinc-600 text-sm">Search above to add a show</p>
          </motion.div>
        )}

        {/* Show grid */}
        {data.active.length > 0 && (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {data.active.map(show => {
                const pct = show.totalEpisodes > 0 ? Math.round((show.watchedEpisodes / show.totalEpisodes) * 100) : 0;
                return (
                  <motion.div key={show.id} layout initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1, ...(justCompleted === show.id && { scale: [1, 1.04, 1] }) }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", damping: 22, stiffness: 300 }}
                    className="group relative bg-zinc-900/80 border border-zinc-800/60 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-zinc-700/60 transition-colors">
                    <div className="relative aspect-[2/3] bg-zinc-800 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {show.image ? <img src={show.image} alt={show.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-zinc-600"><span className="text-4xl">📺</span></div>}
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-800/80">
                        <motion.div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ type: "spring", damping: 25, stiffness: 200 }} />
                      </div>
                      <button onClick={() => remove(show.id, "active")} className="absolute top-2 right-2 w-6 h-6 bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-all opacity-0 group-hover:opacity-100 text-sm leading-none" aria-label="Remove show">×</button>
                      {pct > 0 && <div className="absolute top-2 left-2 bg-zinc-900/80 backdrop-blur-sm text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">{pct}%</div>}
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-zinc-100 text-sm truncate mb-2" title={show.name}>{show.name}</p>
                      {editingId === show.id ? (
                        <div className="flex items-center gap-1 mb-2.5">
                          <input ref={episodeInputRef} type="number" value={editValue} min={0} max={show.totalEpisodes}
                            onChange={e => setEditValue(e.target.value)} onBlur={() => commitEdit(show.id)}
                            onKeyDown={e => { if (e.key === "Enter") commitEdit(show.id); if (e.key === "Escape") setEditingId(null); }}
                            className="w-12 bg-zinc-800 border border-emerald-500/50 rounded-md px-1.5 py-0.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-400 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                          <span className="text-xs text-zinc-600">/ {show.totalEpisodes} ep</span>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(show)} className="text-xs text-zinc-600 mb-2.5 hover:text-emerald-400 transition-colors cursor-pointer block text-left" title="Click to set episode count">
                          {show.watchedEpisodes} / {show.totalEpisodes} episodes
                        </button>
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateWatched(show.id, -1)} disabled={show.watchedEpisodes === 0} className="flex-1 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-lg font-bold flex items-center justify-center" aria-label="Remove episode">−</button>
                        <button onClick={() => updateWatched(show.id, 1)} disabled={show.watchedEpisodes >= show.totalEpisodes} className="flex-1 h-8 rounded-xl bg-zinc-800 hover:bg-emerald-900/60 text-zinc-400 hover:text-emerald-300 border border-transparent hover:border-emerald-800/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-lg font-bold flex items-center justify-center" aria-label="Add episode">+</button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Archive */}
        {data.archived.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-1">
              <div className="h-px flex-1 bg-zinc-800/60" />
              <button onClick={() => setShowArchive(v => !v)} className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors">
                <span className="text-sm font-medium">Archive ({data.archived.length})</span>
                <motion.span animate={{ rotate: showArchive ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-xs">▼</motion.span>
              </button>
              <div className="h-px flex-1 bg-zinc-800/60" />
            </div>
            <AnimatePresence>
              {showArchive && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-6">
                    {data.archived.map(show => (
                      <motion.div key={show.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative">
                        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {show.image ? <img src={show.image} alt={show.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300" /> : <div className="w-full h-full flex items-center justify-center text-zinc-700 text-2xl">📺</div>}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-emerald-500/90 rounded-full flex items-center justify-center shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                          </div>
                          <button onClick={() => remove(show.id, "archived")} className="absolute top-1.5 right-1.5 w-5 h-5 bg-zinc-900/80 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 text-xs" aria-label="Remove from archive">×</button>
                        </div>
                        <p className="text-xs text-zinc-600 mt-1.5 truncate text-center px-0.5">{show.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
