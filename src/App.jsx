import React from "react";
import AramaCubugu from "./AramaCubugu.jsx";
import KategoriFiltre from "./KategoriFiltre";
import KitapListe from "./KitapListe";
import FavoriPaneli from "./FavoriPaneli";


const baslangicKitaplar = [
  {
    id: 1,
    baslik: "Mikro İşlemciler",
    yazar: "Fatih Gökçe",
    kategori: "Donanım",
    favorideMi: false,
  },
  {
    id: 2,
    baslik: "Grafik Animasyon",
    yazar: "İbrahim Arda Çankaya",
    kategori: "Tasarım",
    favorideMi: false,
  },
  {
    id: 3,
    baslik: "Veri Yapıları",
    yazar: "Muhammed Maruf Öztürk",
    kategori: "Yazılım",
    favorideMi: false,
  },
  {
    id: 4,
    baslik: "Algoritma",
    yazar: "Arif koyun",
    kategori: "Yazılım",
    favorideMi: false,
  },
  {
    id: 5,
    baslik: "Bilgisayar Mühendisliğine Giriş",
    yazar: "Turgay Aydoğan",
    kategori: "Donanım",
    favorideMi: false,
  },
];


const getStorageItem = (key, defaultValue) => {
  const savedItem = localStorage.getItem(key);
  
  return savedItem ? JSON.parse(savedItem) : defaultValue;
};

function App() {
  
  const [kitaplar, setKitaplar] = React.useState(
    getStorageItem("kitaplar", baslangicKitaplar)
  );

  
  const [aramaMetni, setAramaMetni] = React.useState(
    getStorageItem("aramaMetni", "")
  );

 
  const [kategori, setKategori] = React.useState("Tümü");

  
  
  React.useEffect(() => {
    
    localStorage.setItem("aramaMetni", JSON.stringify(aramaMetni));
  }, [aramaMetni]); 

  
  React.useEffect(() => {
    localStorage.setItem("kitaplar", JSON.stringify(kitaplar));
  }, [kitaplar]);

  
  const handleArama = (event) => {
    setAramaMetni(event.target.value);
  };

  
  const handleKategori = (event) => {
    setKategori(event.target.value);
  };

  
  const handleFavoriToggle = (id) => {
    setKitaplar(
      kitaplar.map((kitap) =>
        kitap.id === id ? { ...kitap, favorideMi: !kitap.favorideMi } : kitap
      )
    );
  };

  

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
   
    const aramaKosulu =
      kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());

    
    const kategoriKosulu = kategori === "Tümü" || kitap.kategori === kategori;

    return aramaKosulu && kategoriKosulu;
  });

  
  const favoriKitaplar = kitaplar.filter((kitap) => kitap.favorideMi);

  
  return (
    
    <>
       {}
      <h1>Minik Kitaplık</h1>

      <div className="kontrol-paneli">
        {}
        {}
        <AramaCubugu aramaMetni={aramaMetni} onSearch={handleArama} />

        {}
        <KategoriFiltre
          kategori={kategori}
          onKategoriChange={handleKategori}
        />
      </div>

      <div className="ana-icerik">
        {}
        <KitapListe
          kitaplar={filtrelenmisKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />

        {}
        <FavoriPaneli
          favoriler={favoriKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />
      </div>
    </>
  );
}

export default App;