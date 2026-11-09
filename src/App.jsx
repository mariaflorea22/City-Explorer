import { useState, useEffect } from 'react';
import { getNevizitate, totalZile } from './utils/destinatii.js';
import { getDestinatii, patchVizitat, postDestinatie, deleteDestinatie } from './api/destinatii.js';

import Rezumat from './components/Rezumat.jsx';
import FormularDestinatie from './components/FormularDestinatie.jsx';
import ListaDestinatii from './components/ListaDestinatii.jsx';
import Cautare from './components/Cautare.jsx';
import './App.css';

export default function App() {
  const [destinatii, setDestinatii] = useState([]);
  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);
  
  const [textCautare, setTextCautare] = useState('');
  const [seTrimite, setSeTrimite] = useState(false);

useEffect(() => {
    async function incarca() {
      try {
        // Pauză artificială de 2 secunde ca să poți admira caseta albastră!
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const date = await getDestinatii();
        setDestinatii(date);
      } catch (err) {
        setEroare(err.message);
      } finally {
        setIncarcare(false);
      }
    }
    incarca();
  }, []);

  async function handleToggle(id) {
    const dest = destinatii.find(d => d.id === id);
    if (!dest) return;
    try {
      const salvata = await patchVizitat(id, !dest.vizitat);
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)));
    } catch (err) {
      console.error(err);
    }
  }

async function handleAdd(nouaDestinatie) {
    setSeTrimite(true);
    try {
      // Oprește execuția forțat timp de 2 secunde (2000 milisecunde)
      await new Promise(resolve => setTimeout(resolve, 2000)); 

      const salvata = await postDestinatie(nouaDestinatie);
      setDestinatii((curent) => [...curent, salvata]);
    } catch (err) {
      console.error(err);
    } finally {
      setSeTrimite(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDestinatie(id);
      // După ce serverul a șters-o cu succes, o scoatem și din starea afișată pe ecran
      setDestinatii((curent) => curent.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (incarcare) return <p className="stare">Se încarcă destinațiile...</p>;
  if (eroare) return <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>;

  const nevizitate = getNevizitate(destinatii);
  const text = textCautare.trim().toLowerCase();
  const afisate = destinatii.filter(
    (d) => d.oras.toLowerCase().includes(text) || d.tara.toLowerCase().includes(text)
  );

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat 
        total={destinatii.length} 
        nevizitate={nevizitate.length} 
        zile={totalZile(nevizitate)} 
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={textCautare} onChange={(e) => setTextCautare(e.target.value)} />
      
      {destinatii.length === 0 ? (
        <p className="gol">Nu există nicio destinație. Adaugă prima din formular.</p>
      ) : afisate.length === 0 ? (
        <p className="gol">Niciun rezultat pentru „{textCautare}”.</p>
      ) : (
        <ListaDestinatii destinatii={afisate} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </main>
  );
}