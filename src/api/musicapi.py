from flask import Flask, jsonify, request
import musicbrainzngs
import bitly_api

app = Flask(__name__)

BITLY_ACCESS_TOKEN = '60e57369aa0349560dc2f50c2a0fe12c0dfdb704'

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


def convert_to_tiny_url(url):
    bitly = bitly_api.Connection(access_token=BITLY_ACCESS_TOKEN)
    return bitly.shorten(url)


@app.route('/')
def index():
    return 'server is up and ready to serve'


@app.route("/music/<string:artist>/<string:album>/<int:limit>", methods=["GET"])
def get_list_of_artist_and_albums_by_search_param(artist, album, limit):
    return get_albums_searched_by_user(artist, album, limit)


@app.route('/tiny/', methods=['POST'])
def get_tiny_url():
    content = request.json
    return convert_to_tiny_url(content['long_url'])
