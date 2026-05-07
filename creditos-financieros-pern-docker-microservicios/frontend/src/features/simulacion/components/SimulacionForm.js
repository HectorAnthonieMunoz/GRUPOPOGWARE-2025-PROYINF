import React from "react";

export default function SimulacionForm({
  monto,
  setMonto,
  plazo,
  setPlazo,
  // Nuevos props agregados para la HU 1 (Datos Financieros)
  ingresos,
  setIngresos,
  deudas,
  setDeudas,
  // Props originales
  handleSimular,
  loading,
  handleLimpiar,
  CONFIG,
  styles,
  formatCurrency,
  onSolicitar,
  canSolicitar = false,
}) {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Configuración del Crédito</h2>

      <div style={styles.infoBox}>
        <strong style={{ color: "black" }}>ℹ️ Requisitos:</strong>
        <ul style={styles.infoList}>
          <li>
            Monto: {formatCurrency(CONFIG.MONTO_MIN)} - {formatCurrency(CONFIG.MONTO_MAX)}
          </li>
          <li>
            Plazo: {CONFIG.PLAZO_MIN} a {CONFIG.PLAZO_MAX} meses
          </li>
          <li>Tasa base anual: {formatCurrency(CONFIG.TASA_BASE_ANUAL)}</li>
        </ul>
      </div>

      <form onSubmit={handleSimular}>
        {/* --- SECCIÓN ORIGINAL: DATOS DEL CRÉDITO --- */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Monto del Crédito</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value) || 0)}
            style={styles.input}
            min={CONFIG.MONTO_MIN}
            max={CONFIG.MONTO_MAX}
            step="100000"
          />
          <input
            type="range"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value) || 0)}
            style={styles.slider}
            min={CONFIG.MONTO_MIN}
            max={CONFIG.MONTO_MAX}
            step="100000"
          />
          <div style={styles.rangeLabels}>
            <span>{formatCurrency(CONFIG.MONTO_MIN)}</span>
            <span style={styles.rangeValue}>{formatCurrency(monto)}</span>
            <span>{formatCurrency(CONFIG.MONTO_MAX)}</span>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Plazo (meses)</label>
          <input
            type="number"
            value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value) || 0)}
            style={styles.input}
            min={CONFIG.PLAZO_MIN}
            max={CONFIG.PLAZO_MAX}
          />
          <input
            type="range"
            value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value) || 0)}
            style={styles.slider}
            min={CONFIG.PLAZO_MIN}
            max={CONFIG.PLAZO_MAX}
          />
          <div style={styles.rangeLabels}>
            <span>{CONFIG.PLAZO_MIN} meses</span>
            <span style={styles.rangeValue}>{plazo} meses</span>
            <span>{CONFIG.PLAZO_MAX} meses</span>
          </div>
        </div>

        {/* --- SECCIÓN NUEVA HU 1: DATOS FINANCIEROS PERSONALES --- */}
        <div style={{ ...styles.formGroup, borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '10px' }}>
          <h3 style={{ fontSize: '1.1em', marginBottom: '8px', color: '#2c3e50', fontWeight: 'bold' }}>
            Personalización (Probabilidad de Aprobación)
          </h3>
          <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '15px' }}>
            Ingresa tus datos para evaluar tus opciones reales frente al banco.
          </p>

          <label style={styles.label}>Ingresos Mensuales Líquidos ($)</label>
          <input
            type="number"
            value={ingresos}
            onChange={(e) => setIngresos(Number(e.target.value) || 0)}
            style={{ ...styles.input, marginBottom: '15px' }}
            min="100000"
            placeholder="Ej: 800000"
            required
          />

          <label style={styles.label}>Otras Deudas Mensuales ($) - Opcional</label>
          <input
            type="number"
            value={deudas}
            onChange={(e) => setDeudas(Number(e.target.value) || 0)}
            style={styles.input}
            min="0"
            placeholder="Ej: 50000"
          />
        </div>

        {/* --- BOTONES --- */}
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Evaluando..." : "Simular y Evaluar"}
          </button>
          <button type="button" onClick={handleLimpiar} style={{ ...styles.button, ...styles.buttonSecondary }}>
            Limpiar
          </button>
          {onSolicitar && (
            <button
              type="button"
              disabled={!canSolicitar}
              onClick={onSolicitar}
              style={{ ...styles.button, ...styles.buttonPrimary }}
            >
              Solicitar!
            </button>
          )}
        </div>
      </form>
    </div>
  );
}