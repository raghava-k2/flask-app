from flask import Flask, jsonify
import musicbrainzngs
import sys

app = Flask(__name__)

musicbrainzngs.set_useragent(
    "python-musicbrainzngs-example",
    "0.1",
    "https://github.com/alastair/python-musicbrainzngs/",
)


def get_albums_searched_by_user(artist, release, limit):
    result = musicbrainzngs.search_releases(artist=artist, release=release,
                                            limit=limit)
    if not result['release-list']:
        return "no release found"
    return jsonify(result['release-list'])


@app.route('/')
def index():
    return 'server is up and ready to serve'


@app.route("/music/<string:artist>/<string:album>/<int:limit>", methods=["GET"])
def get_list_of_artist_and_albums_by_search_param(artist, album, limit):
    return get_albums_searched_by_user(artist, album, limit)
