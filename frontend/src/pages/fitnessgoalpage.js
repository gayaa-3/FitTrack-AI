import React, { useState } from 'react';
import { User, Target, Clock, Dumbbell, Heart, Activity, Zap, FileText, Calendar, Weight, Ruler, ChevronRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import './fitnessgoalpage.css';
import { useNavigate } from 'react-router-dom';

const FitnessGoalPage = () => {
  const [formData, setFormData] = useState({
    
    fitnessGoal: '',
    timeframe: '',
    fitnessLevel: '',
    workoutFrequency: '',
    sessionDuration: '',
    availableEquipment: [],
    preferredWorkoutTypes: [],
    healthConditions: '',
    additionalNotes: ''
  });

  const [isAddingExercise, setIsAddingExercise] = useState({ active: false, workoutIndex: null });
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', rest: '' });

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const fitnessGoals = [
    { value: 'weight_loss', label: 'Lose Weight', description: 'Burn fat and reduce body weight' },
    { value: 'muscle_building', label: 'Build Muscle',description: 'Increase muscle mass and strength' },
    { value: 'weight_gain', label: 'Gain Weight', description: 'Healthy weight gain and muscle building' },
    { value: 'general_fitness', label: 'General Fitness', description: 'Overall health and fitness improvement' },
    { value: 'endurance', label: 'Build Endurance', description: 'Improve cardiovascular endurance' },
    { value: 'strength', label: 'Build Strength', description: 'Increase overall strength and power' }
  ];

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a break' },
    { value: 'intermediate', label: 'Intermediate', description: 'Regular exerciser with some experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced with consistent training' }
  ];

  const equipmentOptions = [
    'Dumbbells', 'Barbell', 'Resistance Bands', 'Pull-up Bar', 'Yoga Mat', 'Others'
  ];

  const workoutTypes = [
    'Strength Training', 'Cardio', 
    'CrossFit', 'Running', 'Cycling', 'Others'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.fitnessGoal && formData.fitnessLevel;
      case 2:
        return formData.workoutFrequency && formData.sessionDuration;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      setError('');
    } else {
      setError('Please fill in all required fields before proceeding.');
    }
  };


  const handleRemoveExercise = (workoutIndex, exerciseIndex) => {
    const updatedPlan = { ...workoutPlan };
    const updatedExercises = updatedPlan.workouts[workoutIndex].exercises.filter(
      (_, exIndex) => exIndex !== exerciseIndex
    );
    updatedPlan.workouts[workoutIndex].exercises = updatedExercises;
    setWorkoutPlan(updatedPlan);
  };

  const handleAddNewExercise = (e) => {
    e.preventDefault();
    const updatedPlan = { ...workoutPlan };
    updatedPlan.workouts[isAddingExercise.workoutIndex].exercises.push(newExercise);
    setWorkoutPlan(updatedPlan);

    setNewExercise({ name: '', sets: '', reps: '', rest: '' });
    setIsAddingExercise({ active: false, workoutIndex: null });
  };
  
  const handleNewExerciseChange = (e) => {
    const { name, value } = e.target;
    setNewExercise(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate(); 
  const proceed = () => {
    navigate('/workvisual'); 
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const generateWorkoutPlan = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/workout-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          availableEquipment: formData.availableEquipment.join(', '),
          preferredWorkoutTypes: formData.preferredWorkoutTypes.join(', ')
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate workout plan');
      }

      setWorkoutPlan(data.data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to generate workout plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };


  const renderStep2 = () => (
  <div className="fitness-goal-container">
    <div className="header">
      <Target className="icon" />
      <h2 className="title">Fitness Goals</h2>
      <p className="subtitle">What do you want to achieve?</p>
    </div>

    <div className="section">
      <label className="label">Primary Fitness Goal *</label>
      <div className="card-grid">
        {fitnessGoals.map((goal) => (
          <div
            key={goal.value}
            className={`card ${formData.fitnessGoal === goal.value ? 'selected' : ''}`}
            onClick={() => handleInputChange('fitnessGoal', goal.value)}
          >
            <div className="card-content">
              <span className="card-icon">{goal.icon}</span>
              <div>
                <h3 className="card-title">{goal.label}</h3>
                <p className="card-desc">{goal.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="section">
      <label className="label">Fitness Level *</label>
      <div className="card-grid">
        {fitnessLevels.map((level) => (
          <div
            key={level.value}
            className={`card ${formData.fitnessLevel === level.value ? 'selected' : ''}`}
            onClick={() => handleInputChange('fitnessLevel', level.value)}
          >
            <div className="card-content">
              <div>
                <h3 className="card-title">{level.label}</h3>
                <p className="card-desc">{level.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="section">
      <label className="label">Timeframe</label>
      <select
        value={formData.timeframe}
        onChange={(e) => handleInputChange('timeframe', e.target.value)}
        className="select"
      >
        <option value="">Select timeframe</option>
        <option value="1-3 months">1-3 months</option>
        <option value="3-6 months">3-6 months</option>
        <option value="6-12 months">6-12 months</option>
        <option value="1+ years">1+ years</option>
      </select>
    </div>
  </div>
);

const renderStep3 = () => (
  <div className="form-step">
    <div className="form-header purple">
      <Clock className="icon" />
      <h2>Workout Preferences</h2>
      <p>Tell us about your workout schedule</p>
    </div>

    <div className="form-card-grid">
      <div className="form-card">
        <label>Workout Frequency (days/week) *</label>
        <select
          value={formData.workoutFrequency}
          onChange={(e) => handleInputChange('workoutFrequency', e.target.value)}
        >
          <option value="">Select frequency</option>
          {[2,3,4,5,6,7].map(val => (
            <option key={val} value={val}>{val} days/week</option>
          ))}
        </select>
      </div>

      <div className="form-card">
        <label>Session Duration (minutes) *</label>
        <select
          value={formData.sessionDuration}
          onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
        >
          <option value="">Select duration</option>
          {[30,45,60,75,90].map(val => (
            <option key={val} value={val}>{val} minutes</option>
          ))}
        </select>
      </div>
    </div>

    <div className="form-card">
      <label>Available Equipment</label>
      <div className="checkbox-grid">
        {equipmentOptions.map((equipment) => (
          <label key={equipment} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.availableEquipment.includes(equipment)}
              onChange={() => handleArrayChange('availableEquipment', equipment)}
            />
            <span>{equipment}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="form-card">
      <label>Preferred Workout Types</label>
      <div className="checkbox-grid">
        {workoutTypes.map((type) => (
          <label key={type} className="checkbox-item">
            <input
              type="checkbox"
              checked={formData.preferredWorkoutTypes.includes(type)}
              onChange={() => handleArrayChange('preferredWorkoutTypes', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);
const renderStep4 = () => (
  <div className="form-step">
    <div className="form-header red">
      <Heart className="icon" />
      <h2>Additional Info</h2>
      <p>Any health conditions or special requirements?</p>
    </div>

    <div className="form-card">
      <label>Additional Notes & Requirements</label>
      <textarea
        value={formData.additionalNotes}
        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
        rows={4}
        placeholder="Any specific preferences, goals, or requirements for your workout plan..."
      />
    </div>

    <div className="summary-card">
      <h3>Plan Summary</h3>
      <div className="summary-grid">
        <div><strong>Goal:</strong> {fitnessGoals.find(g => g.value === formData.fitnessGoal)?.label || 'Not selected'}</div>
        <div><strong>Level:</strong> {formData.fitnessLevel || 'Not selected'}</div>
        <div><strong>Frequency:</strong> {formData.workoutFrequency ? `${formData.workoutFrequency} days/week` : 'Not selected'}</div>
        <div><strong>Duration:</strong> {formData.sessionDuration ? `${formData.sessionDuration} minutes` : 'Not selected'}</div>
      </div>
    </div>

      <button
  onClick={generateWorkoutPlan}
  disabled={isGenerating}
  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
>
  {isGenerating ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Generating Your AI Workout Plan...</span>
    </>
  ) : (
    <>
      <Zap className="w-5 h-5" />
      <span>Generate AI Workout Plan</span>
    </>
  )}
</button>
</div>
  );

  const renderWorkoutPlan = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your AI-Driven Workout Plan</h2>
        <p className="text-gray-600">Personalized plan based on your goals and preferences</p>
      </div>

      {workoutPlan && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Plan Overview</h3>
            <p className="text-gray-700 mb-4">{workoutPlan.planOverview}</p>
            <div className="flex grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{workoutPlan.totalDays}</div>
                <div className="text-sm text-gray-600">Days per week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{formData.sessionDuration}min</div>
                <div className="text-sm text-gray-600">Per session</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formData.fitnessLevel}</div>
                <div className="text-sm text-gray-600">Fitness level</div>
              </div>
            </div>
          </div>

          {workoutPlan.expectedResults && (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Expected Results</h3>
              <p className="text-green-700">{workoutPlan.expectedResults}</p>
            </div>
          )}

          {workoutPlan.weeklyStructure && (
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Weekly Structure</h3>
              <p className="text-purple-700">{workoutPlan.weeklyStructure}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Workouts</h3>
            <div className="space-y-4">
              {workoutPlan.workouts && workoutPlan.workouts.map((workout, workoutIndex) => (
                <div key={workoutIndex} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Day {workout.day}: {workout.title}</h3>
                    <span className="text-sm text-gray-500">{workout.duration}</span>
                  </div>
                  {workout.focus && (
                    <p className="text-gray-600 mb-4">Focus: {workout.focus}</p>
                  )}
                  
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Exercises:</h3>
                      <div className="space-y-3">
                        {workout.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                              <div className="text-sm text-gray-600">
                                <span className="mr-4">Sets: {exercise.sets}</span>
                                <span className="mr-4">Reps: {exercise.reps}</span>
                                {exercise.weight && <span>Weight: {exercise.weight}</span>}
                                {exercise.rest && <span className="ml-4">Rest: {exercise.rest}</span>}
                              </div>
                              {exercise.form && (
                                <p className="text-sm text-gray-600 mt-2">Form: {exercise.form}</p>
                              )}
                            </div>
                            <button 
                              onClick={() => handleRemoveExercise(workoutIndex, exerciseIndex)}
                              className="text-red-500 hover:text-red-700 font-bold ml-4 text-2xl"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    {isAddingExercise.active && isAddingExercise.workoutIndex === workoutIndex ? (
                      <form onSubmit={handleAddNewExercise} className="space-y-2 p-4 bg-blue-50 rounded-lg">
                        <h6 className="font-semibold">Add New Exercise</h6>
                        <input type="text" name="name" placeholder="Exercise Name" value={newExercise.name} onChange={handleNewExerciseChange} className="w-full p-2 border rounded" required />
                        <div className="grid grid-cols-3 gap-2">
                          <input type="text" name="sets" placeholder="Sets" value={newExercise.sets} onChange={handleNewExerciseChange} className="p-2 border rounded" required />
                          <input type="text" name="reps" placeholder="Reps" value={newExercise.reps} onChange={handleNewExerciseChange} className="p-2 border rounded" required />
                          <input type="text" name="rest" placeholder="Rest" value={newExercise.rest} onChange={handleNewExerciseChange} className="p-2 border rounded" />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                          <button type="button" onClick={() => setIsAddingExercise({ active: false, workoutIndex: null })} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        onClick={() => setIsAddingExercise({ active: true, workoutIndex: workoutIndex })}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                      >
                        + Add Exercise
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workoutPlan.nutritionTips && workoutPlan.nutritionTips.length > 0 && (
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Nutrition Tips</h3>
                <ul className="space-y-2">
                  {workoutPlan.nutritionTips.map((tip, index) => (
                    <li key={index} className="text-sm text-orange-700"> {tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {workoutPlan.safetyTips && workoutPlan.safetyTips.length > 0 && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Safety Tips</h3>
                <ul className="space-y-2">
                  {workoutPlan.safetyTips.map((tip, index) => (
                    <li key={index} className="text-sm text-red-700"> {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="action-buttons-container">
                <button
                    onClick={() => {
                    setWorkoutPlan(null);
                    setCurrentStep(1);
                    }}
                    className="btn btn-secondary-action"
                >Create New Plan</button>

                <button
                    onClick={() => window.print()}
                    className="btn btn-secondary-action"
                >Save/Print Plan</button>

                <button
                    onClick={proceed} // You'll need to create this function
                    className="btn btn-primary-action"
                >Proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI Fitness Goal Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a personalized workout plan tailored to your goals, fitness level, and preferences
          </p>
        </div>

        {!workoutPlan && (
          <div className="heads max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-2 mx-4 rounded ${
                        step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              {/* <span>Personal Info</span> */}
              <span>Fitness Goals</span>
              <span>Preferences</span>
              <span>Generate Plan</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Workout plan generated successfully!</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            )}

            {!workoutPlan && (
              <>
                {/* {currentStep === 1 && renderStep1()} */}
                {currentStep === 1 && renderStep2()}
                {currentStep === 2 && renderStep3()}
                {currentStep === 3 && renderStep4()}

                {currentStep < 3 && (
                  <div className="flex justify-between pt-8">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {workoutPlan && renderWorkoutPlan()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessGoalPage;