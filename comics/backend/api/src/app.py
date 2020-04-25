from db.mongo import db_comics
from db.characters import characters
from flask_cors import CORS
from flask import Flask, jsonify, request
import json
from bson import ObjectId

app = Flask(__name__)
CORS(app)

@app.before_first_request
def insert_superheores_by_default():
    """Insertamos los personajes por defecto a la BBDD"""
    try:
        db_comics.characters.drop()
        db_comics.characters.insert_many(characters)
        return 'OK'
    except:
        raise
    
@app.route('/marvel', methods=['GET'])
def marvel_characters():
    """Retorna todos los personajes de Marvel"""
    try:
        marvel_list_characters = list(db_comics.characters.find({'house':'Marvel'}))
        for char in marvel_list_characters:
            char['_id'] = str(char['_id'])
        return jsonify(marvel_list_characters)
    except:
        raise


@app.route('/dc', methods=['GET'])
def dc_characters():
    """Retorna todos los personajes de DC"""
    try:
        dc_list_characters = list(db_comics.characters.find({'house':'DC'}))
        for char in dc_list_characters:
            char['_id'] = str(char['_id'])
        return jsonify(dc_list_characters)
    except:
        raise


@app.route('/characters', methods=['GET', 'DELETE', 'POST', 'PUT'])
def characters_abm():
    try:
        if request.method == 'DELETE':
            # Borramos el dpersonaje de la coleccion
            delete_result = db_comics.characters.delete_one({"_id": ObjectId(request.args['id'])})
            return 'ok'

        if request.method == 'GET':
            # Obtenemos el personaje de la coleccion por id
            dc_character = list(db_comics.characters.find({"_id": ObjectId(request.args['id'])}))
            dc_character[0]['_id'] = str(dc_character[0]['_id'])
            return jsonify(dc_character)
        
        if request.method == 'POST':
            # Insertamos el personaje en la coleccion
            insert_result = db_comics.characters.insert_one(request.get_json())
            return 'OK'

        if request.method == 'PUT':
            character = request.get_json()
            for k in character:
                # Editamos el personaje en la coleccion
                insert_result = db_comics.characters.update_one({'_id': ObjectId(character['id'])}, {'$set': {k: character[k]}})
            return 'OK'
    except:
        raise


if __name__ == "__main__":
    app.run(host='localhost', port='5000', debug=True)


