<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // HONEYPOT CHECK: Wenn dieses Feld ausgefüllt ist, ist es ein Bot
    if (!empty($_POST["website_honey"])) {
        http_response_code(400);
        exit("Spam erkannt.");
    }

    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Validierung
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit("Bitte füllen Sie alle Felder korrekt aus.");
    }

    $recipient = "info@lunsen-honig.de";
    $email_subject = "Kontaktanfrage: $subject";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Nachricht:\n$message\n";

    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($recipient, $email_subject, $email_content, $headers)) {
        // Redirect zur Danke-Seite
        header("Location: /danke");
        exit;
    } else {
        http_response_code(500);
        echo "Leider gab es ein Server-Problem beim Versenden.";
    }
}
?>