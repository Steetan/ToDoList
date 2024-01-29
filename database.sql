CREATE TABLE tasks (
  id_task SERIAL PRIMARY KEY,
  title_task VARCHAR(255),
  description_task VARCHAR(255),
  time_task VARCHAR(255),
  selectedDate VARCHAR(255),
	isChecked BOOLEAN
);