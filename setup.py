from setuptools import setup

version = '0.0.1'

setup(name='flask-app',
      version=version,
      description="flask based web app",
      long_description=open("./README.md", "r").read(),
      classifiers=[
          "Development Status :: 5 - Production/Stable",
          "Environment :: Web",
          "Intended Audience :: browser",
          "Natural Language :: English",
          "Operating System :: OS Independent",
          "Programming Language :: Python",
          "Topic :: Internet :: WWW/HTTP :: Dynamic Content :: CGI Tools/Libraries",
          "Topic :: Utilities"
      ],
      keywords='flask flask',
      author='vijaya raghava k',
      author_email='raghava.k2@gmail.com',
      url='https://github.com/raghava-k2/flask-app',
      license='GNU',
      packages=['flask', 'musicbrainz'],
      include_package_data=True,
      zip_safe=True,
      )
