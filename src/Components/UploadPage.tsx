import { useState, useCallback, useRef } from "react";
import {
    IconUpload, IconFileTypePdf, IconDownload, IconTrash,
    IconSparkles, IconCheck, IconX, IconRefresh, IconEye,
} from "@tabler/icons-react";
import { pdfjs } from "react-pdf";

const RESUME_KEY   = "portfolio_resume_b64";
const RESUME_META  = "portfolio_resume_meta";
const DATA_KEY     = "portfolio_data_override";

const getStoredMeta = (): { name: string; size: number; uploadedAt: string } | null => {
    try { return JSON.parse(localStorage.getItem(RESUME_META) || "null"); }
    catch { return null; }
};

const fmtSize = (bytes: number) =>
    bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/* ─────────────────────────────────────── AI PARSE prompt ── */
const PARSE_PROMPT = (text: string) => `You are a resume parser. Extract data from the resume below and return a single JSON object (no markdown, no explanation, just raw JSON) with exactly this structure:

{
  "info": {
    "name": "string",
    "experienceStartDate": "YYYY-MM-DD",
    "stack": ["role title 1", "role title 2", "role title 3"],
    "bio": "2-3 sentence professional summary"
  },
  "experienceInfo": [
    {
      "role": "string",
      "company": "string",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD or null for current role",
      "date": "human-readable e.g. Nov 2024 - Present",
      "points": ["achievement 1", "achievement 2", "...up to 6"],
      "skills": ["tech1", "tech2"]
    }
  ],
  "projectInfo": [
    {
      "title": "string",
      "desc": "one paragraph description",
      "points": ["key point 1", "key point 2", "...up to 5"],
      "image": "keep as-is from: Narriva.png | DigiCampus.png | BookShoppe.png",
      "live": true,
      "technologies": ["tech1"],
      "link": "url or github url",
      "github": "github url"
    }
  ],
  "skillInfo": [
    { "title": "Frontend", "skills": ["..."] },
    { "title": "Backend", "skills": ["..."] },
    { "title": "Databases & Caching", "skills": ["..."] },
    { "title": "Cloud & DevOps", "skills": ["..."] },
    { "title": "AI & Integrations", "skills": ["..."] },
    { "title": "Languages", "skills": ["..."] }
  ]
}

Resume text:
${text}`;

/* ─────────────────────────────────────── Component ──────── */
const UploadPage = () => {
    const [meta, setMeta]               = useState(getStoredMeta);
    const [dragOver, setDragOver]       = useState(false);
    const [uploadMsg, setUploadMsg]     = useState<string | null>(null);
    const [apiKey, setApiKey]           = useState("");
    const [parsing, setParsing]         = useState(false);
    const [parseMsg, setParseMsg]       = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [extracted, setExtracted]     = useState<string | null>(null);
    const [dataExists, setDataExists]   = useState(!!localStorage.getItem(DATA_KEY));
    const fileRef = useRef<HTMLInputElement>(null);

    /* ── Store PDF ── */
    const storeFile = useCallback((file: File) => {
        if (file.type !== "application/pdf") { setUploadMsg("❌  Please upload a PDF."); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            const b64 = e.target?.result as string;
            const newMeta = { name: file.name, size: file.size, uploadedAt: new Date().toISOString() };
            localStorage.setItem(RESUME_KEY, b64);
            localStorage.setItem(RESUME_META, JSON.stringify(newMeta));
            setMeta(newMeta);
            setUploadMsg("✓  Resume saved — visitors will download this file.");
        };
        reader.onerror = () => setUploadMsg("❌  Failed to read file.");
        reader.readAsDataURL(file);
    }, []);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) storeFile(f);
    };

    /* ── Extract PDF text using pdfjs ── */
    const extractText = async (): Promise<string> => {
        const b64 = localStorage.getItem(RESUME_KEY);
        if (!b64) throw new Error("No resume stored.");
        const task = pdfjs.getDocument(b64);
        const pdf  = await task.promise;
        let out    = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page    = await pdf.getPage(i);
            const content = await page.getTextContent();
            out += (content.items as any[]).map((x) => x.str).join(" ") + "\n";
        }
        return out;
    };

    /* ── AI Parse ── */
    const parseWithClaude = async () => {
        if (!apiKey.trim()) { setParseMsg({ type: "err", text: "Paste your Anthropic API key first." }); return; }
        setParsing(true); setParseMsg(null);
        try {
            const text = await extractText();
            setExtracted(text);

            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01",
                    "anthropic-dangerous-direct-browser-access": "true",
                },
                body: JSON.stringify({
                    model: "claude-sonnet-4-6",
                    max_tokens: 4096,
                    messages: [{ role: "user", content: PARSE_PROMPT(text) }],
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error?.message || "API error");

            const raw     = data.content[0].text;
            const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0];
            if (!jsonStr) throw new Error("Could not extract JSON from response.");

            JSON.parse(jsonStr); // validate
            localStorage.setItem(DATA_KEY, jsonStr);
            setDataExists(true);
            setParseMsg({ type: "ok", text: "Portfolio data updated! Reload the home page to see changes." });
        } catch (err: any) {
            setParseMsg({ type: "err", text: err.message || "Parse failed." });
        } finally {
            setParsing(false);
        }
    };

    const clearAll = () => {
        localStorage.removeItem(RESUME_KEY);
        localStorage.removeItem(RESUME_META);
        localStorage.removeItem(DATA_KEY);
        setMeta(null); setUploadMsg(null); setParseMsg(null);
        setDataExists(false); setExtracted(null);
    };

    return (
        <div className="min-h-screen bg-bgColor flex flex-col items-center px-6 py-16 font-sans">
            {/* Header */}
            <div className="w-full max-w-2xl mb-10">
                <div className="flex items-center gap-3 mb-1">
                    <a href="/#/" className="flex items-center justify-center w-9 h-9 group">
                        <svg viewBox="0 0 100 115" fill="none" className="w-9 h-9">
                            <polygon points="50,3 97,28 97,87 50,112 3,87 3,28"
                                stroke="#38BDF8" strokeWidth="4" fill="transparent"
                                className="group-hover:fill-[#38BDF808] transition-all duration-300" />
                        </svg>
                        <span className="absolute text-primaryColor font-bold text-sm font-space">KT</span>
                    </a>
                    <div>
                        <h1 className="text-2xl font-bold font-space text-white">Portfolio Admin</h1>
                        <p className="text-textColor text-xs font-mono">
                            This page is not linked anywhere — keep the URL private.
                        </p>
                    </div>
                </div>
                <div className="mt-4 h-px bg-gradient-to-r from-primaryColor/40 via-accentColor/20 to-transparent" />
            </div>

            <div className="w-full max-w-2xl flex flex-col gap-8">

                {/* ── Section 1: Upload Resume ── */}
                <div className="border border-[#38BDF820] rounded-2xl p-6 bg-gradient-to-br from-cardBg to-bgColor">
                    <h2 className="text-lg font-semibold font-space text-white mb-1">Resume File</h2>
                    <p className="text-textColor text-sm mb-5">
                        Upload your PDF — visitors' "Download Resume" button will serve this file.
                    </p>

                    {/* Drop zone */}
                    <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={onDrop}
                        className={`cursor-pointer border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-all duration-200 ${
                            dragOver
                                ? "border-primaryColor bg-[#38BDF810]"
                                : "border-[#38BDF830] hover:border-primaryColor/60 hover:bg-[#38BDF806]"
                        }`}
                    >
                        <IconUpload size={32} className="text-primaryColor" stroke={1.5} />
                        <div className="text-center">
                            <p className="text-white text-sm font-medium">Drop PDF here or click to browse</p>
                            <p className="text-textColor text-xs mt-0.5">PDF only · max ~5 MB</p>
                        </div>
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) storeFile(f); }}
                    />

                    {/* Status message */}
                    {uploadMsg && (
                        <p className={`mt-3 text-sm font-mono ${uploadMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                            {uploadMsg}
                        </p>
                    )}

                    {/* Stored file info */}
                    {meta && (
                        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-[#38BDF818] bg-[#38BDF806]">
                            <IconFileTypePdf size={28} className="text-primaryColor flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{meta.name}</p>
                                <p className="text-textColor text-xs font-mono">
                                    {fmtSize(meta.size)} · Uploaded {fmtDate(meta.uploadedAt)}
                                </p>
                            </div>
                            <a
                                href={localStorage.getItem(RESUME_KEY) || "#"}
                                download="Kuldeep_CV.pdf"
                                className="p-2 rounded-lg border border-[#38BDF825] text-textColor hover:text-primaryColor hover:border-primaryColor/40 transition-all duration-200"
                                title="Download"
                            >
                                <IconDownload size={16} />
                            </a>
                            <a
                                href={localStorage.getItem(RESUME_KEY) || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg border border-[#38BDF825] text-textColor hover:text-primaryColor hover:border-primaryColor/40 transition-all duration-200"
                                title="Preview"
                            >
                                <IconEye size={16} />
                            </a>
                        </div>
                    )}
                </div>

                {/* ── Section 2: AI Parse ── */}
                <div className="border border-[#38BDF820] rounded-2xl p-6 bg-gradient-to-br from-cardBg to-bgColor">
                    <div className="flex items-start gap-2 mb-1">
                        <IconSparkles size={20} className="text-primaryColor mt-0.5 flex-shrink-0" />
                        <div>
                            <h2 className="text-lg font-semibold font-space text-white">AI Smart Parse</h2>
                            <p className="text-textColor text-sm mt-0.5">
                                Upload a resume above, then paste your Anthropic API key to auto-update
                                your Experience, Projects, Skills, and bio — all from the PDF.
                            </p>
                        </div>
                    </div>

                    {/* Security note */}
                    <div className="mt-4 p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-xs font-mono leading-relaxed">
                        ⚠ Your API key is sent directly to api.anthropic.com. It is <strong>never stored</strong> on
                        this device — it lives only in this input until you close the tab.
                        Use a key scoped to Claude API only.
                    </div>

                    <div className="mt-4 flex gap-2">
                        <input
                            type="password"
                            placeholder="sk-ant-api03-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="flex-1 bg-bgColor border border-[#38BDF820] focus:border-primaryColor/60 focus:shadow-[0_0_0_3px_#38BDF812] rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder-[#475569] outline-none transition-all duration-200"
                        />
                        <button
                            onClick={parseWithClaude}
                            disabled={parsing || !meta}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryColor to-accentColor text-bgColor font-semibold font-space text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_0_#38BDF840] transition-all duration-200"
                        >
                            {parsing ? (
                                <><IconRefresh size={15} className="animate-spin" /> Parsing…</>
                            ) : (
                                <><IconSparkles size={15} /> Parse</>
                            )}
                        </button>
                    </div>

                    {parseMsg && (
                        <div className={`mt-3 flex items-start gap-2 text-sm font-mono ${parseMsg.type === "ok" ? "text-green-400" : "text-red-400"}`}>
                            {parseMsg.type === "ok" ? <IconCheck size={16} className="mt-0.5 flex-shrink-0" /> : <IconX size={16} className="mt-0.5 flex-shrink-0" />}
                            <span>{parseMsg.text}</span>
                        </div>
                    )}

                    {parseMsg?.type === "ok" && (
                        <a
                            href="/#/"
                            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#38BDF830] text-primaryColor text-sm font-medium font-space hover:bg-[#38BDF810] transition-all duration-200"
                        >
                            View portfolio →
                        </a>
                    )}

                    {/* Extracted text preview (collapsible) */}
                    {extracted && (
                        <details className="mt-4">
                            <summary className="text-textColor text-xs font-mono cursor-pointer hover:text-primaryColor transition-colors duration-200">
                                View extracted PDF text ▸
                            </summary>
                            <pre className="mt-2 p-3 rounded-xl bg-bgColor border border-[#38BDF815] text-[11px] text-textColor font-mono leading-relaxed overflow-auto max-h-48 whitespace-pre-wrap">
                                {extracted.slice(0, 2000)}{extracted.length > 2000 ? "\n…(truncated)" : ""}
                            </pre>
                        </details>
                    )}
                </div>

                {/* ── Section 3: Status + Reset ── */}
                <div className="border border-[#38BDF820] rounded-2xl p-6 bg-gradient-to-br from-cardBg to-bgColor">
                    <h2 className="text-lg font-semibold font-space text-white mb-4">Current State</h2>
                    <div className="flex flex-col gap-2">
                        <StatusRow label="Resume file" active={!!meta} value={meta?.name} />
                        <StatusRow label="AI-parsed portfolio data" active={dataExists} value={dataExists ? "stored in localStorage" : undefined} />
                    </div>

                    <button
                        onClick={clearAll}
                        className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-mono hover:bg-red-500/10 hover:border-red-500/60 transition-all duration-200"
                    >
                        <IconTrash size={14} />
                        Clear all — revert to defaults
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusRow = ({ label, active, value }: { label: string; active: boolean; value?: string }) => (
    <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-green-400" : "bg-[#475569]"}`} />
        <span className="text-textColor text-sm font-mono">{label}</span>
        {value && <span className="text-primaryColor text-xs font-mono truncate">{value}</span>}
        {!active && <span className="text-[#475569] text-xs font-mono">not set</span>}
    </div>
);

export default UploadPage;
