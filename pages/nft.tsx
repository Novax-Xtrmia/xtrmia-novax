import PokumanCardGenerator from "@/components/PokumanCardGenerator";

export default function NFTPreviewPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
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
  );
}
