"use client";

import PokumanCard from "./PokumanCard";

export default function PokumanCardTest() {
  return (
    <div className="flex justify-center mt-12">
      <PokumanCard
        name="Victoria"
        birthdate="13.03.1988"
        frequency="3888"
        archetype="Master 33"
        element="Eau"
        lifePath={9}
        zodiac="Poissons"
      />
    </div>
  );
}
