import React from "react";
import AmortizacionTable from "./AmortizacionTable";

export default function SimulacionPreview({
  vistaPrevia,
  mostrarAmortizacion,
  setMostrarAmortizacion,
  generarTablaAmortizacion,
  formatCurrency,
  formatPercent,
  styles,
}) {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Vista Previa</h2>

      {vistaPrevia ? (
        <>
          {/* --- BLOQUE HU 1: ESTIMACIÓN DE APROBACIÓN --- */}
          {vistaPrevia.analisisPersonalizado && (
            <div style={{
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              // Colores dinámicos según el nivel
              background: vistaPrevia.analisisPersonalizado.probabilidad > 60 ? '#f0fdf4' : vistaPrevia.analisisPersonalizado.probabilidad > 30 ? '#fffbeb' : '#fef2f2',
              border: `2px solid ${vistaPrevia.analisisPersonalizado.probabilidad > 60 ? '#16a34a' : vistaPrevia.analisisPersonalizado.probabilidad > 30 ? '#d97706' : '#dc2626'}`,
            }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '4px' }}>
                PROBABILIDAD DE APROBACIÓN
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: vistaPrevia.analisisPersonalizado.probabilidad > 60 ? '#15803d' : vistaPrevia.analisisPersonalizado.probabilidad > 30 ? '#b45309' : '#b91c1c' 
              }}>
                {vistaPrevia.analisisPersonalizado.probabilidad}%
              </div>
              <div style={{ fontWeight: 'bold', color: '#374151' }}>
                Nivel: {vistaPrevia.analisisPersonalizado.nivel}
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                Carga financiera estimada: {vistaPrevia.analisisPersonalizado.cargaEstimada}%
              </div>
            </div>
          )}

          <div style={styles.cuotaBox}>
            <div style={styles.cuotaLabel}>Tu cuota mensual será:</div>
            <div style={styles.cuotaValue}>{formatCurrency(vistaPrevia.cuotaMensual)}</div>
            <div style={styles.cuotaSubtext}>por {vistaPrevia.plazo} meses</div>
          </div>

          <div style={styles.detailsGrid}>
            {typeof vistaPrevia.scoreInicial !== 'undefined' && (
              <div style={styles.detailItem}>
                <span>🧮 Scoring inicial:</span>
                <strong>{vistaPrevia.scoreInicial}</strong>
              </div>
            )}
            <div style={styles.detailItem}>
              <span>💰 Total a Pagar:</span>
              <strong>{formatCurrency(vistaPrevia.montoTotal)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>💵 Monto Solicitado:</span>
              <strong>{formatCurrency(vistaPrevia.monto)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>💸 Recibirás (líquido):</span>
              <strong style={{ color: "#28a745" }}>{formatCurrency(vistaPrevia.montoLiquido)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>📈 Intereses Totales:</span>
              <strong style={{ color: "#dc3545" }}>{formatCurrency(vistaPrevia.interesesTotales)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>🔧 Gastos Operacionales:</span>
              <strong>{formatCurrency(vistaPrevia.gastosOperacionales)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>📝 Comisión Apertura:</span>
              <strong>{formatCurrency(vistaPrevia.comisionApertura)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>📊 Tasa Base:</span>
              <strong>{formatPercent(vistaPrevia.tasaBase)}</strong>
            </div>
            <div style={styles.detailItem}>
              <span>📈 CAE:</span>
              <strong style={{ color: "#ff6b6b" }}>{formatPercent(vistaPrevia.cae)}</strong>
            </div>
          </div>

          <div style={styles.warningBox}>
            <strong>💡 ¿Qué es el CAE?</strong>
            <p style={{ margin: "8px 0 0 0", fontSize: "13px" }}>
              La Carga Anual Equivalente incluye todos los costos del crédito (tasa base + gastos + comisiones).
            </p>
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => setMostrarAmortizacion(!mostrarAmortizacion)} style={{ ...styles.button, ...styles.buttonSecondary }}>
              {mostrarAmortizacion ? '📊 Ocultar' : '📊 Ver'} Tabla de Amortización
            </button>
          </div>

          {mostrarAmortizacion && (
            <div style={{ marginTop: 16 }}>
              {/* Se mantiene el uso del componente AmortizacionTable original */}
              <AmortizacionTable tabla={generarTablaAmortizacion(vistaPrevia)} styles={styles} />
            </div>
          )}
        </>
      ) : (
        <div style={styles.emptyState}>
          <p>📋 Ajusta los valores para ver la simulación</p>
        </div>
      )}
    </div>
  );
}