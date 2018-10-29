<?php
/**
 * Created by IntelliJ IDEA.
 * User: browen
 * Date: 12/10/2017
 * Time: 10:01 PM
 */
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

$conn = new mysqli("localhost", "root", "root", "426Project");
if($conn->connect_error){
    die("Could not connect to database.");
}

$res = array('error' => false);

$action = 'read';
$choice = '0';
$num = '0';
//NEW
$new_id = '0';

if(isset($_GET['action'])){
    $action = $_GET['action'];
    $choice = $_GET['choice'];
    $num = $_GET['num'];
}

if($action == 'read'){
    if($choice == '0'){
        $result = $conn->query("SELECT src, alt, keyword FROM `clue` WHERE id='$num'");
        $users = array();
        while($row = $result->fetch_assoc()){
            array_push($users, $row);
        }
        $res['clue'] = $users;
    }
}

if($action == 'create'){

    $username = $_POST['username'];

    $result = $conn->query("INSERT INTO `users` (`username`) VALUES ('$username') ");

    if($conn->query("INSERT INTO `users` (`username`) VALUES ('$username') ");){
        $res['message'] = "User added successfully";
        $new_id = $conn->insert_id;
    } else{
        $res['error'] = true;
        $res['message'] = "Could not insert user";
    }
}

if($action == 'update'){
    $id = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    $result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id'");

    if($result){
        $res['message'] = "User updated successfully";
    } else{
        $res['error'] = true;
        $res['message'] = "Could not update user";
    }

}

if($action == 'delete'){
    $id = $_POST['id'];


    $result = $conn->query("DELETE FROM `users` WHERE `id` = '$id'");

    if($result){
        $res['message'] = "User deleted successfully";
    } else{
        $res['error'] = true;
        $res['message'] = "Could not delete user";
    }

}


$conn->close();

header("Content-type: application/json");
echo json_encode($res);
die();