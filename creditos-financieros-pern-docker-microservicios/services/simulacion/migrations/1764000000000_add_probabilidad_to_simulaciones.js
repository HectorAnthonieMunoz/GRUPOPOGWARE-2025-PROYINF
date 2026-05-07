// 1762002000000_add_probabilidad_to_simulaciones.js

exports.up = (pgm) => {
  pgm.addColumns('simulaciones', {
    probabilidad: { type: 'integer', notNull: false },
    nivel: { type: 'varchar(50)', notNull: false },
    carga_financiera: { type: 'numeric(5,2)', notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('simulaciones', ['probabilidad', 'nivel', 'carga_financiera']);
};