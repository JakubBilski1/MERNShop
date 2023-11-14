import React from 'react'
import plTeams from '../../Entities/pl';

function PLTeams(props) {
    return (
        <div className="max-h-60 overflow-y-auto">
            {plTeams &&
                plTeams.map((team) => (
                    <label
                        key={team.id}
                        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700 transition duration-300"
                    >
                        <div className='flex gap-[5px]'>
                            <input
                                type="checkbox"
                                name={team.name}
                                id=""
                                value={team.image}
                                defaultChecked={props.checkIfChecked(team.name)}
                                onChange={e=>props.handleChange(e)}
                            />
                            <p className="text-white">{team.name}</p>
                        </div>
                        <img
                            src={team.image}
                            alt={team.name}
                            className="w-12 h-12 object-cover"
                        />
                    </label>
                ))}
        </div>
    )
}

export default PLTeams
