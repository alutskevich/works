<?php if($_POST){
  $to  = 'karantin91@gmail.com' . ', '; // note the comma
  $sender = $_POST['email'];
  $subject = 'Examenline - Заказ услуги';
  $uploaddir = $_SERVER['DOCUMENT_ROOT'].'/files/';
  //$uploadfile = $uploaddir . basename($_FILES['image']['name']);
  $random = rand(1,20000);

  $message = '
  <html>
  <head>
    <title>Examenline - Заказ услуги </title>
  </head>
  <body>
  <p>На сайте <a href="http://examenline.com" target="_blank" title="Examenline">Examenline</a> была заполнена заявка на услуги. Информация предоставлена ниже:</p>
  <table cellspacing="5" cellpadding="5">
    <tr>
      <th>Имя</th>
      <th>Почтовый ящик</th>
      <th>Предмет</th>
      <th>Дата проведения</th>
      <th>Время</th>
      <th>Время на решение</th>
      <th>Количество заданий</th>
    </tr>
    <tr>
      <td>'.htmlspecialchars(trim($_POST['name'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['email'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['lesson'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['date'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['time'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['exp_time'])).'</td>
      <td>'.htmlspecialchars(trim($_POST['count'])).'</td>
    </tr>
    <tr>
      <td colspan="6">
        <b>Пожелания относительно оформления:</b>
        '.htmlspecialchars(trim($_POST['message'])).'
      </td>
    </tr>
  </table>';

  for($i=0; $i<count($_FILES['image']['name']); $i++) {

  $tmp_name = $_FILES["image"]["tmp_name"][$i];
  $name = $_FILES["image"]["name"][$i];

  $nameOrig = pathinfo($name, PATHINFO_FILENAME);
  $extension = pathinfo($name, PATHINFO_EXTENSION);

  if(file_exists($uploaddir . basename($_FILES['image']['name'][$i]))) {
  $nameOrig .= $random;
  $basename = $nameOrig.'.'.$extension;
  } else{
  $basename = $name;
  }
  $uploadfile = $uploaddir . basename($basename);
  if(move_uploaded_file($tmp_name, $uploadfile)){
  $img = "<a href='http://".$_SERVER['HTTP_HOST']."/files/".$basename."'>".$basename."</a>";
  $message .= "Файл доступен по ссылке - ".$img."<br>";
  } else{

  }
  }
  $message .='</body>
  </html>';

  $message2 = '
  <html>
  <head>
    <title>Examenline - Заказ услуги </title>
  </head>
  <body>
  <p>Вы заказали услугу на сайте <a href="http://examenline.com" target="_blank" title="Examenline">Examenline</a>. В Ближайшее время мы с Вами свяжемся! Спасибо за обращение!</p>
  </body>
  </html>';

  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
  $headers .= 'From: Examenline <Examenline@h217.hosting.ua>' . "\r\n";

  // Additional headers
  /*$headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
  $headers .= 'From: Birthday Reminder <birthday@example.com>' . "\r\n";
  $headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
  $headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";*/

  mail($to, $subject, $message, $headers);
  mail($sender, $subject, $message2, $headers);
}
?>