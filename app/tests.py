from app import send_mail



subject = 'test mail'
message = 'test attchment'
with_image = True

result = send_mail.send_mail(subject, message, with_image)
result = send_mail.send_mail(subject, message, False)

print(result)
