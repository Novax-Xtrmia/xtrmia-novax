"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import PokumanCardGenerator from "./PokumanCardGenerator";

export default function PokumanCardUploader() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleCapture = async () => {
    if (!cardRef.current) return;
    setUploading(true);

    try {
      const dataUrl = await toPng(cardRef.current);
      download(dataUrl, "pokuman-card.png");

      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append("file", blob, "pokuman-card.png");

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NGRlMGQ4Yy1hYjBjLTQ2MjItYjk4MC1kMDk2ZWUwNTE1MjciLCJlbWFpbCI6InZpY3Rvcml1cy5zcGFpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmM4OWY0NTRlZDc3OThlZjQ5NzUiLCJzY29wZWRLZXlTZWNyZXQiOiIwYzJlZDViOTYzMmVhOGJhZTMyODg3NGYxY2ZlNmU5YWViNmY3NGFhNTE5YWI5ZTE0ODhmOGQxMTIyOWI4YTdmIiwiZXhwIjoxNzgwNTg2MTcwfQ.cALJ3Wi487OeBxtmRyXwnpnWCJrQsXAL9RNXcXKmGjY`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
      setImageUrl(ipfsUrl);
    } catch (err) {
      console.error("Erreur IPFS:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10 text-white">
      <div ref={cardRef}>
        <PokumanCardGenerator
          name="Victoria"
          birthdate="13.03.1988"
          archetype="Master 33"
          element="Eau"
          lifePath={9}
          zodiac="Poissons"
          frequency="3888"
        />
      </div>

      <button
        onClick={handleCapture}
        className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-3 rounded-xl font-semibold"
        disabled={uploading}
      >
        {uploading ? "Upload en cours..." : "📸 Snapshot & Upload to IPFS"}
      </button>

      {imageUrl && (
        <div className="text-center">
          ✅ Uploaded to IPFS! <br />
          <a
            href={imageUrl}
            target="_blank"
            className="text-blue-400 underline"
          >
            Voir sur IPFS
          </a>
        </div>
      )}
    </div>
  );
}
