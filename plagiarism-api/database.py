from pymongo import MongoClient

class ReferenceDB:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="plagiarism_db", collection_name="references"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def get_reference_texts(self):
     return [doc["text"] for doc in self.collection.find()]


    def add_reference_text(self, text):
     if not self.collection.find_one({"text": text}):
        self.collection.insert_one({"text": text})


    def clear_references(self):
        self.collection.delete_many({})