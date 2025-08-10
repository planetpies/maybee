import React from 'react'
import GlobeStage from '../world/GlobeStage'
import { useMaybee } from '../store'
import ProfileModal from './ProfileModal'

export default function App(){
  const selected = useMaybee(s=>s.selected)
  const locations = useMaybee(s=>s.locations)
  const setSelected = useMaybee(s=>s.setSelected)

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <div className="logo" />
          <div>
            <div style={{fontSize:12, color:'#9aa4b2'}}>MAYBEE</div>
            <b>World of Creators</b>
          </div>
        </div>
        <div className="actions">
          <button className="button" onClick={()=>alert('Coming soon: WalletConnect / Privy / RainbowKit')}>Connect Wallet</button>
          <button className="button" onClick={()=>alert('Coming soon: Create Profile NFT flow')}>Create Profile</button>
        </div>
      </div>

      <div className="left">
        <div className="panel">
          <div className="section-title">Search</div>
          <div className="search">
            <input placeholder="Find a city, artist, tag…" onChange={()=>{}}/>
          </div>
          <div className="section-title">Hot Spots</div>
          <div className="list">
            {locations.map(loc => (
              <div key={loc.id} className="list-item" onClick={()=>setSelected({type:'location', data:loc})}>
                <div className="dot" />
                <div>
                  <div><b>{loc.name}</b></div>
                  <div className="legend">{loc.count} creators</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main">
        <GlobeStage />
      </div>

      <div className="right">
        <div className="panel card">
          <h3>What is Maybee?</h3>
          <div className="muted">A creative map where artists pin themselves to place and mint a Profile Card NFT — a portable identity that links your work, shows, and collabs across the web.</div>
          <div className="badges">
            <div className="badge">NFT Identity</div>
            <div className="badge">Geo Discovery</div>
            <div className="badge">Collab Radar</div>
          </div>
          <div className="links">
            <a className="link" href="#" onClick={(e)=>{e.preventDefault(); alert('Docs coming soon')}}>Read the vision</a>
            <a className="link" href="#" onClick={(e)=>{e.preventDefault(); alert('Join Discord coming soon')}}>Join the community</a>
          </div>
          <div className="legend">Hover the planet, click a glowing point to open a city. Click the city again to view profiles.</div>
        </div>
      </div>

      <div className="footer">
        © {new Date().getFullYear()} Maybee • Built for the creative world
      </div>

      {selected && <ProfileModal />}
    </div>
  )
}
