"use client";
// Loudmouth - Landing Screen v1.0

import { useState } from "react";
import { Screen } from "../types";

interface LandingProps {
  onNavigate: (screen: Screen) => void;
  onCreateRoom: (name: string) => void;
  onJoinRoom: (code: string, name: string) => void;
  onSolo: (name: string) => void;
  soloLoading: boolean;
  createLoading: boolean;
  joinLoading: boolean;
  error: string;
}

export default function LandingScreen({
  onNavigate,
  onCreateRoom,
  onJoinRoom,
  onSolo,
  soloLoading,
  createLoading,
  joinLoading,
  error,
}: LandingProps) {
  const [playerName, setPlayerName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("loudmouth_name") || "" : ""
  );
  const [nameLocked, setNameLocked] = useState(
    typeof window !== "undefined" ? !!localStorage.getItem("loudmouth_name") : false
  );
  const [roomCode, setRoomCode] = useState("");

  const lockName = () => {
    if (playerName.trim()) {
      localStorage.setItem("loudmouth_name", playerName.trim());
      setNameLocked(true);
    }
  };

  const loading = soloLoading || createLoading || joinLoading;

  return (
    <div className="fadeIn">
      <div className="hero-section">
        <div className="hero-inner">
          <div className="hero-topbar">
            <div className="brand-lockup">
              <span className="brand-mark">LM</span>
              <span>Loudmouth</span>
            </div>
            <div className="hero-badge">GenLayer AI rooms</div>
          </div>
          <h1 className="hero-title">
            Loudmouth
          </h1>
          <p className="hero-subtitle">
            Pick a prompt, make your loudest argument, and let the room decide.
          </p>
          <div className="hero-question-card">
            <div className="hero-question-bubble">?</div>
            <p>Whose take owns the room?</p>
          </div>
          <div className="stat-chips">
            {[["5","Players"],["3","Rounds"],["AI","Judges"],["10m","Per Game"]].map(([n,l]) => (
              <div key={l} className="stat-chip">
                <span className="num">{n}</span>
                <span className="lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="landing-body">
        <div className="landing-body-inner">
          <div className="name-section-label">
            Your Player Name
          </div>
          <div className="name-input-row">
            <input
              type="text"
              placeholder="Enter your name..."
              value={playerName}
              onChange={(e) => { setPlayerName(e.target.value); setNameLocked(false); }}
              onKeyDown={(e) => e.key === "Enter" && lockName()}
              disabled={nameLocked}
              maxLength={20}
            />
            {nameLocked
              ? <button className="set-btn set-btn--locked" onClick={() => setNameLocked(false)}>Edit</button>
              : <button className="set-btn" onClick={lockName}>Set</button>
            }
          </div>
          {nameLocked && (
            <div className="name-set-confirm">Ready as <strong>{playerName}</strong></div>
          )}

          <div className="primary-choice-grid">
            <button
              className="btn-primary"
              onClick={() => onCreateRoom(playerName.trim())}
              disabled={loading || !playerName.trim()}
            >
              {createLoading ? (
                <span className="btn-loading"><span className="spinner" />Creating...</span>
              ) : "Create Room"}
            </button>
            <button
              className="btn-secondary"
              onClick={() => onSolo(playerName.trim())}
              disabled={loading || !playerName.trim()}
            >
              {soloLoading ? (
                <span className="btn-loading"><span className="spinner" />Setting up...</span>
              ) : "Solo Arena"}
            </button>
          </div>

          <div className="divider-row">or join a room</div>

          <div className="join-row">
            <input
              type="text"
              placeholder="Room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && onJoinRoom(roomCode, playerName.trim())}
              maxLength={6}
            />
            <button
              className="join-btn"
              onClick={() => onJoinRoom(roomCode, playerName.trim())}
              disabled={loading || !playerName.trim() || roomCode.trim().length < 6}
            >
              {joinLoading ? "..." : "Join"}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="action-grid">
            <button className="btn-outline" onClick={() => onNavigate("leaderboard")}>
              Leaderboard
            </button>
            <button className="btn-outline" onClick={() => onNavigate("rejoin")}>
              Game Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
