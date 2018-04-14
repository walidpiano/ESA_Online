import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

print("1")
server = smtplib.SMTP('smtp.mail.yahoo.com', 587) #smtp,port number
print("2")
server.ehlo()
server.starttls()
server.ehlo()
server.login("esaegypt@yahoo.com","eessaa2018")


fromaddr = "esaegypt@yahoo.com"
toaddr = "esaegypt@yahoo.com"
subject = "From Python"

msg = MIMEMultipart()
msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = subject
print("3")
body = "Sent from Python"
msg.attach(MIMEText(body, 'plain'))

text = msg.as_string()
server.sendmail(fromaddr, toaddr, text)
print('ok')
