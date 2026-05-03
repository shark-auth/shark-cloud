'use client';

import React, { useRef, useState } from 'react';

export function LiveDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="demo" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 56px)', borderTop: '1px solid hsl(0 0% 8%)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center', textAlign: 'center' }}>
          <span className="eyebrow">The flow</span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginTop: 14, maxWidth: 760, lineHeight: 1.06 }}>
            Watch delegation flows live
          </h2>
        </div>

        <div className="reveal" style={{
          marginTop: 56,
          width: '100%',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'hsl(0 0% 4%)',
            borderRadius: 20,
            border: '1px solid var(--border)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <video
              ref={videoRef}
              src="/assets/shark-demo.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              playsInline
              controls={isPlaying}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                style={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'hsla(0,0%,100%,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid hsla(0,0%,100%,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'hsla(0,0%,100%,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'hsla(0,0%,100%,0.1)';
                }}
              >
                <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid white', marginLeft: 6 }}></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
