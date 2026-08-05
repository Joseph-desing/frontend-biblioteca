import { FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
function UsuarioTable({ usuarios, onEditar, onEliminar }) {
  if (usuarios.length === 0) return <p className="empty-state">No existen usuarios registrados.</p>;
  return <div className="table-card"><div className="table-card__heading"><div><span><FiUsers /></span><div><h3>Lista de usuarios</h3><p>{usuarios.length} registros encontrados</p></div></div></div><div className="table-scroll"><table><thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Fecha de creación</th><th>Acciones</th></tr></thead><tbody>{usuarios.map((usuario) => <tr key={usuario.id}><td>#{usuario.id}</td><td><strong>{usuario.nombre}</strong></td><td>{usuario.correo}</td><td>{usuario.created_at || "Sin fecha"}</td><td className="table-actions"><button type="button" className="icon-button icon-button--edit" onClick={() => onEditar(usuario)} aria-label="Editar usuario"><FiEdit2 /><span>Editar</span></button><button type="button" className="icon-button icon-button--delete" onClick={() => onEliminar(usuario.id)} aria-label="Eliminar usuario"><FiTrash2 /><span>Eliminar</span></button></td></tr>)}</tbody></table></div></div>;
}
export default UsuarioTable;
