import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients }) => {

  return (
    <div className={style.recipe}>
        <h1 className={style.title}>{title}</h1>
        <ul className={style.ul}>
          {ingredients.map((ingredient) => (
            <li>{ingredient.text}</li>
          ))}
        </ul>
        <p className={style.cal}>{parseFloat(calories).toFixed(2)} KCal</p>
        <div className={style.imageContainer}>
          <img className={style.image} src={image} alt='image of food' />
        </div>
    </div>
  )
}

export default Recipe
