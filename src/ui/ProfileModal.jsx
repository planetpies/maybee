import React from 'react'
import { useMaybee } from '../store'

export default function ProfileModal(){
  const selected = useMaybee(s=>s.selected)
  const setSelected = useMaybee(s=>s.setSelected)
  const profilesByLocation = useMaybee(s=>s.profilesByLocation)

  if(!selected) return null

  const { type, data } = selected
  const onClose = () => setSelected(null)

  if(type === 'location'){
    const profiles = profilesByLocation[data.id] || []
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="panel modal" onClick={(e)=>e.stopPropagation()}>
          <h3>{data.name}</h3>
          <div className="muted">{data.count} creators pinned</div>
          <div className="list" style={{marginTop:12}}>
            {profiles.length === 0 && <div className="muted">No profiles yet. Be the first to mint a Profile Card here.</div>}
            {profiles.map(p => (
              <div key={p.id} className="list-item" onClick={()=>useMaybee.getState().setSelected({type:'profile', data:p})}>
                <div className="dot" />
                <div>
                  <div><b>{p.displayName}</b></div>
                  <div className="legend">{p.roles.join(' • ')} — {p.genres.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if(type === 'profile'){
    const p = data
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="panel modal card" onClick={(e)=>e.stopPropagation()}>
          <div className="badges">
            {p.roles.map(r => <div key={r} className="badge">{r}</div>)}
          </div>
          <h3 style={{marginTop:6}}>{p.displayName}</h3>
          <div className="muted">{p.genres.join(' • ')}</div>
          <div className="links">
            {p.links.map(l => (
              <a key={l.url} className="link" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
          <div className="legend" style={{marginTop:12}}>NFT Profile ID: {p.wallet}</div>
        </div>
      </div>
    )
  }

  return null
}
