from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

used_words = set()


def format_answer(text, status_code=200):
    # TODO: fix status_code.
    return json.dumps({"status": status_code, "text": text})


@app.route("/")
def hello():
    return format_answer("Hello")


@app.route("/insert_sentence", methods=["PUT"])
def insert_word():
    json_input_data = json.loads(request.data)
    sentence = json_input_data["sentence"]
    return format_answer(check_unique(sentence))


@app.route("/used_words", methods=["GET"])
def get_all_words():
    return format_answer(", ".join(used_words))


def check_unique(sentence):
    """
    This function will check if every word is unique and if it is then it will insert
    every word into the used_words global set.
    :param sentence: A string containing multiple words.
    :return: Either a failure and the word that failed or success.
    """
    global used_words

    words = sentence.split()
    local_used_words = set()

    for word in words:
        if word in local_used_words or word in used_words:
            return "Failure at word " + word
        local_used_words.add(word)

    used_words.update(local_used_words)

    return "Success"
