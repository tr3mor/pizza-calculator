<template>
  <div class="app">
    <aside class="sidebar">
      <div class="logo">
        <h1>Pizza Dough</h1>
        <span>Poolish Method</span>
      </div>

      <div class="controls">
        <div class="field">
          <label>Doughball Weight (g)</label>
          <input type="text" inputmode="numeric" v-model.number="doughballWeight" @blur="clampWeight" />
        </div>

        <div class="field">
          <label>Number of Doughballs</label>
          <input type="text" inputmode="numeric" v-model.number="doughballCount" @blur="clampCount" />
        </div>

        <div class="field">
          <label>Hydration (%)</label>
          <div class="hydration-row">
            <input
              type="text"
              inputmode="numeric"
              v-model.number="hydration"
              @blur="clampHydration"
              class="hydration-input"
            />
            <div class="slider-wrap">
              <input type="range" v-model.number="hydration" min="55" max="70" step="1" />
              <div class="slider-labels">
                <span>55</span>
                <span>60</span>
                <span>65</span>
                <span>70</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="total">
        <span>Total</span>
        <strong>{{ totalDoughWeight }}g</strong>
      </div>
    </aside>

    <main class="main">
      <div class="recipes">
        <section class="card">
          <h2>Poolish</h2>
          <p class="subtitle">12-18 hours ahead</p>
          <ul>
            <li><span>Flour</span><span>{{ recipe.poolish.flour }}g</span></li>
            <li><span>Water</span><span>{{ recipe.poolish.water }}g</span></li>
            <li><span>Instant Yeast</span><span>{{ recipe.poolish.yeast }}g</span></li>
          </ul>
        </section>

        <section class="card">
          <h2>Main Dough</h2>
          <p class="subtitle">When poolish doubled</p>
          <ul>
            <li><span>Flour</span><span>{{ recipe.mainDough.flour }}g</span></li>
            <li><span>Water</span><span>{{ recipe.mainDough.water }}g</span></li>
            <li><span>Salt</span><span>{{ recipe.mainDough.salt }}g</span></li>
            <li><span>Instant Yeast</span><span>{{ recipe.mainDough.yeast }}g</span></li>
            <li class="accent"><span>Poolish</span><span>all</span></li>
          </ul>
        </section>
      </div>

      <section class="steps">
        <h2>Instructions</h2>
        <ol>
          <li><strong>Poolish:</strong> Mix ingredients, cover, room temp <em>12-18h</em></li>
          <li><strong>Autolyse:</strong> Mix flour + water, rest <em>30 min</em></li>
          <li><strong>Mix:</strong> Add poolish, salt, yeast. Knead until smooth</li>
          <li><strong>Bulk:</strong> Room temp (~23°C) <em>1-1.5h</em></li>
          <li><strong>Divide:</strong> {{ doughballCount }} balls × {{ doughballWeight }}g</li>
          <li><strong>Cold proof:</strong> Fridge <em>24-48h</em></li>
          <li><strong>Bake:</strong> Remove from fridge <em>2h</em> before</li>
        </ol>
      </section>
    </main>

    <img src="/oven.png" alt="Oven" class="oven-decoration" />

    <footer class="credits">
      Built with Claude Code. Images generated using Google Nano Banana 2. For personal use only.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const doughballWeight = ref(260)
const doughballCount = ref(4)
const hydration = ref(63)

const WEIGHT_MIN = 100
const WEIGHT_MAX = 1000
const COUNT_MIN = 1
const COUNT_MAX = 50
const HYDRATION_MIN = 55
const HYDRATION_MAX = 70

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

const POOLISH_FLOUR_RATIO = 0.30
const POOLISH_YEAST_PERCENT = 0.001
const SALT_PERCENT = 0.028
const MAIN_DOUGH_YEAST_PERCENT = 0.001

const totalDoughWeight = computed(() => {
  return doughballWeight.value * doughballCount.value
})

const recipe = computed(() => {
  const totalWeight = totalDoughWeight.value
  const hydrationDecimal = hydration.value / 100

  const flourFactor = 1 + hydrationDecimal + SALT_PERCENT + MAIN_DOUGH_YEAST_PERCENT
  const totalFlour = totalWeight / flourFactor

  const poolishFlour = totalFlour * POOLISH_FLOUR_RATIO
  const poolishWater = poolishFlour
  const poolishYeast = poolishFlour * POOLISH_YEAST_PERCENT

  const mainDoughFlour = totalFlour - poolishFlour
  const totalWater = totalFlour * hydrationDecimal
  const mainDoughWater = totalWater - poolishWater
  const salt = totalFlour * SALT_PERCENT
  const mainDoughYeast = totalFlour * MAIN_DOUGH_YEAST_PERCENT

  return {
    poolish: {
      flour: round(poolishFlour),
      water: round(poolishWater),
      yeast: round(poolishYeast, 2)
    },
    mainDough: {
      flour: round(mainDoughFlour),
      water: round(mainDoughWater),
      salt: round(salt, 1),
      yeast: round(mainDoughYeast, 2)
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
