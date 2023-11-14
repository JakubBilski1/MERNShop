import React from 'react'

function FavoriteTeams(props) {
    console.log(props)
  return (
    <div>
        {props.teamsfromDB ? (
          <div>
            <div className="flex gap-2">
              {Object.entries(props.teamsfromDB).map(([key, value]) => {
                return (
                  value!==null &&
                  (<div key={key} className="flex items-center gap-2">
                  <img
                    src={value}
                    alt={key}
                    className="w-12 h-12 object-cover"
                  />
                </div>)
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-white text-lg font-bold mt-4">
            Nie wybrałeś jeszcze ulubionych drużyn
          </p>
        )}
      </div>
  )
}

export default FavoriteTeams