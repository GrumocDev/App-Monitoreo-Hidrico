from functools import wraps
from flask_jwt_extended import get_jwt, get_jwt_identity, verify_jwt_in_request

def role_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get('role') != required_role:
                return {"msg": "Access forbidden: incorrect role"}, 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator