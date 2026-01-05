import { useState } from 'react'
import { FiPlus, FiTrendingUp, FiTarget, FiCalendar, FiActivity, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './App.css'

const meals = {
  breakfast: [
    { id: 1, name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 55, fats: 8, image: '🥣' },
    { id: 2, name: 'Scrambled Eggs', calories: 280, protein: 20, carbs: 2, fats: 20, image: '🍳' },
    { id: 3, name: 'Greek Yogurt Bowl', calories: 250, protein: 15, carbs: 30, fats: 8, image: '🥛' },
  ],
  lunch: [
    { id: 4, name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 20, fats: 25, image: '🥗' },
    { id: 5, name: 'Salmon & Vegetables', calories: 520, protein: 40, carbs: 30, fats: 28, image: '🐟' },
    { id: 6, name: 'Quinoa Bowl', calories: 400, protein: 15, carbs: 60, fats: 12, image: '🍚' },
  ],
  dinner: [
    { id: 7, name: 'Lean Beef & Sweet Potato', calories: 550, protein: 45, carbs: 45, fats: 20, image: '🥩' },
    { id: 8, name: 'Turkey Wrap', calories: 380, protein: 30, carbs: 35, fats: 15, image: '🌯' },
    { id: 9, name: 'Vegetable Stir Fry', calories: 320, protein: 12, carbs: 40, fats: 14, image: '🥘' },
  ],
  snacks: [
    { id: 10, name: 'Protein Shake', calories: 150, protein: 25, carbs: 5, fats: 3, image: '🥤' },
    { id: 11, name: 'Almonds', calories: 160, protein: 6, carbs: 6, fats: 14, image: '🥜' },
    { id: 12, name: 'Apple & Peanut Butter', calories: 200, protein: 8, carbs: 25, fats: 10, image: '🍎' },
  ],
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const [dailyMeals, setDailyMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
    snacks: [],
  })
  const [showMealModal, setShowMealModal] = useState(null)
  const [waterIntake, setWaterIntake] = useState(4)

  const dailyGoal = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65,
  }

  const calculateTotals = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fats: 0 }
    
    if (dailyMeals.breakfast) {
      Object.keys(total).forEach(key => total[key] += dailyMeals.breakfast[key])
    }
    if (dailyMeals.lunch) {
      Object.keys(total).forEach(key => total[key] += dailyMeals.lunch[key])
    }
    if (dailyMeals.dinner) {
      Object.keys(total).forEach(key => total[key] += dailyMeals.dinner[key])
    }
    dailyMeals.snacks.forEach(snack => {
      Object.keys(total).forEach(key => total[key] += snack[key])
    })
    
    return total
  }

  const totals = calculateTotals()

  const addMeal = (mealType, meal) => {
    if (mealType === 'snacks') {
      setDailyMeals({
        ...dailyMeals,
        snacks: [...dailyMeals.snacks, meal],
      })
    } else {
      setDailyMeals({
        ...dailyMeals,
        [mealType]: meal,
      })
    }
    setShowMealModal(null)
  }

  const removeMeal = (mealType, mealId) => {
    if (mealType === 'snacks') {
      setDailyMeals({
        ...dailyMeals,
        snacks: dailyMeals.snacks.filter(m => m.id !== mealId),
      })
    } else {
      setDailyMeals({
        ...dailyMeals,
        [mealType]: null,
      })
    }
  }

  const changeDay = (direction) => {
    setSelectedDay((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 7
      } else {
        return (prev - 1 + 7) % 7
      }
    })
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">🥗 NutriPlan</div>
          <div className="nav-stats">
            <div className="stat-card">
              <FiTrendingUp />
              <span>{Math.round((totals.calories / dailyGoal.calories) * 100)}%</span>
            </div>
            <div className="stat-card">
              <FiTarget />
              <span>{dailyGoal.calories} cal</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero-stats">
          <div className="stats-grid">
            <StatCard
              label="Calories"
              current={totals.calories}
              goal={dailyGoal.calories}
              unit="cal"
              color="var(--calories)"
            />
            <StatCard
              label="Protein"
              current={totals.protein}
              goal={dailyGoal.protein}
              unit="g"
              color="var(--protein)"
            />
            <StatCard
              label="Carbs"
              current={totals.carbs}
              goal={dailyGoal.carbs}
              unit="g"
              color="var(--carbs)"
            />
            <StatCard
              label="Fats"
              current={totals.fats}
              goal={dailyGoal.fats}
              unit="g"
              color="var(--fats)"
            />
          </div>
        </section>

        <section className="day-selector">
          <button className="day-nav-btn" onClick={() => changeDay('prev')}>
            <FiChevronLeft />
          </button>
          <div className="selected-day">
            <FiCalendar />
            <h2>{days[selectedDay]}</h2>
          </div>
          <button className="day-nav-btn" onClick={() => changeDay('next')}>
            <FiChevronRight />
          </button>
        </section>

        <section className="water-intake">
          <h3>Water Intake</h3>
          <div className="water-container">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                className={`water-glass ${i < waterIntake ? 'filled' : ''}`}
                onClick={() => setWaterIntake(i + 1)}
              >
                🥤
              </button>
            ))}
            <span className="water-amount">{waterIntake * 250}ml</span>
          </div>
        </section>

        <section className="meals-section">
          <MealSection
            title="Breakfast"
            mealType="breakfast"
            meals={meals.breakfast}
            selectedMeal={dailyMeals.breakfast}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            showModal={showMealModal === 'breakfast'}
            setShowModal={setShowMealModal}
          />
          <MealSection
            title="Lunch"
            mealType="lunch"
            meals={meals.lunch}
            selectedMeal={dailyMeals.lunch}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            showModal={showMealModal === 'lunch'}
            setShowModal={setShowMealModal}
          />
          <MealSection
            title="Dinner"
            mealType="dinner"
            meals={meals.dinner}
            selectedMeal={dailyMeals.dinner}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            showModal={showMealModal === 'dinner'}
            setShowModal={setShowMealModal}
          />
          <MealSection
            title="Snacks"
            mealType="snacks"
            meals={meals.snacks}
            selectedMeals={dailyMeals.snacks}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
            showModal={showMealModal === 'snacks'}
            setShowModal={setShowMealModal}
            isMultiple={true}
          />
        </section>
      </main>
    </div>
  )
}

function StatCard({ label, current, goal, unit, color }) {
  const percentage = Math.min((current / goal) * 100, 100)

  return (
    <div className="stat-card-large">
      <div className="stat-header">
        <h3>{label}</h3>
        <span className="stat-value" style={{ color }}>
          {current} / {goal} {unit}
        </span>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
      <div className="stat-percentage">{Math.round(percentage)}%</div>
    </div>
  )
}

function MealSection({
  title,
  mealType,
  meals,
  selectedMeal,
  selectedMeals,
  onAddMeal,
  onRemoveMeal,
  showModal,
  setShowModal,
  isMultiple = false,
}) {
  return (
    <div className="meal-section">
      <div className="meal-header">
        <h3>{title}</h3>
        <button className="add-meal-btn" onClick={() => setShowModal(mealType)}>
          <FiPlus />
          Add {title}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select {title}</h3>
            <div className="meals-grid">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="meal-option"
                  onClick={() => onAddMeal(mealType, meal)}
                >
                  <div className="meal-option-image">{meal.image}</div>
                  <h4>{meal.name}</h4>
                  <div className="meal-option-nutrition">
                    <span>{meal.calories} cal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isMultiple ? (
        <div className="selected-meals">
          {selectedMeals.length === 0 ? (
            <div className="empty-state">No snacks added yet</div>
          ) : (
            selectedMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onRemove={() => onRemoveMeal(mealType, meal.id)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="selected-meals">
          {selectedMeal ? (
            <MealCard
              meal={selectedMeal}
              onRemove={() => onRemoveMeal(mealType, selectedMeal.id)}
            />
          ) : (
            <div className="empty-state">No {title.toLowerCase()} added yet</div>
          )}
        </div>
      )}
    </div>
  )
}

function MealCard({ meal, onRemove }) {
  return (
    <div className="meal-card">
      <div className="meal-card-image">{meal.image}</div>
      <div className="meal-card-info">
        <h4>{meal.name}</h4>
        <div className="meal-card-nutrition">
          <span className="nutrition-item calories">{meal.calories} cal</span>
          <span className="nutrition-item protein">P: {meal.protein}g</span>
          <span className="nutrition-item carbs">C: {meal.carbs}g</span>
          <span className="nutrition-item fats">F: {meal.fats}g</span>
        </div>
      </div>
      <button className="remove-meal-btn" onClick={onRemove}>
        ×
      </button>
    </div>
  )
}

export default App

