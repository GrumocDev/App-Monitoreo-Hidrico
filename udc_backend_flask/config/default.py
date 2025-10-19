from datetime import timedelta
SECRET_KEY = '123447a47f563e90fe2db0f56b1b17be62378e31b7cfd3adc776c59ca4c75e2fc512c15f69bb38307d11d5d17a41a7936789'

PROPAGATE_EXCEPTIONS = True

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql://udc_user:S3cret@127.0.0.1:5432/udc_db_develop'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SHOW_SQLALCHEMY_LOG_MESSAGES = False

ERROR_404_HELP = False

MQTT_BROKER_URL = 'emqx.alltimetech.com.co'  # use the free broker from HIVEMQ
MQTT_BROKER_PORT = 11000  # default port for non-tls connection
#MQTT_USERNAME = ''  # set the username here if you need authentication for the broker
#MQTT_PASSWORD = ''  # set the password here if the broker demands authentication
MQTT_KEEPALIVE = 60  # set the time interval for sending a ping to the broker to 5 seconds
MQTT_TLS_ENABLED = False 
MQTT_CLIENT_ID = 'other-pc-123465'

JWT_SECRET_KEY = 'e663555ec96e0f84df0403f01bcd2340e91c91c730fd5ec90a68831a5ca1b36f'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)

MAIL_SERVER = 'sandbox.smtp.mailtrap.io'  # Usa smtp.sendinblue.com para Sendinblue
MAIL_PORT = 2525
MAIL_USE_TLS = True
MAIL_USERNAME = '49b9e5fc6767e2'
MAIL_PASSWORD = '89caaa40f77ef0'
MAIL_USE_SSL = False
MAIL_DEFAULT_SENDER = ('UDC Water', 'noreply@udcwater.com')

TESTING = False