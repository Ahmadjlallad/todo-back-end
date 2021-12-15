const todoModel = (seq, dataType) => {
  return seq.define("todo", {
    id: { type: dataType.STRING, primaryKey: true },
    item: { type: dataType.STRING, allowNull: false },
    assignedTo: { type: dataType.STRING, allowNull: false },
    difficulty: { type: dataType.STRING, allowNull: false },
    complete: { type: dataType.BOOLEAN, allowNull: false, defaultValue: false },
  });
};

module.exports = todoModel;