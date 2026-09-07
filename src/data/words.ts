import { LanguageCode, LanguageInfo, TestMode, WordItem } from '../types';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'english', name: 'English', nativeName: 'english', flag: '🇬🇧' },
  { code: 'spanish', name: 'Spanish', nativeName: 'español', flag: '🇪🇸' },
  { code: 'french', name: 'French', nativeName: 'français', flag: '🇫🇷' },
  { code: 'german', name: 'German', nativeName: 'deutsch', flag: '🇩🇪' },
  { code: 'kinyarwanda', name: 'Kinyarwanda', nativeName: 'ikinyarwanda', flag: '🇷🇼' },
];

// Top 250 common English words (Normal)
export const ENGLISH_NORMAL_WORDS: string[] = [
  "program", "back", "something", "work", "three", "over", "they", "never", "up",
  "country", "do", "about", "company", "number", "there", "people", "to", "mean",
  "the", "be", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not",
  "on", "with", "he", "as", "you", "at", "this", "but", "his", "by", "from",
  "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all",
  "would", "there", "their", "what", "so", "up", "out", "if", "about", "who",
  "get", "which", "go", "me", "when", "make", "can", "like", "time", "no",
  "just", "him", "know", "take", "people", "into", "year", "your", "good",
  "some", "could", "them", "see", "other", "than", "then", "now", "look",
  "only", "come", "its", "over", "think", "also", "back", "after", "use",
  "two", "how", "our", "work", "first", "well", "way", "even", "new", "want",
  "because", "any", "these", "give", "day", "most", "us", "great", "between",
  "need", "large", "under", "system", "keep", "group", "begin", "seem", "country",
  "help", "talk", "where", "turn", "problem", "every", "start", "hand", "might",
  "american", "show", "part", "against", "place", "such", "again", "few", "case",
  "week", "company", "system", "each", "right", "program", "hear", "question",
  "during", "play", "government", "run", "small", "number", "off", "always",
  "move", "like", "night", "live", "point", "believe", "hold", "today", "bring",
  "happen", "next", "without", "before", "large", "million", "must", "home",
  "under", "water", "room", "write", "mother", "area", "national", "money",
  "story", "young", "fact", "month", "different", "lot", "right", "study",
  "book", "eye", "job", "word", "though", "business", "issue", "side", "kind",
  "four", "head", "far", "black", "long", "both", "little", "house", "yes",
  "since", "provide", "service", "around", "friend", "important", "father",
  "sit", "away", "until", "power", "hour", "game", "often", "yet", "line",
  "political", "end", "among", "ever", "stand", "bad", "lose", "however", "member",
  "pay", "law", "meet", "car", "city", "almost", "include", "continue", "set",
  "later", "community", "much", "name", "five", "once", "white", "least", "president",
  "learn", "real", "change", "team", "minute", "best", "several", "idea", "kid",
  "body", "information", "nothing", "ago", "lead", "social", "understand", "whether"
];

// Advanced words (1,000 common English words subset)
export const ENGLISH_ADVANCED_WORDS: string[] = [
  ...ENGLISH_NORMAL_WORDS,
  "accomplish", "administration", "alternative", "architecture", "circumstance",
  "communication", "contemporary", "determination", "distribution", "environmental",
  "establishment", "extraordinary", "fundamental", "implementation", "infrastructure",
  "investigation", "justification", "maintenance", "manufacturing", "nevertheless",
  "organization", "participation", "perspective", "philosophy", "productivity",
  "psychological", "recommendation", "relationship", "representative", "revolutionary",
  "significantly", "sophisticated", "specifically", "strengthen", "transformation",
  "understanding", "vulnerability", "comprehensive", "distinguished", "extraordinary",
  "satisfactory", "unprecedented", "conventional", "deliberately", "enthusiastic",
  "inevitably", "magnificent", "predominantly", "simultaneously", "spontaneous",
  "substantially", "sustainable", "unquestionably", "wonderfully", "acknowledgment"
];

export const SPANISH_WORDS: string[] = [
  "programa", "atrás", "algo", "trabajo", "tres", "sobre", "ellos", "nunca", "arriba",
  "país", "hacer", "cerca", "empresa", "número", "allí", "gente", "hacia", "significa",
  "el", "la", "de", "que", "y", "en", "un", "ser", "se", "no", "haber", "por", "con",
  "su", "para", "como", "estar", "tener", "le", "lo", "todo", "pero", "más", "hacer",
  "o", "poder", "decir", "este", "ir", "otro", "ese", "la", "si", "me", "ya", "ver",
  "porque", "dar", "cuando", "él", "muy", "sin", "vez", "mucho", "saber", "qué",
  "sobre", "mi", "alguno", "mismo", "yo", "también", "hasta", "año", "dos", "querer",
  "entre", "así", "primero", "desde", "grande", "eso", "ni", "nos", "llegar", "pasar",
  "tiempo", "ella", "sí", "día", "uno", "bien", "poco", "deber", "entonces", "poner",
  "cosa", "tanto", "hombre", "parecer", "nuestro", "tan", "donde", "ahora", "parte",
  "después", "vida", "quedar", "siempre", "creer", "hablar", "llevar", "dejar", "nada"
];

export const FRENCH_WORDS: string[] = [
  "programme", "retour", "quelque", "travail", "trois", "sur", "ils", "jamais", "haut",
  "pays", "faire", "environ", "entreprise", "nombre", "voici", "gens", "vers", "moyen",
  "le", "la", "les", "de", "un", "une", "dans", "que", "et", "être", "avoir", "pour",
  "ce", "qui", "par", "sur", "faire", "plus", "dire", "tout", "avec", "pouvoir", "aller",
  "voir", "en", "bien", "vouloir", "devoir", "venir", "suivre", "parler", "prendre",
  "aussi", "leur", "temps", "jour", "homme", "femme", "autre", "sans", "monde", "vie",
  "premier", "après", "deux", "falloir", "grand", "passer", "trouver", "donner", "comme",
  "croire", "aimer", "maintenant", "chose", "mettre", "sous", "penser", "reste", "lieu"
];

export const GERMAN_WORDS: string[] = [
  "programm", "zurück", "etwas", "arbeit", "drei", "über", "sie", "niemals", "oben",
  "land", "machen", "etwa", "firma", "nummer", "dort", "menschen", "bedeuten", "haben",
  "das", "ist", "du", "ich", "nicht", "die", "und", "der", "wir", "ein", "eine", "zu",
  "in", "es", "von", "mit", "sich", "auf", "für", "den", "des", "dem", "werden", "an",
  "können", "auch", "als", "nach", "wie", "aber", "aus", "sehr", "nur", "jahr", "alle",
  "geben", "schon", "immer", "wenn", "zeit", "sehen", "leben", "gut", "kommen", "hier",
  "neu", "zwei", "stehen", "leben", "sagen", "gehen", "machen", "mehr", "mensch", "woche"
];

export const KINYARWANDA_WORDS: string[] = [
  "umuryango", "igihugu", "umunsi", "umuntu", "abantu", "kora", "gukora", "akazi", "amazi",
  "inzu", "umujyi", "ubuzima", "igitabo", "amasomo", "ishuri", "umwarimu", "umunyeshuri",
  "ejo", "uyu", "aha", "kandi", "ariko", "none", "byose", "cyane", "neza", "gusa", "kuko",
  "nka", "mu", "ku", "kuri", "hasi", "hejuru", "imbere", "inyuma", "bose", "twese", "mwese",
  "kurya", "kunywa", "kugenda", "kuza", "kubona", "kumenya", "gutekereza", "kwandika",
  "gusoma", "kuvuga", "kumva", "gutanga", "gufasha", "kwiga", "umuti", "ubuvuzi", "iterambere"
];

export function getWordListByLanguage(lang: LanguageCode, mode: TestMode = 'normal'): string[] {
  if (lang === 'english') {
    return mode === 'advanced' ? ENGLISH_ADVANCED_WORDS : ENGLISH_NORMAL_WORDS;
  }
  switch (lang) {
    case 'spanish': return SPANISH_WORDS;
    case 'french': return FRENCH_WORDS;
    case 'german': return GERMAN_WORDS;
    case 'kinyarwanda': return KINYARWANDA_WORDS;
    default: return ENGLISH_NORMAL_WORDS;
  }
}

/**
 * Generates an initial randomized array of WordItems (default 250 words, enough for 200+ WPM).
 */
export function generateWordItems(lang: LanguageCode, mode: TestMode = 'normal', count = 250): WordItem[] {
  const pool = getWordListByLanguage(lang, mode);
  const items: WordItem[] = [];
  let lastWord = "";

  for (let i = 0; i < count; i++) {
    let pick = pool[Math.floor(Math.random() * pool.length)];
    // Avoid direct repeats if possible
    if (pick === lastWord && pool.length > 1) {
      pick = pool[(Math.floor(Math.random() * (pool.length - 1)) + 1) % pool.length];
    }
    lastWord = pick;
    items.push({
      id: i,
      text: pick.toLowerCase(),
      status: i === 0 ? 'current' : 'pending',
      typed: "",
    });
  }

  return items;
}
