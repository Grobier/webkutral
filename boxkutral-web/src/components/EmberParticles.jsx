export default function EmberParticles({ count = 12 }) {
  return (
    <div className="ember-container" aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="ember" style={{ bottom: 0 }} />
      ))}
    </div>
  )
}
