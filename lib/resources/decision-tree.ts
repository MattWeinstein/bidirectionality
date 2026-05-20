// Decision tree: classifies symptoms and returns recommended resources.
// Jurisdiction-specific data (phone numbers, URLs) comes from lib/integrations/.

import type { Resource, SymptomCategory, SymptomInput } from "@/types/resource";
import { getJurisdictionResources } from "@/lib/integrations/data-sources";

// Keyword-to-category mapping
const SYMPTOM_KEYWORDS: Record<string, SymptomCategory> = {
  // Severe first (higher priority)
  "difficulty breathing": "severe",
  "shortness of breath": "severe",
  "yellow skin": "severe",
  "yellow eyes": "severe",
  "bloody urine": "severe",

  // ILI (influenza-like)
  fever: "ili",
  rash: "ili",
  chills: "ili",
  "muscle aches": "ili",
  "body aches": "ili",

  // Respiratory
  cough: "respiratory",
  congestion: "respiratory",
  "sore throat": "respiratory",

  // Mild
  diarrhea: "mild",
  nausea: "mild",
  vomiting: "mild",
  "loss of smell": "mild",
  "loss of taste": "mild",
  "red eyes": "mild",

  // Vector/Animal
  "tick bite": "vector_encounter",
  "insect bite": "vector_encounter",
  "animal bite": "animal_encounter",
  bite: "animal_encounter",
  "dead animals": "wildlife_illness",
  "sick animals": "wildlife_illness",
  livestock: "wildlife_illness",
  mosquito: "vector_presence",
  mosquitoes: "vector_presence",
  "unusual insects": "vector_presence",
};

/**
 * Classify user symptoms into a category.
 * Lower input = "none"; one match = that category; tie = highest priority wins.
 */
export function classifySymptoms(symptoms: string[]): SymptomCategory {
  if (!symptoms || symptoms.length === 0) return "none";

  const lowered = symptoms.map((s) => s.toLowerCase());
  const categories = new Map<SymptomCategory, number>();

  for (const symptom of lowered) {
    for (const [keyword, category] of Object.entries(SYMPTOM_KEYWORDS)) {
      if (symptom.includes(keyword)) {
        categories.set(category, (categories.get(category) ?? 0) + 1);
      }
    }
  }

  if (categories.size === 0) return "none";

  // Priority order if tied
  const priority: SymptomCategory[] = [
    "severe",
    "ili",
    "animal_encounter",
    "vector_encounter",
    "wildlife_illness",
    "vector_presence",
    "respiratory",
    "mild",
  ];

  for (const cat of priority) {
    if (categories.has(cat)) return cat;
  }

  return "none";
}

/**
 * Get resources for a symptom category + jurisdiction.
 * Merges generic resources with jurisdiction-specific data.
 */
export async function getResourcesForCategory(
  input: SymptomInput,
): Promise<Resource[]> {
  const category = classifySymptoms(input.symptoms);
  const jurisdiction = input.jurisdiction;

  // Generic resources per category
  const baseResources: Record<SymptomCategory, Omit<Resource, "id">[]> = {
    none: [
      {
        title: "Current Activity & Alerts",
        type: "surveillance",
        description: "Check what's happening in your area",
        url: "/alerts",
      },
    ],

    respiratory: [
      {
        title: "Respiratory Illness Dashboard",
        type: "surveillance",
        description: "Current respiratory activity in your jurisdiction",
        url: `https://azdhs.gov/respiratory-summary`, // placeholder
      },
      {
        title: "Seek Healthcare If Worsening",
        type: "action",
        description:
          "Contact your doctor or visit an urgent care if symptoms persist.",
      },
    ],

    mild: [
      {
        title: "Current Activity & Alerts",
        type: "surveillance",
        description: "Check what's happening in your area",
        url: "/alerts",
      },
      {
        title: "Monitor Symptoms",
        type: "action",
        description: "Rest and stay hydrated. Seek care if symptoms worsen.",
      },
    ],

    ili: [
      {
        title: "Find a Rapid Test",
        type: "action",
        description:
          "Locate flu, COVID, or RSV rapid tests at nearby pharmacies",
        url: "/map", // Would show pharmacy/testing locations
      },
      {
        title: "ILI Surveillance Data",
        type: "surveillance",
        description: "Current flu/COVID/RSV activity in your jurisdiction",
      },
      {
        title: "Consider Healthcare",
        type: "action",
        description:
          "Speak with a doctor about antiviral treatments if eligible",
      },
    ],

    severe: [
      {
        title: "Call 911",
        type: "action",
        description:
          "You may be experiencing a medical emergency. Seek immediate care.",
      },
    ],

    vector_encounter: [
      {
        title: "About Rocky Mountain Spotted Fever (RMSF)",
        type: "link",
        description: "CDC guidance on RMSF transmission and prevention",
        url: "https://www.cdc.gov/rmsf/index.html",
      },
      {
        title: "Watch for RMSF Symptoms",
        type: "action",
        description:
          "Fever, headache, rash. Seek care immediately if symptoms appear.",
      },
    ],

    animal_encounter: [
      {
        title: "About Rabies",
        type: "link",
        description: "CDC information on rabies exposure and prevention",
        url: "https://www.cdc.gov/rabies/index.html",
      },
      {
        title: "Seek Medical Attention",
        type: "action",
        description:
          "Post-exposure prophylaxis (PEP) is effective if given promptly",
      },
    ],

    wildlife_illness: [
      {
        title: "Report to Arizona Game & Fish",
        type: "phone",
        description: "24-hour dispatch for wildlife emergencies",
        phone: "623-236-7201",
      },
      {
        title: "USDA Sick Bird Hotline",
        type: "phone",
        description: "Report sick or dead poultry",
        phone: "866-536-7593",
      },
    ],

    vector_presence: [
      {
        title: "About West Nile Virus",
        type: "link",
        description: "CDC guidance on West Nile prevention",
        url: "https://www.cdc.gov/westnile/index.html",
      },
      {
        title: "VectorSurv Maps",
        type: "surveillance",
        description: "Real-time mosquito and West Nile activity in Arizona",
        url: "https://www.vectorsurv.org/",
      },
    ],
  };

  // Fetch jurisdiction-specific overrides/additions
  // (e.g., Pima County animal control, local testing sites)
  const jurisdictionAdditions = await getJurisdictionResources(jurisdiction);

  // Merge: base + jurisdiction-specific
  const resources = baseResources[category] ?? [];
  const merged = [...resources, ...(jurisdictionAdditions[category] ?? [])];

  // Add IDs
  return merged.map((r, i) => ({
    ...r,
    id: `${category}-${i}`,
  }));
}
