<template>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <h1>{{ t.title }}</h1>
          <span>{{ t.subtitle }} <a href="https://modernistcuisine.com/books/modernist-pizza/" target="_blank" rel="noopener noreferrer" class="book-link">{{ t.bookName }}</a></span>
        </div>
        <button class="lang-switch" @click="toggleLang">
          {{ currentLang === 'en' ? 'RU' : 'EN' }}
        </button>
      </div>

      <div class="field recipe-select-field">
        <label>{{ t.recipeLabel }}</label>
        <div class="recipe-select">
          <button
            v-for="r in recipeOptions"
            :key="r.id"
            class="recipe-btn"
            :class="{ active: recipeType === r.id }"
            @click="selectRecipe(r.id)"
          >
            {{ r.label }}
          </button>
        </div>
      </div>

      <div class="controls">
        <div class="field">
          <label>{{ t.doughballWeight }}</label>
          <input type="text" inputmode="numeric" v-model.number="doughballWeight" @blur="clampWeight" />
        </div>

        <div class="field">
          <label>{{ t.numberOfDoughballs }}</label>
          <input type="text" inputmode="numeric" v-model.number="doughballCount" @blur="clampCount" />
        </div>

        <div class="field">
          <label>{{ t.hydration }}</label>
          <div class="hydration-row">
            <input
              type="text"
              inputmode="numeric"
              v-model.number="hydration"
              @blur="clampHydration"
              class="hydration-input"
            />
            <div class="slider-wrap">
              <input type="range" v-model.number="hydration" min="55" max="72" step="1" />
              <div class="slider-labels">
                <span>55</span>
                <span>60</span>
                <span>65</span>
                <span>72</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="total">
        <span>{{ t.total }}</span>
        <strong>{{ totalDoughWeight }}g</strong>
      </div>
    </aside>

    <main class="main">
      <div class="recipes">
        <section class="card">
          <h2>{{ t.poolish }}</h2>
          <p class="subtitle">{{ recipeType === 'newyork' ? t.poolishSubtitleNY : t.poolishSubtitle }}</p>
          <ul>
            <li><span>{{ t.flour }} <em class="pct">({{ recipe.poolish.flourPercent }}%)</em></span><span>{{ recipe.poolish.flour }}g</span></li>
            <li><span>{{ t.water }} <em class="pct">({{ recipe.poolish.waterPercent }}%)</em></span><span>{{ recipe.poolish.water }}g</span></li>
            <li><span>{{ t.instantYeast }} <em class="pct">({{ recipe.poolish.yeastPercent }}%)</em></span><span>{{ recipe.poolish.yeast }}g</span></li>
          </ul>
        </section>

        <section class="card">
          <h2>{{ t.mainDough }}</h2>
          <p class="subtitle">{{ t.mainDoughSubtitle }}</p>
          <ul>
            <li><span>{{ t.flour }} <em class="pct">({{ recipe.mainDough.flourPercent }}%)</em></span><span>{{ recipe.mainDough.flour }}g</span></li>
            <li><span>{{ t.water }} <em class="pct">({{ recipe.mainDough.waterPercent }}%)</em></span><span>{{ recipe.mainDough.water }}g</span></li>
            <li><span>{{ t.salt }} <em class="pct">({{ recipe.mainDough.saltPercent }}%)</em></span><span>{{ recipe.mainDough.salt }}g</span></li>
            <li><span>{{ t.instantYeast }} <em class="pct">({{ recipe.mainDough.yeastPercent }}%)</em></span><span>{{ recipe.mainDough.yeast }}g</span></li>
            <li><span>{{ t.oliveOil }} <em class="pct">({{ recipe.mainDough.oilPercent }}%)</em></span><span>{{ recipe.mainDough.oil }}g</span></li>
            <li class="accent"><span>{{ t.poolish }}</span><span>{{ t.all }}</span></li>
          </ul>
        </section>
      </div>

      <section class="steps">
        <h2>{{ t.instructions }}</h2>
        <ol>
          <li><strong>{{ t.stepPoolish }}</strong> {{ t.stepPoolishText }} <em>{{ recipeType === 'newyork' ? t.stepPoolishTimeNY : t.stepPoolishTime }}</em></li>
          <li v-if="recipeType !== 'newyork'"><strong>{{ t.stepAutolyse }}</strong> {{ t.stepAutolyseText }} <em>{{ t.stepAutolyseTime }}</em></li>
          <li><strong>{{ t.stepMix }}</strong> {{ recipeType === 'newyork' ? t.stepMixNYText : t.stepMixText }}</li>
          <li><strong>{{ t.stepBenchRest }}</strong> {{ t.stepBenchRestText }} <em>{{ t.stepBenchRestTime }}</em></li>
          <li><strong>{{ t.stepDivide }}</strong> {{ doughballCount }} {{ t.stepDivideText }} {{ doughballWeight }}{{ t.grams }}</li>
          <li><strong>{{ t.stepColdProof }}</strong> {{ t.stepColdProofText }} <em>{{ t.stepColdProofTime }}</em></li>
          <li><strong>{{ t.stepBake }}</strong> {{ t.stepBakeText }} <em>{{ t.stepBakeTime }}</em></li>
        </ol>
      </section>
    </main>

    <img src="/oven.png" alt="Oven" class="oven-decoration" />

    <footer class="credits">
      {{ t.credits }}
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../i18n'

const { t, currentLang, toggleLang } = useI18n()

const RECIPES = {
  neapolitan: {
    poolishFlourRatio: 0.12,
    poolishYeastPercent: 0.0011,
    saltPercent: 0.02,
    mainDoughYeastPercent: 0.001,
    oilPercent: 0.02,
    hydrationDefault: 66,
  },
  newyork: {
    poolishFlourRatio: 60 / 590,
    poolishYeastPercent: 0.001,
    saltPercent: 14.5 / 590,
    mainDoughYeastPercent: 0.002,
    oilPercent: 20 / 590,
    hydrationDefault: 69,
  },
}

const recipeType = ref('neapolitan')
const activeRecipe = computed(() => RECIPES[recipeType.value])

const recipeOptions = computed(() => [
  { id: 'neapolitan', label: t.value.recipeNeapolitan },
  { id: 'newyork', label: t.value.recipeNewYork },
])

function selectRecipe(id) {
  recipeType.value = id
  hydration.value = RECIPES[id].hydrationDefault
}

const doughballWeight = ref(260)
const doughballCount = ref(4)
const hydration = ref(RECIPES.neapolitan.hydrationDefault)

const WEIGHT_MIN = 100
const WEIGHT_MAX = 1000
const COUNT_MIN = 1
const COUNT_MAX = 50
const HYDRATION_MIN = 55
const HYDRATION_MAX = 72

function clamp(value, min, max) {
  if (isNaN(value) || value < min) return min
  if (value > max) return max
  return value
}

function clampWeight() {
  doughballWeight.value = clamp(doughballWeight.value, WEIGHT_MIN, WEIGHT_MAX)
}

function clampCount() {
  doughballCount.value = clamp(doughballCount.value, COUNT_MIN, COUNT_MAX)
}

function clampHydration() {
  hydration.value = clamp(hydration.value, HYDRATION_MIN, HYDRATION_MAX)
}

const totalDoughWeight = computed(() => {
  return doughballWeight.value * doughballCount.value
})

const recipe = computed(() => {
  const totalWeight = totalDoughWeight.value
  const hydrationDecimal = hydration.value / 100
  const {
    poolishFlourRatio,
    poolishYeastPercent: poolishYeastRatio,
    saltPercent: saltRatio,
    mainDoughYeastPercent: mainDoughYeastRatio,
    oilPercent: oilRatio,
  } = activeRecipe.value

  const flourFactor = 1 + hydrationDecimal + saltRatio + mainDoughYeastRatio + oilRatio
  const totalFlour = totalWeight / flourFactor

  const poolishFlour = totalFlour * poolishFlourRatio
  const poolishWater = poolishFlour
  const poolishYeast = poolishFlour * poolishYeastRatio

  const mainDoughFlour = totalFlour - poolishFlour
  const totalWater = totalFlour * hydrationDecimal
  const mainDoughWater = totalWater - poolishWater
  const salt = totalFlour * saltRatio
  const mainDoughYeast = totalFlour * mainDoughYeastRatio
  const oil = totalFlour * oilRatio

  const pctOfFlour = (weight, decimals = 1) => round((weight / totalFlour) * 100, decimals)

  return {
    poolish: {
      flour: round(poolishFlour),
      flourPercent: pctOfFlour(poolishFlour),
      water: round(poolishWater),
      waterPercent: pctOfFlour(poolishWater),
      yeast: round(poolishYeast, 2),
      yeastPercent: pctOfFlour(poolishYeast, 3)
    },
    mainDough: {
      flour: round(mainDoughFlour),
      flourPercent: pctOfFlour(mainDoughFlour),
      water: round(mainDoughWater),
      waterPercent: pctOfFlour(mainDoughWater),
      salt: round(salt, 1),
      saltPercent: pctOfFlour(salt, 2),
      yeast: round(mainDoughYeast, 2),
      yeastPercent: pctOfFlour(mainDoughYeast, 2),
      oil: round(oil, 1),
      oilPercent: pctOfFlour(oil, 2)
    }
  }
})

function round(value, decimals = 0) {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
</script>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  background: #121212;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sidebar {
  width: 280px;
  background: #1a1a1a;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #2a2a2a;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.sidebar-header .lang-switch {
  margin-top: 4px;
  flex-shrink: 0;
}

.logo h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
}

.logo span {
  font-size: 13px;
  color: #888;
}

.book-link {
  color: #c4896a;
  text-decoration: none;
}

.book-link:hover {
  text-decoration: underline;
}

.lang-switch {
  background: #252525;
  border: 1px solid #3a3a3a;
  color: #c4896a;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-switch:hover {
  background: #3a3a3a;
  border-color: #b86a4a;
}

.recipe-select-field {
  margin-top: 24px;
}

.recipe-select {
  display: flex;
  background: #252525;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  padding: 3px;
  gap: 3px;
}

.recipe-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: #999;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.recipe-btn:hover {
  color: #ccc;
}

.recipe-btn.active {
  background: #b86a4a;
  color: #fff;
}

.controls {
  margin-top: 32px;
  flex: 1;
}

.field {
  margin-bottom: 24px;
}

.field label {
  display: block;
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.field input[type="text"] {
  width: 100%;
  padding: 12px 14px;
  background: #252525;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  color: #fff;
  font-size: 17px;
  font-family: inherit;
}

.field input[type="text"]:focus {
  outline: none;
  border-color: #b86a4a;
}

.hydration-row {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.hydration-input {
  width: 70px !important;
  flex-shrink: 0;
  text-align: center !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.slider-wrap {
  flex: 1;
  padding-top: 6px;
}

.slider-wrap input[type="range"] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #3a3a3a;
  border-radius: 3px;
  outline: none;
}

.slider-wrap input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #b86a4a;
  border-radius: 50%;
  cursor: pointer;
}

.slider-wrap input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #b86a4a;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
  margin-top: 6px;
}

.total {
  background: #3d2a20;
  border: 1px solid #5a3d2e;
  padding: 16px 18px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total span {
  font-size: 14px;
  color: #c4a088;
}

.total strong {
  font-size: 24px;
  color: #fff;
}

.main {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  gap: 24px;
}

.recipes {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.card {
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px 22px;
  border: 1px solid #2a2a2a;
}

.card h2 {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 600;
  color: #fff;
}

.card .subtitle {
  margin: 0 0 16px;
  font-size: 13px;
  color: #888;
}

.card ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.card li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #2a2a2a;
  font-size: 16px;
}

.card li:last-child {
  border-bottom: none;
}

.card li span:first-child {
  color: #c8c8c8;
}

.card li .pct {
  color: #777;
  font-style: normal;
  font-size: 13px;
}

.card li span:last-child {
  color: #c8c8c8;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.card li.accent {
  background: #2a2a2a;
  margin: 10px -14px -10px;
  padding: 12px 14px;
  border-radius: 6px;
  border-bottom: none;
}

.card li.accent span:last-child {
  color: #c4896a;
}

.steps {
  background: #1a1a1a;
  border-radius: 10px;
  padding: 20px 22px;
  border: 1px solid #2a2a2a;
  flex: 1;
  align-self: flex-start;
}

.steps h2 {
  margin: 0 0 16px;
  font-size: 19px;
  font-weight: 600;
  color: #fff;
}

.steps ol {
  margin: 0;
  padding: 0 0 0 22px;
}

.steps li {
  padding: 8px 0;
  font-size: 15px;
  color: #c8c8c8;
  line-height: 1.6;
}

.steps li strong {
  color: #c8c8c8;
  font-weight: 500;
}

.steps li em {
  color: #c4896a;
  font-style: normal;
}

@media (max-width: 900px) {
  .app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #2a2a2a;
  }

  .main {
    flex-direction: column;
    padding: 20px;
  }

  .steps {
    align-self: stretch;
  }

  .oven-decoration {
    display: none;
  }
}

.oven-decoration {
  position: fixed;
  bottom: 20px;
  right: -100px;
  width: 720px;
  height: auto;
  opacity: 0.85;
  pointer-events: none;
  z-index: 10;
}

.credits {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: #555;
  z-index: 5;
}
</style>
