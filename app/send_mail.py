import smtplib
from smtplib import SMTPException
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_mail(subject, message):
    result = False
    try:
        server = smtplib.SMTP('smtp.mail.yahoo.com', 587)  # smtp,port number
        server.ehlo()
        server.starttls()
        server.ehlo()

        server.login("esaegypt@yahoo.com", "eessaa2018")
        fromaddr = "esaegypt@yahoo.com"
        toaddr = "esaegypt@yahoo.com"
        subject = subject
        msg = MIMEMultipart()
        msg['From'] = fromaddr
        msg['To'] = toaddr
        msg['Subject'] = subject
        body = message
        msg.attach(MIMEText(body, 'plain'))
        text = msg.as_string()

        server.sendmail(fromaddr, toaddr, text)
        result = True
    except Exception as e:
        result = False

    return result


result = send_mail('ww', 'wwwww')
print(result)
