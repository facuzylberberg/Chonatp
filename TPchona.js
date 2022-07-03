// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract LigaFutbol {
    mapping(string => string) equipo_jugadores;
    mapping(string => uint256) equipo_puntos;
    string[] private _jugadores;
    uint256[] private _puntos;

    function agregarJugadores(string memory jugador) public {
        _jugadores.push(jugador);
    }

    function eliminarJugador(string memory jugador) public {
        for (uint256 i = 0; i < _jugadores.length; i++) {
            if (
                keccak256(abi.encodePacked(_jugadores[i])) ==
                keccak256(abi.encodePacked(jugador))
            ) {
                _jugadores.pop();
            }
        }
    }

    function agregarPuntosEquipos(
        string memory equipo1,
        string memory equipo2,
        uint256 goles1,
        uint256 goles2
    ) public {
        if (goles1 > goles2) {
            equipo_puntos[equipo1] = 3;
            equipo_puntos[equipo2] = 0;
            _puntos.push(3);
        } else if (goles1 < goles2) {
            equipo_puntos[equipo1] = 0;
            equipo_puntos[equipo2] = 3;
            _puntos.push(3);
        } else {
            equipo_puntos[equipo1] = 1;
            equipo_puntos[equipo2] = 1;
            _puntos.push(1);
        }
    }

    function getPuntosEquipos(string memory equipo)
        public
        view
        returns (uint256)
    {
        return equipo_puntos[equipo];
    }

    function getJugadores(string memory equipo) public returns (string memory) {
        return equipo_jugadores[equipo];
    }

    function puntero() public view returns (string memory) {
        uint256 max = 0;
        string memory max_equipo = "";
        for (uint256 i = 0; i < equipo_puntos.length; i++) {
            if (equipo_puntos[i] > max) {
                max = equipo_puntos[i];
                max_equipo = i;
            }
        }
        return max_equipo;
    }
}