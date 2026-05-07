import React from "react";
import { useNavigate } from "react-router-dom";

export default function HistorialSimulaciones({
  historial,
  loadingHistorial,
  handleEliminar,
  handleSeleccionarSimulacion,
  mostrarTodoHistorial,
  handleVerMas,
  styles,
  formatCurrency,
  formatPercent,
  formatDate,
  modoLocal = false,
}) {
  const navigate = useNavigate();

  if (loadingHistorial) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Cargando historial...</p>
      </div>
    );
  }

  if (!historial || historial.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p style={{ fontSize: "18px", marginBottom: "8px" }}>No tienes simulaciones previas</p>
        <p style={{ fontSize: "14px", color: "#6c757d" }}>
          Guarda tu primera simulación usando el botón "Guardar Simulación"
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.historialGrid}>
        {historial.map((sim) => (
          <div key={sim.id} style={styles.historialCard} onClick={() => handleSeleccionarSimulacion && handleSeleccionarSimulacion(sim)}>
            <div style={styles.historialHeader}>
              
              {/* --- NUEVA ETIQUETA DE PROBABILIDAD (HU 1) --- */}
              {sim.probabilidad !== undefined && sim.probabilidad !== null && (
                <div style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  // Colores dinámicos basados en la probabilidad guardada
                  backgroundColor: sim.probabilidad > 60 ? '#dcfce7' : sim.probabilidad > 30 ? '#fffbeb' : '#fef2f2',
                  color: sim.probabilidad > 60 ? '#166534' : sim.probabilidad > 30 ? '#92400e' : '#991b1b',
                  border: `1px solid ${sim.probabilidad > 60 ? '#16a34a' : sim.probabilidad > 30 ? '#d97706' : '#dc2626'}`
                }}>
                  {sim.probabilidad}% Aprobación
                </div>
              )}

              <div style={{ flex: 1 }} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEliminar(sim.id);
                }}
                style={styles.deleteButton}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>

            {!modoLocal && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/simulacion/${sim.id}`);
                  }}
                  style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }}
                  title="Ver detalle"
                >
                  Ver detalle →
                </button>
              </div>
            )}

            <div style={styles.historialCuota}>
              <div style={styles.historialCuotaValue}>{formatCurrency(sim.cuotaMensual)}</div>
              <div style={styles.historialCuotaLabel}>Cuota mensual</div>
            </div>

            <div style={styles.historialDetails}>
              <div style={styles.historialDetailRow}>
                <span>Monto:</span>
                <strong>{formatCurrency(sim.monto)}</strong>
              </div>
              <div style={styles.historialDetailRow}>
                <span>Plazo:</span>
                <strong>{sim.plazo} meses</strong>
              </div>
              <div style={styles.historialDetailRow}>
                <span>CAE:</span>
                <strong>{formatPercent(sim.cae)}</strong>
              </div>
              {/* Nivel de aprobación en texto pequeño si existe */}
              {sim.nivel && (
                <div style={{ ...styles.historialDetailRow, marginTop: '4px', borderTop: '1px dashed #eee', paddingTop: '4px' }}>
                  <span>Nivel:</span>
                  <strong style={{ color: sim.probabilidad > 60 ? '#16a34a' : '#4a5568' }}>{sim.nivel}</strong>
                </div>
              )}
            </div>

            <div style={styles.historialFooter}>{formatDate(sim.fecha)}</div>
          </div>
        ))}
      </div>

      {historial.length >= 4 && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={handleVerMas} style={{ ...styles.button, ...styles.buttonSecondary }}>
            {mostrarTodoHistorial ? "Ver Menos ▲" : "Ver Más ▼"}
          </button>
        </div>
      )}
    </>
  );
}