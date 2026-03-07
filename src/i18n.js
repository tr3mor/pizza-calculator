import { ref, computed } from "vue";

const translations = {
  en: {
    title: "Pizza Dough",
    subtitle: "Poolish Method",
    doughballWeight: "Doughball Weight (g)",
    numberOfDoughballs: "Number of Doughballs",
    hydration: "Hydration (%)",
    total: "Total",
    poolish: "Poolish",
    poolishSubtitle: "12-18 hours ahead",
    mainDough: "Main Dough",
    mainDoughSubtitle: "When poolish doubled",
    flour: "Flour",
    water: "Water",
    instantYeast: "Instant Yeast",
    salt: "Salt",
    all: "all",
    grams: "g",
    instructions: "Instructions",
    stepPoolish: "Poolish:",
    stepPoolishText: "Mix ingredients (water ~20°C), cover, room temp",
    stepPoolishTime: "12-18h",
    stepAutolyse: "Autolyse:",
    stepAutolyseText: "Mix flour + cold water (~10°C), rest",
    stepAutolyseTime: "30 min",
    stepMix: "Mix:",
    stepMixText: "Add poolish, salt, yeast. Knead until smooth",
    stepBulk: "Bulk:",
    stepBulkText: "Room temp (~23°C)",
    stepBulkTime: "1-1.5h",
    stepDivide: "Divide:",
    stepDivideText: "balls ×",
    stepColdProof: "Cold proof:",
    stepColdProofText: "Fridge",
    stepColdProofTime: "24h",
    stepBake: "Bake:",
    stepBakeText: "Remove from fridge",
    stepBakeTime: "3h before",
    credits:
      "Built with Claude Code. Images generated using Google Nano Banana 2. For personal use only.",
  },
  ru: {
    title: "Тесто для пиццы",
    subtitle: "Метод опары",
    doughballWeight: "Вес шарика (г)",
    numberOfDoughballs: "Количество шариков",
    hydration: "Гидратация (%)",
    total: "Итого",
    poolish: "Опара",
    poolishSubtitle: "За 12-18 часов",
    mainDough: "Основное тесто",
    mainDoughSubtitle: "Когда опара удвоится",
    flour: "Мука",
    water: "Вода",
    instantYeast: "Сухие дрожжи",
    salt: "Соль",
    all: "вся",
    grams: "г",
    instructions: "Инструкция",
    stepPoolish: "Опара:",
    stepPoolishText:
      "Смешать ингредиенты (вода ~20°C), накрыть, оставить при комнатной температуре",
    stepPoolishTime: "12-18ч",
    stepAutolyse: "Автолиз:",
    stepAutolyseText: "Смешать муку и холодную воду (~10°C), оставить",
    stepAutolyseTime: "30 мин",
    stepMix: "Замес:",
    stepMixText: "Добавить опару, соль, дрожжи. Вымесить до гладкости",
    stepBulk: "Брожение:",
    stepBulkText: "Оставить при комнатной температуре (~23°C)",
    stepBulkTime: "1-1.5ч",
    stepDivide: "Деление:",
    stepDivideText: "шт. по",
    stepColdProof: "Холодная ферментация:",
    stepColdProofText: "Оставить в холодильнике",
    stepColdProofTime: "24ч",
    stepBake: "Выпекание:",
    stepBakeText: "Достать из холодильника за",
    stepBakeTime: "3ч",
    credits:
      "Создано с помощью Claude Code. Изображения сгенерированы Google Nano Banana 2. Только для личного использования.",
  },
};

const currentLang = ref(localStorage.getItem("lang") || "en");

export function useI18n() {
  const t = computed(() => translations[currentLang.value]);

  function setLang(lang) {
    currentLang.value = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }

  function toggleLang() {
    setLang(currentLang.value === "en" ? "ru" : "en");
  }

  return {
    t,
    currentLang,
    setLang,
    toggleLang,
  };
}
