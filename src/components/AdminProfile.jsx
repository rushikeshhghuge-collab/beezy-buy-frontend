import React, { useState, useRef, useEffect } from "react";
import {
  MdPerson, MdEdit, MdSave, MdArrowBack, MdPhone, MdEmail,
  MdBusiness, MdLocationOn, MdAdminPanelSettings, MdCameraAlt, MdClose
} from "react-icons/md";

const STORAGE_KEY = "beezy_admin_profile";

const emptyProfile = { name: "", email: "", phone: "", role: "", department: "", location: "", avatar: "" };

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [form, setForm] = useState(emptyProfile);
  const panelRef = useRef(null);
  const fileRef = useRef(null);

  // Pre-fill email from login
  useEffect(() => {
    if (!profile) {
      const email = localStorage.getItem("beezy_current_user") || "";
      setForm((f) => ({ ...f, email }));
      setEditing(true);
    }
  }, [profile]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!profile) {
      const email = localStorage.getItem("beezy_current_user") || "";
      setForm({ ...emptyProfile, email });
      setEditing(true);
    } else {
      setForm({ ...profile });
      setEditing(false);
    }
    setOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.role.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setProfile({ ...form });
    setEditing(false);
  };

  const initials = profile?.name
    ? profile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <div className="relative" ref={panelRef}>
      {/* Avatar trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2.5 group focus:outline-none"
      >
        <div className="relative">
          {profile?.avatar ? (
            <img src={profile.avatar} alt="Admin" className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-sm border-2 border-amber-300 shadow-md">
              {initials}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs font-black text-stone-800 leading-tight">{profile?.name || "Set Up Profile"}</p>
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{profile?.role || "Admin"}</p>
        </div>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-14 w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-stone-200 z-50 overflow-hidden">
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-[#0A1A12] to-[#1a3a22] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdAdminPanelSettings className="text-amber-400 text-xl" />
              <span className="text-sm font-black text-white tracking-wider uppercase">
                {!profile ? "Register Profile" : editing ? "Edit Profile" : "Admin Profile"}
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <MdClose className="text-lg" />
            </button>
          </div>

          {/* View Mode */}
          {profile && !editing && (
            <div className="p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-5">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Admin" className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-lg" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-2xl border-4 border-amber-300 shadow-lg">
                    {initials}
                  </div>
                )}
                <h3 className="mt-3 text-base font-black text-stone-900">{profile.name}</h3>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200 mt-1">
                  {profile.role}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2.5">
                {[
                  { icon: MdEmail, label: profile.email },
                  { icon: MdPhone, label: profile.phone },
                  { icon: MdBusiness, label: profile.department || "—" },
                  { icon: MdLocationOn, label: profile.location || "—" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
                    <Icon className="text-amber-500 text-base flex-shrink-0" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setForm({ ...profile }); setEditing(true); }}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all"
              >
                <MdEdit className="text-sm" /> Edit Profile
              </button>
            </div>
          )}

          {/* Edit / Register Mode */}
          {editing && (
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Avatar upload */}
              <div className="flex flex-col items-center mb-2">
                <div className="relative">
                  {form.avatar ? (
                    <img src={form.avatar} alt="Preview" className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-md" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-2xl border-4 border-amber-300 shadow-md">
                      {form.name ? form.name[0].toUpperCase() : "A"}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-amber-600 transition-colors"
                  >
                    <MdCameraAlt className="text-sm" />
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <p className="text-[10px] text-stone-400 mt-2 font-medium">Click camera to upload photo</p>
              </div>

              {[
                { icon: MdPerson, placeholder: "Full Name *", key: "name", type: "text", required: true },
                { icon: MdEmail, placeholder: "Email Address *", key: "email", type: "email", required: true },
                { icon: MdPhone, placeholder: "Phone Number *", key: "phone", type: "tel", required: true },
                { icon: MdAdminPanelSettings, placeholder: "Role / Title *", key: "role", type: "text", required: true },
                { icon: MdBusiness, placeholder: "Department", key: "department", type: "text", required: false },
                { icon: MdLocationOn, placeholder: "Location", key: "location", type: "text", required: false },
              ].map(({ icon: Icon, placeholder, key, type, required }) => (
                <div key={key} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 focus-within:border-amber-500 focus-within:bg-white transition-all">
                  <Icon className="text-stone-400 text-base flex-shrink-0" />
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    required={required}
                    className="bg-transparent w-full outline-none text-sm text-stone-700 placeholder-stone-400 font-medium"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {profile && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-stone-100 text-stone-600 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-stone-200 transition-all border border-stone-200"
                  >
                    <MdArrowBack className="text-sm" /> Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FF9F0D] to-[#E08300] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md"
                >
                  <MdSave className="text-sm" /> {profile ? "Save Changes" : "Register"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
