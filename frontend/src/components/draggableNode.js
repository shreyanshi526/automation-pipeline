// draggableNode.js

export const DraggableNode = ({ type, label, icon, className }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${type} cursor-grab min-w-24 h-20 flex items-center justify-center rounded-xl 
                 bg-gradient-to-br ${className}
                 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1
                 shadow-lg hover:shadow-2xl border-2 backdrop-blur-sm
                 active:scale-95 active:translate-y-0 select-none flex-col gap-1 p-3
                 relative overflow-hidden group`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform 
                      duration-1000 ease-out" />


      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        {/* Icon */}
        {icon ? (
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            {icon}
          </div>
        ) : (
          <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center mb-1">
            <div className="w-3 h-3 bg-white/60 rounded-sm" />
          </div>
        )}

        <span className="text-white text-xs font-semibold text-center leading-tight 
                         drop-shadow-md tracking-wide">
          {label}
        </span>
        </div>

        {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 
                      bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300" />
    </div>
  );
};