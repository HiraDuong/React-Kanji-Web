// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "./CoursesStorage.sol";

contract Main is CoursesStorage, Ownable {
    constructor() Ownable(msg.sender) payable {
        createUser("Admin", "");
    }

    struct User {
        uint id;
        string name;
        string img;
    }   

    uint public userCount = 0;
    mapping(address => User) public users;

    // Danh sách địa chỉ người dùng
    EnumerableSet.AddressSet private userAddresses;

    // unique tên người dùng
    mapping(string => bool) public nameExists;
    error NameAlreadyExists(string name);
    error UserAlreadyExists(address user);
    modifier nameNotExists(string memory name) {
        if (nameExists[name]) {
            revert NameAlreadyExists(name);
        }
        _;
    }

    event UserCreated(uint id, string name, string img);
    event UserChanged(uint id, string name, string img);

    // Tạo một người dùng mới
    function createUser(string memory name, string memory img) public nameNotExists(name) {
        if (bytes(users[msg.sender].name).length != 0) {
            revert UserAlreadyExists(msg.sender);
        }

        userCount++;
        users[msg.sender] = User(userCount, name, img);

        EnumerableSet.add(userAddresses ,msg.sender);
        nameExists[name] = true;
    }
    // Xem thông tin toàn bộ người dùng
    function getAllUsers() public view onlyOwner returns (User[] memory) {
        User[] memory result = new User[](EnumerableSet.length(userAddresses));
        for (uint i = 0; i < EnumerableSet.length(userAddresses); i++) {
            result[i] = users[EnumerableSet.at(userAddresses, i)];
        }
        return result;
    }
    // Xem thông tin người dùng
    function getUser() public view returns (User memory) {
        return users[msg.sender];
    }
    // Sửa thông tin người dùng 
    function updateUser(string memory name, string memory img) nameNotExists(name) public {
        nameExists[name] = true;
        nameExists[users[msg.sender].name] = false;
        users[msg.sender].name = name;
        users[msg.sender].img = img;
        emit UserChanged(users[msg.sender].id, name, img);
    }
    // Xóa người dùng
    function deleteUser() public {
        nameExists[users[msg.sender].name] = false;
        EnumerableSet.remove(userAddresses, msg.sender);
        delete users[msg.sender];
    }
    // Xem thông tin người dùng theo địa chỉ    
    function getUserByAddress(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }
}