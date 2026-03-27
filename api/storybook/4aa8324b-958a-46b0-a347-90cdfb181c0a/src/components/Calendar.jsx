import React from 'react';
import './Calendar.css';

/**
 * Composant calendrier interactif
 * @param {Object} props - Props du composant
 * @param {Date} props.value - Date sélectionnée
 * @param {function} props.onChange - Callback de changement de date
 * @param {Date} props.minDate - Date minimale
 * @param {Date} props.maxDate - Date maximale
 * @param {array} props.disabledDates - Dates désactivées
 */
export const Calendar = (value=, onChange=, minDate=, maxDate=, disabledDates=) => {
  const { value, onChange, minDate, maxDate, disabledDates = [] } = props;
  
  const handleDateSelect = (date) => {
    if (onChange) onChange(date);
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-prev">&lt;</button>
        <span className="calendar-month">Mois Année</span>
        <button className="calendar-next">&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div 
            key={i} 
            className={`calendar-day ${i % 7 === 0 || i % 7 === 6 ? 'weekend' : ''}`}
            onClick={() => handleDateSelect(new Date())}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );\n};\n\nexport default ${name};\n