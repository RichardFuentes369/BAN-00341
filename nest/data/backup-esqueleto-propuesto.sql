CREATE DATABASE sistema_inventario_uts;
USE sistema_inventario_uts;

-- 1. Categorías de productos
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- 2. Productos (Información general)
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    codigo_barras VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    id_categoria INT,
    stock_minimo INT DEFAULT 5,
    unidad_medida ENUM('unidad', 'kg', 'litro', 'paquete') DEFAULT 'unidad',
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- 3. Lotes (Gestión de Vencimientos)
-- Esta tabla permite que un mismo producto tenga varias fechas de vencimiento
CREATE TABLE lotes (
    id_lote INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    fecha_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE NOT NULL,
    cantidad_inicial INT NOT NULL,
    stock_actual INT NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL,
    precio_venta_sugerido DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- 4. Tipos de Merma (Clasificación de pérdidas)
CREATE TABLE tipos_merma (
    id_tipo_merma INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL -- Ej: 'Vencido', 'Roto', 'Robado', 'Mal estado'
);

-- 5. Registro de Mermas
CREATE TABLE mermas (
    id_merma INT AUTO_INCREMENT PRIMARY KEY,
    id_lote INT,
    cantidad INT NOT NULL,
    id_tipo_merma INT,
    fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    FOREIGN KEY (id_lote) REFERENCES lotes(id_lote),
    FOREIGN KEY (id_tipo_merma) REFERENCES tipos_merma(id_tipo_merma)
);

-- 6. Ventas (Salidas de inventario)
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_venta DECIMAL(10,2) NOT NULL
);

-- 7. Detalle de Ventas (Relacionado con Lotes para descontar stock)
CREATE TABLE detalle_ventas (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_lote INT,
    cantidad INT NOT NULL,
    precio_unitario_aplicado DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_lote) REFERENCES lotes(id_lote)
);