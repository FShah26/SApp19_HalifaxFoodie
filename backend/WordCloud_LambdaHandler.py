import pymysql.cursors
import boto3
import json
import os


RDS_HOST = os.environ['RDS_HOST']
RDS_DB = os.environ['RDS_DB']
RDS_USER = os.environ['RDS_USER']
RDS_PASSWORD = os.environ['RDS_PASSWORD']
port=3306
Region = os.environ['Region']

try:
    conn = pymysql.connect(host=RDS_HOST, user=RDS_USER,password=RDS_PASSWORD, db=RDS_DB)
    comprehend = boto3.client(service_name='comprehend',region_name=Region)
except Exception as e:
    print(e)


def lambda_handler(event,context):
    statusCode=0
    data={}
    message=""
    itemId = event.get('itemId', 0)
    feedbacks = []
    entities = {}
    try:
        if(itemId != 0):
            sql = "SELECT * FROM fooditemFeedbacks WHERE menuItemId= {} ".format(itemId);
            print(sql)
            with conn.cursor() as cur:
                cur.execute(sql)
                body = cur.fetchall()
                for row in body:
                    # print(row)
                    feedbacks.append(row[2])
                # print(feedbacks)
            for feedback in feedbacks:
                # print(feedback)
                result = json.dumps(comprehend.detect_entities(Text=feedback,LanguageCode='en')['Entities'])
                # print(result)
                if(len(result) > 0):
                    for entity in result:
                        text = entity['Text']
                        if(text in entities.keys()):
                            entities[text] += 1
                        else:
                            entities[text] = 1
            # print(entities)
            statusCode=200
            menuItemId="Entities extracted"
        else:
            statusCode=400
            message="Bad Request"
    except Exception as e:
        print(e)
        statusCode=500
        message="Internal Server Error"

    return {
        'statusCode': statusCode,
        'message':message,
        'data':json.dumps(entities)
    }