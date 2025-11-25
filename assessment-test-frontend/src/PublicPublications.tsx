import React, { useEffect, useState } from "react";
import { fetchPublicPublished } from "../src/api/publications";

export default function PublicPublications() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicPublished()
      .then(res => setItems(res.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Public Publications</h2>
      {loading ? <div>Loading...</div> : (
        items.length === 0 ? <div className="empty-note">No public publications yet.</div> : (
          <div className="pub-list" style={{marginTop:12}}>
            {items.map(p => (
              <div key={p.id} className="pub-item">
                <div className="pub-title">{p.title}</div>
                <div className="pub-meta">{p.user_name || p.user?.name}</div>
                <p style={{marginTop:8}}>{(p.content||"").slice(0,150)}{(p.content||"").length>150?"…":""}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
