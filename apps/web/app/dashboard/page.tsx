"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LucideShieldCheck, 
  LucidePlus, 
  LucideGlobe, 
  LucideLogOut, 
  LucideLoader2,
  LucideExternalLink,
  LucideCheckCircle2,
  LucideAlertCircle
} from "lucide-react";
import axios from "axios";

interface Website {
  id: string;
  url: string;
  status?: string;
}

export default function DashboardPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/get-websites", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWebsites(response.data.websites);
    } catch (err: any) {
      setError("Failed to fetch websites");
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/add-website", 
        { url: newUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUrl("");
      fetchWebsites();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add website");
    } finally {
      setAdding(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LucideLoader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      <nav className="border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <LucideShieldCheck className="h-6 w-6 text-primary" />
            <span>Better Uptime</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            <LucideLogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8">
          {/* Header & Add Form */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your monitored infrastructure.</p>
            </div>
            
            <form onSubmit={handleAddWebsite} className="flex w-full max-w-md items-center gap-2">
              <div className="relative flex-1">
                <LucideGlobe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://example.com"
                  required
                  className="flex h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={adding}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {adding ? <LucideLoader2 className="h-4 w-4 animate-spin" /> : <LucidePlus className="h-4 w-4" />}
                Add Website
              </button>
            </form>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-2xl bg-destructive/10 p-4 text-sm font-medium text-destructive">
              <LucideAlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* Websites Table/Grid */}
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
            {websites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                  <LucideGlobe className="h-8 w-8 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-lg font-bold">No websites monitored yet</h3>
                <p className="text-muted-foreground mt-1">Add your first website above to start monitoring.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-zinc-50/50 dark:bg-zinc-900/50">
                      <th className="px-6 py-4 font-bold">Website</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {websites.map((website) => (
                      <tr key={website.id} className="group transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                              <LucideGlobe className="h-4 w-4 opacity-40" />
                            </div>
                            <span className="font-medium">{website.url}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                            <LucideCheckCircle2 className="h-4 w-4" />
                            Active
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a 
                            href={website.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 opacity-60 hover:opacity-100 hover:bg-zinc-200 transition-all dark:bg-zinc-800 dark:hover:bg-zinc-700"
                          >
                            <LucideExternalLink className="h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
