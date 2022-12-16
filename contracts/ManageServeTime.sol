// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 <0.9.0;

import "./MyToken.sol";

contract ManageServeTime is MyToken{
    event timeExceededA(uint256 departureTime, uint256 STIPULATED_DEPARTURE);
    event timeExceededB(uint256 arrivalTime, uint256 STIPULATED_ARRIVAL);
    event timeExceededC(uint256 realTime, uint256 STIPULATED_TIME);

    uint256 departureTime;
    uint256 arrivalTime;
    uint256 realTime;

    function callDepartureTime(uint256 _departureTime, uint256 STIPULATED_DEPARTURE, address _to) public payable returns (uint256) {
        _departureTime = block.timestamp;
        if(_departureTime > STIPULATED_DEPARTURE){
            emit timeExceededA(_departureTime, STIPULATED_DEPARTURE);
        _mint(_to, 10);
        }
        _departureTime = departureTime;
        return _departureTime;
    }

    function callArrivalTime(uint256 _arrivalTime, uint256 STIPULATED_ARRIVAL, address _to) public payable returns(uint256){
        _arrivalTime = block.timestamp;
        require(_arrivalTime > departureTime);
        if(_arrivalTime > STIPULATED_ARRIVAL){
            emit timeExceededB(_arrivalTime, STIPULATED_ARRIVAL);
        _mint(_to, 20);
        } 
        _arrivalTime = arrivalTime;
        return _arrivalTime;
    }

    function callRealTime(uint256 _realTime, uint256 STIPULATED_TIME, address _to) public payable returns(uint256){
        _realTime = arrivalTime - departureTime;
        // STIPULATED_TIME = 1;
        if (_realTime > STIPULATED_TIME){
        emit timeExceededC(_realTime, STIPULATED_TIME);
                _mint(_to, 30);
        } 
        _realTime = realTime;
        return _realTime; 
    }

}












/* hora de salida
hora de llegada
fecha de salida
fecha de llegada
monto
horas
origen
destino
*/




