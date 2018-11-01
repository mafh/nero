<?php
	$subject = $_POST['category'];
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$mailto = "e.finogenova@neroelectronics.by";

	$message = wordwrap($message, 70, "\r\n");

	mail($mailto, "Заявка с сайта " . $subject, print_r($_POST) . $subject . "\r\n\r\n" . $message . "\r\n\r\nФИО:" . $name . "\r\nE-mail: " . $email ,"From: " . $mailto . " \r\n");
?>