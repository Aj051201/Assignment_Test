import React, { useEffect, useState } from "react";
import { fetchPublications, deletePublication } from "../src/api/publications";
import { useNavigate } from "react-router-dom";

export default function PublicationsList() {
  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchPublications()
      .then((res) => setPubs(res.data || []))
      .catch(() => setPubs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>My Publications</h2>
      {pubs.length === 0 ? (
        <div className="empty-note">No publications yet — create your first one.</div>
      ) : (
        <div className="pub-list" style={{marginTop:12}}>
          {pubs.map((p: any) => (
            <div key={p.id} className="pub-item">
              <div className="pub-title">{p.title}</div>
              <div className="pub-meta">Status: {p.status} • {new Date(p.created_at || p.createdAt || Date.now()).toLocaleString()}</div>
              <div style={{flex:1}}>
                <p style={{margin:0,color:"#111827"}}>{(p.content || "").slice(0,160)}{(p.content||"").length>160?"…":""}</p>
              </div>
              <div className="pub-actions">
                <button className="btn btn-ghost" onClick={() => nav(`/publications/${p.id}/edit`)}>Edit</button>
                <button className="btn btn-danger" onClick={() => {
                  if (!confirm("Delete this publication?")) return;
                  deletePublication(p.id).then(() => setPubs(prev => prev.filter(x => x.id !== p.id)));
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
