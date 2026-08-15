import React, { useState } from 'react';
import { 
  Inbox, 
  Mail, 
  Trash2, 
  Reply, 
  Calendar, 
  Search, 
  CheckCircle, 
  Circle,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const MessagesInbox: React.FC = () => {
  const { data, deleteMessage, markMessageRead, showToast } = usePortfolio();
  const [search, setSearch] = useState('');

  const messages = data.messages;

  const filtered = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Inbox className="w-3.5 h-3.5" />
            <span>Live Contact Inbox</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Direct Inquiries & Collaboration Requests ({messages.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Messages submitted via your portfolio contact form arrive here in real time.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filtered.map((msg) => (
          <div
            key={msg._id}
            onClick={() => markMessageRead(msg._id)}
            className={`p-6 rounded-3xl border transition-all duration-200 ${
              msg.isRead
                ? 'bg-slate-900/50 border-white/5'
                : 'bg-slate-900/80 border-purple-500/40 shadow-lg shadow-purple-950/20 ring-1 ring-purple-500/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-purple-400 font-mono">{msg.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply Email</span>
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(msg._id);
                  }}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h5 className="text-xs font-bold text-slate-200">
                Subject: <span className="text-purple-300 font-normal">{msg.subject}</span>
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-light">
                {msg.message}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-2 font-mono">
                <Calendar className="w-3 h-3" />
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-3xl border border-white/10">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm">No inquiries found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
