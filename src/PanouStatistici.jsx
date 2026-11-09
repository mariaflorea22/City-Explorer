import { useState, useEffect } from 'react';

export default function PanouStatistici({ destinatii }) {
  const [prag, setPrag] = useState(3);
  const [incarcare, setIncarcare] = useState(true);

  useEffect(() => {
    async function verificaServer() {
      try {
        const res = await fetch('http://localhost:3001/destinatii');
        if (!res.ok) throw new Error('Eroare');
        setIncarcare(false); // Greșeala 5
      } catch (err) {
        console.error(err);
      }
    }
    verificaServer();
  }, []);

  if (incarcare) {
    return <div className="panou">Se încarcă destinațiile...</div>;
  }

  const filtrate = destinatii.filter(d => d.zile > Number(prag)); // Greșeala 3
  const totalZile = filtrate.reduce((sum, d) => sum + Number(d.zile), 0);
  const media = totalZile / destinatii.length; // Greșeala 1

  return (
    <div className="panou">
      <h2>Statistici</h2>
      <p>
        Cel puțin <input type="number" value={prag} onChange={setPrag} className="input-prag" /> zile {/* Greșeala 4 */}
      </p>
      
      {filtrate.length && ( /* Greșeala 2 */
        <p className="eroare-text">Nicio destinație nu respectă criteriul.</p>
      )}

      <ul>
        <li>Destinații: {filtrate.length}</li>
        <li>Total zile: {totalZile}</li>
        <li>Media: {media ? media.toFixed(1) : 0} zile</li>
      </ul>
    </div>
  );
}