import React from "react";

function KategoriFiltre({ kategori, onKategoriChange }) {
  return (
    <div>
      <label htmlFor="kategori">Kategoriye göre filtrele:</label>
      <select id="kategori" value={kategori} onChange={onKategoriChange}>
        <option value="Tümü">Tümü</option>
        <option value="Yazılım">Yazılım</option>
        <option value="Donanım">Donanım</option>
        <option value="Tasarım">Tasarım</option>
      </select>
    </div>
  );
}

export default KategoriFiltre;