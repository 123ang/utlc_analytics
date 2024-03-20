import smtplib
from email.mime.text import MIMEText

def send_email(receiver_email, subject, body):
    sender_email = "ai.uum.edu@gmail.com"  # Replace with your email
    sender_password = "cvpabaymfcvqjpim"  # Replace with your email password

    # Setup the MIME
    message = MIMEText(body, 'plain')
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = receiver_email

    # Sending the email
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:  # Replace with your SMTP server
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        return "Email sent successfully!"
    except Exception as e:
        return f"Failed to send email: {e}"
