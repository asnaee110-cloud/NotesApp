
const colors = [
  { name: "White", value: "bg-white" },
  { name: "Yellow", value: "bg-yellow-100" },
  { name: "Green", value: "bg-green-100" },
  { name: "Blue", value: "bg-blue-100" },
  { name: "Pink", value: "bg-pink-100" },
  { name: "Purple", value: "bg-purple-100" },
];

function ColorPicker({ color, setColor }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((item) => (
        <button
          key={item.name}
          type="button"
          title={item.name}
          onClick={() => setColor(item.value)}
          className={`h-7 w-7 rounded-full border border-gray-300 ${item.value} ${
            color === item.value ? "ring-2 ring-blue-500 ring-offset-2" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
