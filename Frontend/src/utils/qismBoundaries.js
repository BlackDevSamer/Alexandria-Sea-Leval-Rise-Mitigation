const QISM_ALIASES = {
  "قسم الجمرك": ["الجمرك", "al gomrok", "gomrok", "الأنفوشي", "anfoushi"],
  "قسم الدخيلة": ["الدخيلة", "dekheila", "dekhela", "dikhila"],
  "قسم مينا البصل": ["المكس", "max", "el max", "مينا البصل", "mina al-basal"],
  "قسم محرم بك": ["محرم بك", "حي وسط", "وسط", "wassat", "wasat", "central"],
  "قسم المنشية": ["المنشية", "al manshiyya", "manshiyya"],
  "قسم المنتزة": [
    "المنتزه",
    "المنتزة",
    "al montaza",
    "al montazah",
    "montaza",
    "montazah",
    "أبو قير",
    "abu qir",
    "aboukir",
    "abukir",
    "المعمورة",
  ],
  "قسم أول الرمل": ["حي شرق", "شرق", "east", "eastern", "اول الرمل"],
  "قسم ثان الرمل": ["ثان الرمل", "second raml"],
  "قسم باب شرقى": ["المدينة القديمة", "باب شرق", "bab sharqi"],
  "قسم برج العرب": ["برج العرب", "burg al-arab"],
  "مدينه برج العرب الجديده": ["مدينة برج العرب", "burg al-arab city"],
  "قسم سيدى جابر": ["سيدي جابر", "sidi gabir", "sidigabir"],
  "قسم العطارين": ["العطارين", "al attarin"],
  "قسم كرموز": ["كرموز", "karmouz", "karmuz"],
  "قسم اللبان": ["اللبان", "labban"],
  "قسم العامرية": ["العامرية", "amreia"],
  "معظم المناطق الساحلية": ["ساحلي", "coastal"],
};

export function normalizeQismName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function isQismNameMatch(left, right) {
  const source = normalizeQismName(left);
  const target = normalizeQismName(right);

  if (!source || !target) {
    return false;
  }

  if (source === target) {
    return true;
  }

  if (source.includes(target) || target.includes(source)) {
    return true;
  }

  return false;
}

export function stripQismPrefix(name) {
  return String(name || "")
    .trim()
    .replace(/^قسم\s+/, "")
    .replace(/^مدينه\s+/, "")
    .replace(/^مدينة\s+/, "");
}

export function qismMatchesDistrict(districtNameAr, qismName) {
  if (!districtNameAr || !qismName) {
    return false;
  }

  if (isQismNameMatch(districtNameAr, qismName)) {
    return true;
  }

  if (isQismNameMatch(stripQismPrefix(districtNameAr), qismName)) {
    return true;
  }

  const aliases = QISM_ALIASES[districtNameAr] || [];
  return aliases.some((alias) => isQismNameMatch(alias, qismName));
}

export function getDistrictRiskLevel(
  districtNameAr,
  facilities,
  modelHighRiskAreas,
  normalizeRiskValue,
  getRiskPriority,
) {
  let maxPriority = 0;
  let matchedRisk = null;

  (facilities || []).forEach((facility) => {
    if (!qismMatchesDistrict(districtNameAr, facility.qism)) {
      return;
    }

    const risk = normalizeRiskValue(facility.risk);
    const priority = getRiskPriority(risk);

    if (priority > maxPriority) {
      maxPriority = priority;
      matchedRisk = risk;
    }
  });

  if (matchedRisk) {
    return matchedRisk;
  }

  const isModelHighRisk = (modelHighRiskAreas || []).some((area) =>
    qismMatchesDistrict(districtNameAr, area),
  );

  return isModelHighRisk ? "high" : null;
}

export function getFacilitiesInDistrict(districtNameAr, facilities) {
  return (facilities || []).filter((facility) =>
    qismMatchesDistrict(districtNameAr, facility.qism),
  );
}
