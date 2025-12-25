import React from "react";

const MenuIcons = ({item}) => {
  const itemImages = {
    ghaat: '/src/assets/images/ghaat.png',
    temple: '/src/assets/images/temple.png',
    eatery: '/src/assets/images/eaterie.png',
    heritage: '/src/assets/images/heritage.png',
  };

  return (
    <div className="h-10 w-10 rounded-full overflow-hidden">
      <img
        className="h-full w-full object-cover"
        src={itemImages[item] || '/fallback.png'} // optional fallback
        alt={`${item} icon`}
      />
    </div>
  );
};

export default MenuIcons;
