'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlaygroundStore } from '@/stores/playground-store'

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const { profile, setProfile, projects, setProjects, setCurrentProjectId, setProjectName, setFolderTree, setSelectedFile, clearSpecs } = usePlaygroundStore()

  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    if (profile) {
      setEditName(profile.full_name)
      setEditPhone(profile.phone ?? '')
    }
  }, [profile])

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true)
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false })
    if (data) setProjects(data)
    setLoadingProjects(false)
  }, [supabase, setProjects])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: editName, phone: editPhone || null })
      .eq('id', profile.id)
    if (!error) {
      setProfile({ ...profile, full_name: editName, phone: editPhone || null })
      setEditing(false)
    }
    setSaving(false)
  }

  const handleLoadProject = (project: (typeof projects)[number]) => {
    setCurrentProjectId(project.id)
    setProjectName(project.project_name)
    if (project.folder_structure) setFolderTree(project.folder_structure)
    if (project.specs) {
      clearSpecs()
      Object.entries(project.specs).forEach(([k, v]) => {
        usePlaygroundStore.getState().setSpec(k, v)
      })
    }
    setSelectedFile(null)
    router.push('/playground')
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const tokensRemaining = profile?.tokens_remaining ?? 0
  const tokensUsed = profile?.tokens_used ?? 0
  const tokensTotal = tokensRemaining + tokensUsed
  const progressPct = tokensTotal > 0 ? (tokensUsed / tokensTotal) * 100 : 0

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#FAFAFA', fontFamily: 'var(--font-sans)' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid #1C1C1C',
          background: '#0A0A0A',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" height={24} alt="EasyChip" style={{ height: 24 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: '#FAFAFA' }}>
            EasyChip Playground
          </span>
        </div>
        <button
          onClick={() => router.push('/playground')}
          style={{
            background: 'transparent',
            border: '1px solid #1C1C1C',
            borderRadius: 8,
            color: '#FAFAFA',
            padding: '8px 16px',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1C1C1C')}
        >
          ← Back to Project
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>
        {/* Account Section */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 12,
              borderBottom: '1px solid #1C1C1C',
              marginBottom: 24,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Account</h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid #1C1C1C',
                  borderRadius: 8,
                  color: '#C8962E',
                  padding: '6px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C8962E')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1C1C1C')}
              >
                Edit →
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => {
                    setEditing(false)
                    setEditName(profile?.full_name ?? '')
                    setEditPhone(profile?.phone ?? '')
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #1C1C1C',
                    borderRadius: 8,
                    color: '#888888',
                    padding: '6px 14px',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1C1C1C')}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    background: '#C8962E',
                    border: 'none',
                    borderRadius: 8,
                    color: '#0A0A0A',
                    padding: '6px 14px',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-sans)',
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? 'Saving…' : 'Save →'}
                </button>
              </div>
            )}
          </div>

          {profile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FieldRow label="Name">
                {editing ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={inputStyle}
                    autoFocus
                  />
                ) : (
                  <span>{profile.full_name}</span>
                )}
              </FieldRow>
              <FieldRow label="Email">
                <span style={{ color: '#888888' }}>{profile.email}</span>
              </FieldRow>
              <FieldRow label="Position">
                <span
                  style={{
                    background: '#111111',
                    border: '1px solid #1C1C1C',
                    borderRadius: 6,
                    padding: '2px 10px',
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: '#FAFAFA',
                  }}
                >
                  {profile.position}
                </span>
              </FieldRow>
              <FieldRow label="Phone">
                {editing ? (
                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="Enter phone number"
                    style={inputStyle}
                  />
                ) : (
                  <span style={{ color: profile.phone ? '#FAFAFA' : '#888888' }}>
                    {profile.phone || 'Not set'}
                  </span>
                )}
              </FieldRow>
            </div>
          ) : (
            <p style={{ color: '#888888', fontSize: 13 }}>Loading profile…</p>
          )}
        </section>

        {/* Token Usage Section */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              paddingBottom: 12,
              borderBottom: '1px solid #1C1C1C',
              marginBottom: 24,
            }}
          >
            Token Usage
          </h2>
          <div
            style={{
              background: '#111111',
              border: '1px solid #1C1C1C',
              borderRadius: 8,
              padding: 24,
            }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, margin: '0 0 16px 0' }}>
              ⬡ {tokensRemaining.toLocaleString()} / {tokensTotal.toLocaleString()} tokens remaining
            </p>
            <div
              style={{
                background: '#1C1C1C',
                borderRadius: 8,
                height: 4,
                width: '100%',
                marginBottom: 12,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#C8962E',
                  height: '100%',
                  borderRadius: 8,
                  width: `${Math.min(progressPct, 100)}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <p style={{ color: '#888888', fontSize: 13, margin: '0 0 16px 0' }}>
              {tokensUsed.toLocaleString()} tokens used
            </p>
            <p style={{ color: '#888888', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
              Tokens are consumed when the AI model generates or modifies RTL. Model launching Q3 2026.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              paddingBottom: 12,
              borderBottom: '1px solid #1C1C1C',
              marginBottom: 24,
            }}
          >
            Projects
          </h2>
          {loadingProjects ? (
            <p style={{ color: '#888888', fontSize: 13 }}>Loading projects…</p>
          ) : projects.length === 0 ? (
            <p style={{ color: '#888888', fontSize: 13 }}>No saved projects yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleLoadProject(project)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: '1px solid #1C1C1C',
                    borderRadius: 8,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: 8,
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2A2A2A'
                    e.currentTarget.style.background = '#111111'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1C1C1C'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#FAFAFA' }}>
                    {project.project_name}
                  </span>
                  <span style={{ color: '#888888', fontSize: 12 }}>
                    {new Date(project.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Danger Zone */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              paddingBottom: 12,
              borderBottom: '1px solid #1C1C1C',
              marginBottom: 24,
              color: '#EF4444',
            }}
          >
            Danger Zone
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 14 }}>Delete Account</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888888' }}>
                Permanently delete your account and all data. This cannot be undone.
              </p>
            </div>
            <button
              onClick={handleDelete}
              style={{
                background: 'transparent',
                border: '1px solid #EF4444',
                borderRadius: 8,
                color: '#EF4444',
                padding: '6px 14px',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Delete →
            </button>
          </div>
        </section>

        {/* Logout */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              paddingBottom: 12,
              borderBottom: '1px solid #1C1C1C',
              marginBottom: 24,
            }}
          >
            Logout
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 13, color: '#888888' }}>
              Sign out of your EasyChip account.
            </p>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid #1C1C1C',
                borderRadius: 8,
                color: '#FAFAFA',
                padding: '6px 14px',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                flexShrink: 0,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1C1C1C')}
            >
              Logout →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------- Helper Components ---------- */

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color: '#888888', fontSize: 13, minWidth: 80 }}>{label}</span>
      <div style={{ fontSize: 14 }}>{children}</div>
    </div>
  )
}

/* ---------- Shared Styles ---------- */

const inputStyle: React.CSSProperties = {
  background: '#111111',
  border: '1px solid #1C1C1C',
  borderRadius: 8,
  color: '#FAFAFA',
  padding: '6px 12px',
  fontSize: 14,
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  width: 220,
}
