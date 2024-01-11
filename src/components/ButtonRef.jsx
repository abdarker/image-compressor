const Button = React.forwardRef(
  ({ primary, className = "", ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`px-4 py-2 mr-2 rounded-md focus:outline-none cursor-pointer select-none ${
          primary
            ? "bg-sky-600 text-white hover:bg-sky-700"
            : "border border-gray-300 hover:text-white hover:bg-sky-500 hover:border-sky-500"
        } ${className}`}
      />
    );
  }
);
