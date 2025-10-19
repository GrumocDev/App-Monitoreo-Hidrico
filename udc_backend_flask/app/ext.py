from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_mqtt import Mqtt
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail

ma = Marshmallow()
migrate = Migrate()
mqtt = Mqtt()
jwt = JWTManager()
bcrypt = Bcrypt()
mail = Mail()