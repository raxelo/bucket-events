enum EventPriority {
  LOWEST,
  LOW,
  NORMAL,
  HIGH,
  MONITOR,
}

const getPriorities = () => {
  const values = [];
  for (const name in EventPriority) {
    if (isNaN(Number(name))) {
      const value = Number(EventPriority[name]);
      values.push(value);
    }
  }
  return values;
};

export { getPriorities, EventPriority };
