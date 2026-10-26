export default function DestinatieCard({ destinatie, onToggle, onDelete }) {
  const { oras, tara, zile, vizitat } = destinatie;
  
  return (
    <article className={vizitat ? 'card vizitat' : 'card'}>
      <h3>{oras}</h3>
      <p className="card tara">{tara}</p>
      <p className="card zile">{zile} zile</p>
      
      <div className="card-buttons">
        <button type="button" onClick={() => onToggle(destinatie.id)}>
          {vizitat ? 'Vizitat' : 'Marchează vizitat'}
        </button>
        <button type="button" className="btn-sterge" onClick={() => onDelete(destinatie.id)}>
          Șterge
        </button>
      </div>
    </article>
  );
}