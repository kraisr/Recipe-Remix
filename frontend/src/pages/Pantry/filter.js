import React, { Component } from 'react';
import "./pantry.css";

class MyComponent extends Component {

    state = {
        mealFilter: {
            breakfast: false,
            lunch: false,
            dinner: false,
            snack: false,
        },
        categoryFilter: {
            nuts: false,
            dairy: false,
            gluten: false,
        },
         
        dietFilter: {
            carb: false,
            keto: false,
            fat: false,
        },

        servingSize: '0',
    };

     handleMealFilterChange(mealOption) {
        this.setState((prevState) => ({
          mealFilter: {
            ...prevState.mealFilter,
            [mealOption]: !prevState.mealFilter[mealOption],
          },
        }));
     }   
     
     handleCategoryFilterChange(categoryOption) {
        this.setState((prevState) => ({
          categoryFilter: {
            ...prevState.categoryFilter,
            [categoryOption]: !prevState.categoryFilter[categoryOption],
          },
        }));
     } 

     handleDietFilterChange(dietOption) {
        this.setState((prevState) => ({
          dietFilter: {
            ...prevState.dietFilter,
            [dietOption]: !prevState.dietFilter[dietOption],
          },
        }));
     }  
      
      toggleMealFilter = () => {
        this.setState((prevState) => ({
          showMealFilter: !prevState.showMealFilter,
          showCategoryFilter: false,
          showDietFilter: false,
          showServingFilter: false,
        }));
      };
    
      toggleCategoryFilter = () => {
        this.setState((prevState) => ({
          showCategoryFilter: !prevState.showCategoryFilter,
          showMealFilter: false,
          showDietFilter: false,
          showServingFilter: false,
        }));
      };

      toggleDietFilter = () => {
        this.setState((prevState) => ({
          showDietFilter: !prevState.showDietFilter,
          showMealFilter: false,
          showCategoryFilter: false,
          showServingFilter: false,
        }));
      };

      toggleServingFilter = () => {
        this.setState((prevState) => ({
          showServingFilter: !prevState.showServingFilter,
          showDietFilter: false,
          showMealFilter: false,
          showCategoryFilter: false,
        }));
      };

      handleServingSizeChange = (event) => {
  this.setState({ servingSize: event.target.value });
};

    render() {
        const { showServingFilter, showDietFilter, dietFilter, showMealFilter, showCategoryFilter, mealFilter, categoryFilter } = this.state;

        return (
            <div className="my-component">
              <div className="filter-section">
                <button onClick={this.toggleMealFilter}>Meal</button>
                {showMealFilter && (
                  <div className="meal-filter-section">
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        id="breakfast"
                        checked={mealFilter.breakfast}
                        onChange={() => this.handleMealFilterChange('breakfast')}
                      />
                      <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        id="lunch"
                        checked={mealFilter.lunch}
                        onChange={() => this.handleMealFilterChange('lunch')}
                      />
                      <label htmlFor="lunch">Lunch</label>
                    </div>
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        id="dinner"
                        checked={mealFilter.dinner}
                        onChange={() => this.handleMealFilterChange('dinner')}
                      />
                      <label htmlFor="dinner">Dinner</label>
                    </div>
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        id="snack"
                        checked={mealFilter.snack}
                        onChange={() => this.handleMealFilterChange('snack')}
                      />
                      <label htmlFor="snack">Snack</label>
                    </div>
                  </div>
                )}
              </div>
               
            <div className="filter-section">
                <button onClick={this.toggleCategoryFilter}>Allergies</button>
                    {showCategoryFilter && (
                        <div className="meal-filter-section"> 
                            <div className="checkbox-label">
                            <input
                                type="checkbox"
                                id="Nuts"
                                checked={categoryFilter.nuts}
                                onChange={() => this.handleCategoryFilterChange('nuts')}
                            />
                            <label htmlFor="Nuts">Nuts</label>
                            </div>
                
                            <div className="checkbox-label">
                            <input
                                type="checkbox"
                                id="Dairy"
                                checked={categoryFilter.dairy}
                                onChange={() => this.handleCategoryFilterChange('dairy')}
                            />
                            <label htmlFor="Dairy">Dairy</label>
                            </div>

                            <div className="checkbox-label">
                                <input
                                    type="checkbox"
                                    id="Gluten"
                                    checked={categoryFilter.gluten}
                                    onChange={() => this.handleCategoryFilterChange('gluten')}
                                />
                                <label htmlFor="Gluten">Gluten</label>
                            </div>
                        </div>
                    )}  
            </div>

            <div className="filter-section">
            <button onClick={this.toggleDietFilter}>Diet</button>
                {showDietFilter && (
                    <div className="meal-filter-section"> 
                        <div className="checkbox-label">
                        <input
                            type="checkbox"
                            id="Carb"
                            checked={categoryFilter.carb}
                            onChange={() => this.handleCategoryFilterChange('carb')}
                        />
                        <label htmlFor="Carb">Low-Carb</label>
                        </div>
            
                        <div className="checkbox-label">
                        <input
                            type="checkbox"
                            id="Keto"
                            checked={categoryFilter.keto}
                            onChange={() => this.handleCategoryFilterChange('keto')}
                        />
                        <label htmlFor="Keto">Keto</label>
                        </div>

                        <div className="checkbox-label">
                            <input
                                type="checkbox"
                                id="Fat"
                                checked={categoryFilter.fat}
                                onChange={() => this.handleCategoryFilterChange('fat')}
                            />
                        <label htmlFor="Fat">Low-Fat</label>
                        </div>
                    </div>
                )}

            </div>

            <div className="filter-section">
            <button onClick={this.toggleServingFilter}>Serving Size</button>
                {showServingFilter && (
                <label>
                    <input
                    type="range"
                    min="0"
                    max="6"
                    step="1"
                    value={this.state.servingSize}
                    onChange={this.handleServingSizeChange}
                    />
                    {this.state.servingSize === '6' ? '6+' : this.state.servingSize}
                </label>
                )}
            </div>
                

            <button onClick={this.clearAllFilters}>Clear Filters</button>

            {/* Add filter logic and display results */}
            </div>
        );
    }

}


export default MyComponent;