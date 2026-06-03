"use client";
// Loudmouth - Lobby Screen v1.0

import { Room } from "../types";

interface LobbyProps {
  room: Room;
  playerAddress: string;
  isHost: boolean;
  onToggleReady: () => void;
  onStartGame: () => void;
  loading: string;
}

export default function LobbyScreen({
  room,
  playerAddress,
  isHost,
  onToggleReady,
  onStartGame,
  loading,
}: LobbyProps) {
  const players = Object.values(room.players);
  const me = room.players[playerAddress];
  const isSolo = room.is_solo;

  // Host can start with 3+ players; solo rooms can start immediately.
  const canStart = isHost && players.length >= (isSolo ? 1 : 3);

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    alert("Room code copied!");
  };

  return (
    <div className="screen fadeIn">
      <div className="lobby-header">
        <div>
          <div className="lobby-title">{isSolo ? "SOLO ARENA" : "LOBBY"}</div>
          <div className="lobby-meta">Room: <strong>{room.code}</strong></div>
        </div>
        <div className="lobby-header-actions">
          {!isSolo && (
            <button
              className="btn-outline"
              onClick={copyCode}
            >
              Copy Code
            </button>
          )}
        </div>
      </div>

      <div className="section-label">
        Players ({players.length}/5)
      </div>

      <div className="player-list">
        {players.map((p) => (
          <div
            key={p.address}
            className={`player-row ${p.address === playerAddress ? "player-row--me" : ""}`}
          >
            <div className="player-avatar">
              {p.address.startsWith("bot_") ? "🤖" : p.name.charAt(0).toUpperCase()}
            </div>
            <div className="player-info">
              <div className="player-name-line">
                {p.name}
                {p.address === room.host && (
                  <span className="host-label">Host</span>
                )}
                {p.address === playerAddress && (
                  <span className="you-label">(you)</span>
                )}
              </div>
              <div className="player-address-line">
                {p.address.startsWith("bot_") ? "AI Bot" : p.address.slice(0, 12) + "..."}
              </div>
            </div>
            <span className={`ready-badge ${p.ready ? "ready-badge--yes" : "ready-badge--no"}`}>
              {p.ready ? "✓ READY" : "Waiting..."}
            </span>
          </div>
        ))}
        {players.length < 5 && (
          <div className="player-row player-row--empty">
            <div className="player-avatar">?</div>
            <span className="empty-player-text">Waiting for player...</span>
          </div>
        )}
      </div>

      <div className="lobby-actions">
        {!isHost && !isSolo && (
          <button
            className={me?.ready ? "btn-ready--ready" : "btn-ready--unready"}
            onClick={onToggleReady}
            disabled={!!loading}
          >
            {loading ? "..." : me?.ready ? "✓ Ready!" : "Mark Ready"}
          </button>
        )}
        {isHost && (
          <button
            className="btn-primary"
            onClick={onStartGame}
            disabled={!canStart || !!loading}
          >
            {loading ? (
              <span className="btn-loading"><span className="spinner" />Starting...</span>
            ) : "Start Game"}
          </button>
        )}
      </div>

      {isHost && !canStart && (
        <p className="hint-text">Need at least 3 players to start ({players.length}/3)</p>
      )}
      {!isHost && (
        <p className="hint-text pulse">Waiting for host to start the game...</p>
      )}
    </div>
  );
}
