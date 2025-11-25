import React, { useState } from "react";
import { signup, saveToken } from "../src/api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signup({...form, password_confirmation: form.password});
      saveToken(res.data.token);
      nav("/");
    } catch (err:any) {
      alert(err?.response?.data?.errors?.[0] || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="card" style={{maxWidth:520, margin:"10px auto"}}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" disabled={loading}>{loading?"Creating...":"Signup"}</button>
          <button type="button" className="btn btn-ghost" onClick={() => nav("/login")}>Back</button>
        </div>
      </form>
    </div>
  );
}
