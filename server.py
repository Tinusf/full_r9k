from flask import Flask, request
import json

app = Flask(__name__)

used_words = set()


@app.route("/")
def hello():
    return "Hello"


@app.route("/insert_sentence", methods=["PUT"])
def insert_word():
    json_input_data = json.loads(request.data)
    sentence = json_input_data["sentence"]
    return check_unique(sentence)


@app.route("/used_words", methods=["GET"])
def get_all_words():
    return ", ".join(used_words)


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
