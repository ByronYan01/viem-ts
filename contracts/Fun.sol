// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.25;

event ChangedX(uint256 oldX, uint256 newX);

contract Fun {
  uint256 public x;
  constructor(uint256 _x) {
    emit ChangedX(0, _x);
    x = _x;
  }
  function changeX(uint256 _x) external {
    emit ChangedX(x, _x);
    x = _x;
  }
}