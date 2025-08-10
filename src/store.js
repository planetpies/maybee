import { create } from 'zustand'

export const useMaybee = create((set, get) => ({
  selected: null,
  setSelected: (p) => set({ selected: p }),
  // mock locations and profiles
  locations: [
    { id:'berlin', name:'Berlin', lat: 52.5200, lon: 13.4050, count: 12 },
    { id:'athens', name:'Athens', lat: 37.9838, lon: 23.7275, count: 7 },
    { id:'bristol', name:'Bristol', lat: 51.4545, lon: -2.5879, count: 5 },
    { id:'lisbon', name:'Lisbon', lat: 38.7223, lon: -9.1393, count: 3 },
  ],
  profilesByLocation: {
    berlin: [
      {
        id: 'dj-autumn',
        displayName: 'DJ Autumn',
        roles: ['DJ','Label'],
        genres: ['Bass', 'Breaks', 'Hybrid Club'],
        links: [
          { label: 'SoundCloud', url: 'https://soundcloud.com/banoffee-pies' },
          { label: 'Instagram', url: 'https://instagram.com/banoffeepiesrecords' },
          { label: 'Rinse Show', url: 'https://www.rinse.fm/shows/banoffee-pies-with-dj-autumn/' }
        ],
        wallet: '0xABCD...1234'
      }
    ],
    athens: [], bristol: [], lisbon: []
  },
  setProfilesForLocation: (locId, profiles) => set((s)=> ({
    profilesByLocation: { ...s.profilesByLocation, [locId]: profiles }
  }))
}))
