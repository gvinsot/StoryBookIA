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
export const Calendar = ({ value, onChange, minDate, maxDate, disabledDates }) => {
  const { value, onChange, minDate, maxDate, disabledDates = [] } = props;
  
  const handleDateChange = (date) => {
    if (onChange) onChange(new Date(date));
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav">&lt;</button>
        <span className="calendar-title">
          {value ? value.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Mois'}
        </span>
        <button className="calendar-nav">&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div 
            key={i} 
            className={`calendar-day ${i % 7 === 0 || i % 7 === 6 ? 'weekend' : ''}`}
            onClick={() => handleDateChange(new Date(2024, 0, i - 2))}
          >
            {i > 2 && i < 33 ? i - 2 : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
