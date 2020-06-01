<?php

class MailTemplate {
  public $html;
  public $letterTitle = "";
  public $fio = "fio";
  public $phone = "phone";
  public $city = "city";
  public $brandAuto = "";

  function createTemplate() {
    if($this->letterTitle == "Хочу зарабатывать сейчас") {
      $messageText = "Здравствуйте! Хочу подключиться. Высылаю вам фото документов";
      $brandAutoText = "<p><b>Брендированный автомобиль:</b> " . $this->brandAuto . "</p>";
    } else {
      $messageText = "Здравствуйте! Заинтересовало ваше предложение. Хочу узнать подробнее. Перезвоните, пожалуйста.";
    }
    $this->html = <<<HERE
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>$this->letterTitle</title>
      </head>
      <body style="margin: 0; padding: 0;">
      <table cellspacing="0" cellpadding="0" width="100%">
      <tr>
        <td>
          <table
            style="border-collapse: collapse;"
            width="600px"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td
                style="padding: 15px;"
              >
                <a href="https://taxirul.ru" style="text-decoration: none;">
                  <img
                    src="https://taxirul.ru/images/logo.png"
                    alt="logo"
                    width="150"
                    height="auto"
                    style="display:block; padding-bottom: 10px;"
                  />
                </a>
                <h3 style="margin:7px 0;"><a href="https://taxirul.ru" style="text-decoration: none;">Таксопарк "Рулевой"</a></h3>
              </td>
            </tr>
            <tr>
              <td>
                <h4 style="margin:15px 0 7px;"><b>$this->letterTitle</b></h4>
              </td>
            </tr>
            <tr>
              <td>
                <table cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td>
                      <p>$messageText</p>
                      <p>Мои контактные данные:</p>
                      <p><b>ФИО:</b> $this->fio</p>
                      <p><b>Телефон:</b> $this->phone</p>
                      <p><b>Город:</b> $this->city</p>
                      $brandAutoText
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
      </body>
      </html>
    HERE;

    return $this->html;
  }
}