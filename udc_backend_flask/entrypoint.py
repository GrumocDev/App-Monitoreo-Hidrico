import os
import logging

from app import create_app

settings_module = os.getenv('APP_SETTINGS_MODULE')
app = create_app(settings_module)

@app.route('/api/v1/health')
def health_check():
    return {"status": "ok"}, 200

if __name__ == "__main__":
    app.run(debug=True)
