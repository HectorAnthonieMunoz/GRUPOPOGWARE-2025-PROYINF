const getRecommendation = (req, res) => {
  try {
    const { ingreso, edad } = req.body;

    if (!ingreso) {
      return res.status(400).json({ error: "Falta ingreso" });
    }

    const maxCuota = ingreso * 0.3;
    const plazo = edad < 30 ? 36 : 24;
    const monto = maxCuota * plazo;

    res.json({
      monto: Math.round(monto),
      cuota: Math.round(maxCuota),
      plazo
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  getRecommendation // 🔴 ESTO ES CLAVE
};