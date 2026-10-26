import { useState } from 'react';
import { destinatii as destinatiiInitiale } from './data/destinatii.js';
import { getNevizitate, totalZile, marcheazaVizitat, adaugaDestinatie, stergeDestinatie } from './utils/destinatii.js';

import Rezumat from './components/Rezumat.jsx';
import FormularDestinatie from './components/FormularDestinatie.jsx';
import ListaDestinatii from './components/ListaDestinatii.jsx';
import './App.css';

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale);

  const listaNevizitate = getNevizitate(destinatii);
  const numarTotal = destinatii.length;
  const numarNevizitate = listaNevizitate.length;
  const zileRamase = totalZile(listaNevizitate);

  function handleToggle(id) {
    setDestinatii((curent) => marcheazaVizitat(curent, id));
  }

  function handleAdd(nouaDestinatie) {
    setDestinatii((curent) => adaugaDestinatie(curent, nouaDestinatie));
  }

  function handleDelete(id) {
    setDestinatii((curent) => stergeDestinatie(curent, id));
  }

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat total={numarTotal} nevizitate={numarNevizitate} zile={zileRamase} />
      <FormularDestinatie onAdd={handleAdd} />
      <ListaDestinatii 
        destinatii={destinatii} 
        onToggle={handleToggle} 
        onDelete={handleDelete} 
      />
    </main>
  );
}