<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include $_SERVER['DOCUMENT_ROOT'] . "/api/mail/mail.php";
include $_SERVER['DOCUMENT_ROOT'] . "/api/mail/mail_template.php";

if(isset($_POST['purpose']) && isset($_POST['g-recaptcha-response'])) {
  $captcha = $_POST['g-recaptcha-response'];
  $secret   = '6LepZf0UAAAAAKb0wKpyiGLBcc2Xdty17eR3w4fe';
  $response = file_get_contents(
      "https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']
  );
  $response = json_decode($response);

  if ($response->success === false) {
    header('HTTP/1.1 500 Internal Server Error');
    exit();
  }
  //if bot maybe
  if ($response->success==true && $response->score <= 0.5) {
    header('HTTP/1.1 500 Internal Server Error');
    exit();
  } else {
    if($_POST['purpose'] == "callback") {
      $messagePurpose = "Заказ обратного звонка";
      $fio = trim(htmlspecialchars($_POST['cbFio']));
      $phone = trim(htmlspecialchars($_POST['cbPhone']));
      $city = trim(htmlspecialchars($_POST['cbCity']));
    } else if($_POST['purpose'] == "earnNow") {
      $messagePurpose = "Хочу зарабатывать сейчас";
      $fio = trim(htmlspecialchars($_POST['enFio']));
      $phone = trim(htmlspecialchars($_POST['enPhone']));
      $city = trim(htmlspecialchars($_POST['enCity']));
      $brandAuto = ($_POST['brandAuto'] == "on") ? "Да" : "Нет";
    }

    $mailTemplate = new MailTemplate;
    $mailTemplate->fio = $fio;
    $mailTemplate->phone = $phone;
    $mailTemplate->city = $city;
    if(isset($brandAuto)) {
      $mailTemplate->brandAuto = $brandAuto;
    }
    $mailTemplate->letterTitle = $messagePurpose;

    $mail = new MailSender;
    $mail->messageSubject = $messagePurpose;
    $mail->sendMail($mailTemplate);
    
  }
} else {
  header('HTTP/1.1 500 Internal Server Error');
  exit();
}

