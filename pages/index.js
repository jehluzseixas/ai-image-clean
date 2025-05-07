import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    setImageUrl(data.url);
    setLoading(false);
  };

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Transforme sua ideia em arte ✨</h1>
      <input
        type="text"
        placeholder="Descreva sua cena..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: 8, width: "100%", marginTop: 16 }}
      />
      <button
        onClick={handleGenerate}
        style={{ marginTop: 16, padding: 10, fontWeight: "bold" }}
      >
        {loading ? "Gerando..." : "Gerar imagem"}
      </button>
      {imageUrl && (
        <div style={{ marginTop: 32 }}>
          <h2>Sua imagem:</h2>
          <img src={imageUrl} alt="Imagem gerada" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

