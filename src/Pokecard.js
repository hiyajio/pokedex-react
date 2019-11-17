import React from 'react';
import './Pokecard.css';
import pokeTypes from './helpers/pokeTypes';

function Pokecard({pokemon}) {
    return (
        <div className="Pokecard">
            <div className="Pokecard-img">
                <img src={pokemon.sprites.front_default} alt=""/>
            </div>
            <div className="Pokecard-title">
                {pokemon.name}
            </div>
            <div className="Pokecard-types">
                {pokemon.types.map(type => {
                    return (
                        <button type="button" className="btn Pokecard-type my-2 my-sm-0" disabled style={{ backgroundColor: pokeTypes[type.type.name]}}>
                            {type.type.name}
                        </button>
                    )
                })}
            </div>
            <br></br>
            <div className="Pokecard-info">
                <div className="Pokecard-data">
                    <p className="title">Pokedex Number</p>
                    <p>{pokemon.order}</p>
                </div>
            </div>
        </div>
    );
}

export default Pokecard;

// <div className="Pokecard-info">
//     <div className="Pokecard-data">
//         <p className="title">Height</p>
//         <p>{pokemon.height}</p>
//     </div>
//     <div className="Pokecard-data">
//         <p className="title">Weight</p>
//         <p>{pokemon.weight}</p>
//     </div>
//     <div className="Pokecard-data">
//         <p className="title">Ability</p>
//         <p>{pokemon.abilities[0].ability.name}</p>
//     </div>
// </div>