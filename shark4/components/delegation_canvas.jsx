/* global React */
const { useState: useStateDC, useEffect: useEffectDC, useRef: useRefDC } = React;

/* DelegationCanvas — original visual: a "trust chain" with revocable links.
   user → agent A → agent B  with may_act_grants and DPoP key bindings */

function DelegationCanvas({ revoked, setRevoked, compact = false }) {
  // revoked: 'none' | 'B' | 'A'
  const aActive = revoked === 'none';
  const bActive = revoked === 'none';

  const Node = ({ x, y, kind, name, sub, kid, dimmed, statusLabel, statusKind }) => (
    <g transform={`translate(${x}, ${y})`} style={{ opacity: dimmed ? 0.35 : 1, transition: 'opacity .5s' }}>
      <rect x="-115" y="-46" width="230" height="92" rx="14"
        fill="hsl(0 0% 5%)" stroke="hsl(0 0% 18%)" strokeWidth="1"/>
      <rect x="-115" y="-46" width="230" height="92" rx="14"
        fill="url(#nodeGloss)"/>
      {/* Avatar */}
      <g transform="translate(-90, -16)">
        <rect x="-18" y="-18" width="36" height="36" rx="10" fill="hsl(0 0% 9%)" stroke="hsl(0 0% 22%)"/>
        {kind === 'user' ? (
          <g stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="0" cy="-3" r="5"/>
            <path d="M-9 11a9 9 0 0 1 18 0"/>
          </g>
        ) : (
          <g stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="-9" y="-7" width="18" height="14" rx="3"/>
            <path d="M0 -11v4M-5 0h.01M5 0h.01M-3 4h6"/>
          </g>
        )}
      </g>
      {/* Name + sub */}
      <text x="-60" y="-12" fill="white" fontSize="13.5" fontWeight="600" letterSpacing="-0.01em">{name}</text>
      <text x="-60" y="6" fill="hsl(0 0% 60%)" fontSize="11" fontFamily="JetBrains Mono, ui-monospace">{sub}</text>
      <text x="-60" y="22" fill="hsl(0 0% 45%)" fontSize="10.5" fontFamily="JetBrains Mono, ui-monospace">kid: {kid}</text>

      {/* Status pill */}
      <g transform="translate(75, -30)">
        <rect x="-32" y="-10" width="64" height="20" rx="10"
          fill={statusKind==='active' ? 'white' : statusKind==='revoked' ? 'hsl(0 0% 8%)' : 'hsl(0 0% 10%)'}
          stroke={statusKind==='revoked' ? 'hsl(0 0% 22%)' : 'transparent'}/>
        <text x="0" y="3.5" textAnchor="middle"
          fill={statusKind==='active' ? 'black' : 'hsl(0 0% 70%)'} fontSize="10" fontWeight="600" letterSpacing="0.04em">
          {statusLabel}
        </text>
      </g>
    </g>
  );

  const Connector = ({ from, to, label, dimmed, scope }) => {
    const mx = (from.x + to.x) / 2;
    return (
      <g style={{ opacity: dimmed ? 0.2 : 1, transition: 'opacity .5s' }}>
        <path
          d={`M ${from.x+115} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x-115} ${to.y}`}
          fill="none" stroke="hsl(0 0% 35%)" strokeWidth="1"
          className="flow-line"
        />
        <g transform={`translate(${mx}, ${(from.y+to.y)/2 - 36})`}>
          <rect x="-78" y="-22" width="156" height="44" rx="10"
            fill="hsl(0 0% 4%)" stroke="hsl(0 0% 16%)"/>
          <text x="0" y="-3" textAnchor="middle" fill="hsl(0 0% 78%)" fontSize="10.5" fontFamily="JetBrains Mono, ui-monospace">
            {label}
          </text>
          <text x="0" y="13" textAnchor="middle" fill="hsl(0 0% 50%)" fontSize="10" fontFamily="JetBrains Mono, ui-monospace">
            {scope}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="ring-soft" style={{
      position: 'relative',
      borderRadius: 18,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, hsl(0 0% 4.5%), hsl(0 0% 2.5%))',
      border: '1px solid hsl(0 0% 12%)',
    }}>
      {/* Window chrome */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '10px 14px', borderBottom: '1px solid hsl(0 0% 10%)',
        background: 'linear-gradient(180deg, hsl(0 0% 6%), hsl(0 0% 4%))',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <div style={{ display:'flex', gap: 6 }}>
            <span style={{ width:10, height:10, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
            <span style={{ width:10, height:10, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
            <span style={{ width:10, height:10, borderRadius:99, background:'hsl(0 0% 18%)' }}/>
          </div>
          <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 55%)', marginLeft: 8 }}>
            shark://admin / delegation_canvas
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
          <span className="chip">grant_id <span style={{ color:'white' }}>g_8FaQ•••</span></span>
          <span className="chip">act_chain depth 2</span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '12px 18px', borderBottom: '1px solid hsl(0 0% 10%)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
          <span className="eyebrow" style={{ color:'hsl(0 0% 80%)' }}>Delegation Canvas</span>
          <span style={{ fontSize: 12.5, color:'hsl(0 0% 55%)' }}>
            jane@acme.dev → research-orchestrator → web-fetcher
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
          <button onClick={() => setRevoked('none')} className="btn btn-ghost" style={{ height: 28, fontSize: 12, padding: '0 10px' }}>Reset</button>
          <button onClick={() => setRevoked('B')} className="btn btn-ghost" style={{ height: 28, fontSize: 12, padding: '0 10px' }}>Revoke B</button>
          <button onClick={() => setRevoked('A')} className="btn btn-ghost" style={{ height: 28, fontSize: 12, padding: '0 10px' }}>
            Cascade revoke
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', padding: '32px 8px 24px' }}>
        <div className="grid-overlay" style={{ position:'absolute', inset:0, opacity: .6 }}/>
        <div className="noise"/>
        <svg viewBox="0 0 1100 360" style={{ width: '100%', height: 'auto', display:'block' }}>
          <defs>
            <linearGradient id="nodeGloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="hsla(0,0%,100%,0.06)"/>
              <stop offset="0.5" stopColor="hsla(0,0%,100%,0.0)"/>
              <stop offset="1" stopColor="hsla(0,0%,100%,0.02)"/>
            </linearGradient>
          </defs>

          {/* Backdrop pulse */}
          <circle cx="160" cy="180" r="120" fill="url(#nodeGloss)" opacity=".4"/>

          <Connector
            from={{x: 160, y: 180}} to={{x: 550, y: 180}}
            label="may_act → research-orchestrator"
            scope="scope: read:gmail read:calendar  ·  exp 1h"
            dimmed={revoked === 'A'}
          />
          <Connector
            from={{x: 550, y: 180}} to={{x: 940, y: 180}}
            label="token_exchange (RFC 8693)"
            scope="scope: web:fetch  ·  exp 5m  ·  DPoP-bound"
            dimmed={revoked !== 'none'}
          />

          <Node x={160} y={180} kind="user" name="Jane Park"   sub="user · acme.dev"
                kid="rsa-2048-aD3" statusLabel="VERIFIED" statusKind="active"/>
          <Node x={550} y={180} kind="bot"  name="research-orchestrator" sub="agent_a · openai-gpt5"
                kid="ec-p256-7Hx"  statusLabel={revoked === 'A' ? 'REVOKED' : 'ACTIVE'} statusKind={revoked === 'A' ? 'revoked' : 'active'}
                dimmed={revoked === 'A'}/>
          <Node x={940} y={180} kind="bot"  name="web-fetcher" sub="agent_b · anthropic-haiku"
                kid="ec-p256-2Mn"  statusLabel={revoked !== 'none' ? 'REVOKED' : 'ACTIVE'} statusKind={revoked !== 'none' ? 'revoked' : 'active'}
                dimmed={revoked !== 'none'}/>

          {/* Side stamp */}
          <g transform="translate(550, 320)">
            <text textAnchor="middle" fill="hsl(0 0% 50%)" fontSize="10.5" fontFamily="JetBrains Mono, ui-monospace">
              act_chain: [user:jane@acme.dev → agent_a:research-orchestrator → agent_b:web-fetcher]
            </text>
          </g>
        </svg>
      </div>

      {/* Footer panel: live audit row */}
      <div style={{ borderTop: '1px solid hsl(0 0% 10%)', padding: '10px 18px', display:'grid', gridTemplateColumns:'1fr auto', gap: 12, alignItems:'center' }}>
        <div className="mono" style={{ fontSize: 11.5, color:'hsl(0 0% 70%)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          <span style={{ color:'hsl(0 0% 50%)' }}>16:42:11.084 </span>
          <span style={{ color:'white' }}>POST /token</span>
          <span style={{ color:'hsl(0 0% 50%)' }}> grant_type=</span>
          <span>urn:ietf:params:oauth:grant-type:token-exchange</span>
          <span style={{ color:'hsl(0 0% 50%)' }}> · subject=</span>
          <span>jane@acme.dev</span>
          <span style={{ color:'hsl(0 0% 50%)' }}> · actor=</span>
          <span>research-orchestrator</span>
        </div>
        <span className="tok yes" style={{ background: revoked === 'none' ? 'white' : 'hsl(0 0% 10%)', color: revoked === 'none' ? 'black' : 'hsl(0 0% 70%)' }}>
          {revoked === 'none' ? '200 OK' : '401 revoked'}
        </span>
      </div>
    </div>
  );
}

window.DelegationCanvas = DelegationCanvas;
