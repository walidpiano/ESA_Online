import os
import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_mail(subject, message, with_image, student_image_name):
    result = False
    from_address = 'esaegypt@yahoo.com'
    to_address = 'esaegypt@yahoo.com'
    try:
        image_name = f'app/uploaded_images/{student_image_name}.jpg'
        img_data = open(image_name, 'rb').read()
        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = from_address
        msg['To'] = to_address

        text = MIMEText(message)
        msg.attach(text)

        if with_image:
            image = MIMEImage(img_data, name=os.path.basename(image_name))
            msg.attach(image)

        server = smtplib.SMTP('smtp.mail.yahoo.com', 587)  # smtp,port number
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login("esaegypt@yahoo.com", "eessaa2018")
        server.sendmail(from_address, to_address, msg.as_string())
        server.quit()
        if os.path.exists(image_name):
            os.remove(image_name)

        result = True
    except Exception as e:
        result = e

    return result
