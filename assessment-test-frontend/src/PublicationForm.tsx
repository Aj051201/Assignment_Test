import React, { useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../src/api/auth";
import { API_BASE } from "../src/config";
import { createPublication, updatePublication } from "../src/api/publications";
import { useNavigate, useParams } from "react-router-dom";

export default function PublicationForm() {
  const { id } = useParams<{ id?: string }>();
  const edit = Boolean(id);
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", status: "draft" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (edit) {
      setLoading(true);
      axios.get(`${API_BASE}/publications/${id}`, { headers: authHeader() })
        .then(res => setForm(res.data || form))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit) await updatePublication(Number(id), form);
      else await createPublication(form);
      nav("/");
    } catch (err) {
      alert("Save failed");
    } finally { setSaving(false); }
  };

  return (
    <div className="card">
      <h2>{edit ? "Edit Publication" : "New Publication"}</h2>

      {loading ? <div>Loading...</div> : (
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Short title" required />
          </div>

          <div className="form-row">
            <label>Content</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Write your content..." required />
          </div>

          <div className="form-row">
            <label>Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div style={{display:"flex", gap:10}}>
            <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="btn btn-ghost" type="button" onClick={() => nav("/")}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
