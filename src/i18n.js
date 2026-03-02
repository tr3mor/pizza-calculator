import { ref, computed } from 'vue'

const translations = {
  en: {
    title: 'Pizza Dough',
    subtitle: 'Poolish Method',
    doughballWeight: 'Doughball Weight (g)',
    numberOfDoughballs: 'Number of Doughballs',
    hydration: 'Hydration (%)',
    total: 'Total',
    poolish: 'Poolish',
    poolishSubtitle: '12-18 hours ahead',
    mainDough: 'Main Dough',
    mainDoughSubtitle: 'When poolish doubled',
    flour: 'Flour',
    water: 'Water',
    instantYeast: 'Instant Yeast',
    salt: 'Salt',
    all: 'all',
    instructions: 'Instructions',
    stepPoolish: 'Poolish:',
    stepPoolishText: 'Mix ingredients, cover, room temp',
    stepPoolishTime: '12-18h',
    stepAutolyse: 'Autolyse:',
    stepAutolyseText: 'Mix flour + water, rest',
    stepAutolyseTime: '30 min',
    stepMix: 'Mix:',
    stepMixText: 'Add poolish, salt, yeast. Knead until smooth',
    stepBulk: 'Bulk:',
    stepBulkText: 'Room temp (~23°C)',
    stepBulkTime: '1-1.5h',
    stepDivide: 'Divide:',
    stepDivideText: 'balls ×',
    stepColdProof: 'Cold proof:',
    stepColdProofText: 'Fridge',
    stepColdProofTime: '24-48h',
    stepBake: 'Bake:',
    stepBakeText: 'Remove from fridge',
    stepBakeTime: '2h before',
    credits: 'Built with Claude Code. Images generated using Google Nano Banana 2. For personal use only.'
  },
  ru: {
    title: 'Тесто для пиццы',
    subtitle: 'Метод опары',
    doughballWeight: 'Вес шарика (г)',
    numberOfDoughballs: 'Количество шариков',
    hydration: 'Гидратация (%)',
    total: 'Итого',
    poolish: 'Опара',
    poolishSubtitle: 'За 12-18 часов',
    mainDough: 'Основное тесто',
    mainDoughSubtitle: 'Когда опара удвоится',
    flour: 'Мука',
    water: 'Вода',
    instantYeast: 'Сухие дрожжи',
    salt: 'Соль',
    all: 'всё',
    instructions: 'Инструкция',
    stepPoolish: 'Опара:',
    stepPoolishText: 'Смешать ингредиенты, накрыть, комнатная темп.',
    stepPoolishTime: '12-18ч',
    stepAutolyse: 'Автолиз:',
    stepAutolyseText: 'Смешать муку и воду, отдых',
    stepAutolyseTime: '30 мин',
    stepMix: 'Замес:',
    stepMixText: 'Добавить опару, соль, дрожжи. Месить до гладкости',
    stepBulk: 'Брожение:',
    stepBulkText: 'Комнатная темп. (~23°C)',
    stepBulkTime: '1-1.5ч',
    stepDivide: 'Деление:',
    stepDivideText: 'шариков по',
    stepColdProof: 'Холодная расст.:',
    stepColdProofText: 'Холодильник',
    stepColdProofTime: '24-48ч',
    stepBake: 'Выпечка:',
    stepBakeText: 'Достать из холодильника за',
    stepBakeTime: '2ч',
    credits: 'Создано с помощью Claude Code. Изображения сгенерированы Google Nano Banana 2. Только для личного использования.'
  }
}

const currentLang = ref(localStorage.getItem('lang') || 'en')

export function useI18n() {
  const t = computed(() => translations[currentLang.value])

  function setLang(lang) {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }

  function toggleLang() {
    setLang(currentLang.value === 'en' ? 'ru' : 'en')
  }

  return {
    t,
    currentLang,
    setLang,
    toggleLang
  }
}
