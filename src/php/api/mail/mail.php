<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

class MailSender {
  private $mail;
  /* private $host = "smtp.yandex.ru"; */
  private $host = "mail.taxirul.ru";
  private $username = "no-reply@taxirul.ru";
  private $password = "O6l0U7s2";

  public $address = "v754026@yandex.ru";
  public $letter = "";
  public $messageSubject = "";

  function __construct() {
    $this->mail = new PHPMailer;
    $this->mail->isSMTP();
    $this->mail->SMTPDebug = 0;
    $this->mail->Host = $this->host;
    $this->mail->Port = "465";
    $this->mail->SMTPSecure = 'ssl';
    $this->mail->SMTPAuth = true;
    $this->mail->Username = $this->username;
    $this->mail->Password = $this->password;
  }

  function sendMail($template) {
    $this->mail->setFrom($this->username, "Сообщение с taxirul.ru");
    $this->mail->addAddress($this->address, $this->address);
    $this->mail->Subject = $this->messageSubject;

    $this->letter = $template->createTemplate();

    $this->mail->msgHTML($this->letter);
    $this->mail->AltBody = 'HTML not supported';

    if($this->messageSubject == "Хочу зарабатывать сейчас") {
      $this->mail->addAttachment($_FILES['stsBack']['tmp_name'], 'СТС_обратная.jpg');
      $this->mail->addAttachment($_FILES['vodFront']['tmp_name'], 'Водительское_лицевая.jpg');
      $this->mail->addAttachment($_FILES['vodBack']['tmp_name'], 'Водительское_обратная.jpg');
      $this->mail->addAttachment($_FILES['passport']['tmp_name'], 'Паспорт.jpg');
      $this->mail->addAttachment($_FILES['passportSelfie']['tmp_name'], 'Паспорт_Селфи.jpg');
      $this->mail->addAttachment($_FILES['addressReg']['tmp_name'], 'Прописка.jpg');
    }

    $this->mail->CharSet = "utf-8";
    $this->mail->send();
  }
}