// Página provisional de cada módulo: se reemplaza por la vista real en su sprint.
export default function ModulePage({ module }) {
  return (
    <>
      <header className="page-header">
        <span className="breadcrumb-text">Inicio / {module.label}</span>
        <h1>{module.label}</h1>
      </header>
      <div className="alert alert-info" role="status">
        Módulo en construcción · planificado para el <strong>Sprint {module.sprint}</strong>.
      </div>
      <p className="text-secondary">{module.description}</p>
    </>
  );
}
