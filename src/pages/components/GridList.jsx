import React from 'react';

const GridList = ({ vehicles }) => {
  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="flex items-center justify-between border-b py-2"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt={vehicle.title}
              className="w-12 h-12 object-cover rounded-md"
            />
            <h2 className="font-medium text-lg">{vehicle.title}</h2>
          </div>
          <p className="text-gray-600">{vehicle.price}</p>
        </div>
      ))}
    </div>
  );
};

export default GridList;
