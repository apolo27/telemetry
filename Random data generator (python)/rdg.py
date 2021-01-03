from firebase import firebase
from datetime import datetime
import sys  # Todo
import logging  # Todo
import random
import time

firebase = firebase.FirebaseApplication("https://apolo-27-telemetry-default-rtdb.firebaseio.com/", None)

for element in range(50):
    data =  { "date": datetime.now(),
            "pilot": {
                "temperature" : random.randrange(23, 45),
                "heartRate" : random.randrange(60, 100),
                "oxigeneLevel": random.randrange(85, 100),
                "braceletBattery": random.randrange(25,100)
            },
            "enviroment": {
                "temperature": random.randrange(23, 45),
                "humidity": random.randrange(25,70),
                "UV": random.randrange(0, 10),
                "pressure": random.randrange(85,120)
            },
            "rover":{
                "RPM": random.randrange(0,100),
                "GPS": [random.randrange(-255, 255), random.randrange(-255, 255), random.randrange(-255, 255)],
                "roverBattery": 0
            }
            }
            
    result = firebase.post("records", data)
    print(result)
    time.sleep(0.5)