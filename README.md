# OpenTok (TokBox) Project

This project demonstrates how to use the OpenTok (TokBox) API for live video streaming. The main functionality is to check the resolution, as in some scenarios the subscriber is not receiving the resolution selected by the publisher.

## Prerequisites

Before you begin, ensure you have the following:

- [OpenTok API key](https://tokbox.com/account/)
- OpenTok Session ID
- OpenTok Token
- Node.js installed

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/video-ot-samples/JSResolutionProject

Install the necessary dependencies:

bash
npm install
Create a config.js file in the root directory with the following content:

javascript
const API_KEY = 'your-api-key';
const SESSION_ID = 'your-session-id';
const TOKEN = 'your-token';
const SAMPLE_SERVER_BASE_URL = 'your-sample-server-base-url';

Update the index.html file with your API key, Session ID, and Token.

Running the Project
1. Start the project:

bash
npm start

2. Open your browser and navigate to http://localhost:3000.

Usage

Publishing a Stream
1. Select the desired resolution from the dropdown menu.

2. Click the "Publish" button to start publishing your video stream.

Subscribing to a Stream
1. Click the "Subscribe" button to subscribe to a newly created stream.

2. The resolution of the subscriber's stream will be displayed and logged to ensure it matches the publisher's selected resolution.

Code Explanation
The main JavaScript code for this project is in the index.js file. It initializes an OpenTok session, handles stream events, and manages video dimensions.

Key Functions
initializeSession(): Initializes the OpenTok session and sets up event listeners for stream creation and session disconnection.

handleError(error): Logs any errors to the console.

session.on("streamCreated", callback): Subscribes to newly created streams and checks the resolution.

session.connect(token, callback): Connects to the OpenTok session using the provided token.

session.publish(publisher, callback): Publishes the video stream with the selected resolution.

Important Properties and Methods
subscriber.stream.videoDimensions.height: Returns the height of the video stream that the subscriber is receiving.

subscriber.stream.videoDimensions.width: Returns the width of the video stream that the subscriber is receiving.

subscriber.videoHeight(): Returns the actual height of the video element that the subscriber is viewing.

subscriber.videoWidth(): Returns the actual width of the video element that the subscriber is viewing.

publisher.videoWidth(): Returns the actual width of the video element that the publisher is streaming.

publisher.videoHeight(): Returns the actual height of the video element that the publisher is streaming.

event.stream.videoDimensions.width: Returns the width of the video stream that the event's stream is set to.

event.stream.videoDimensions.height: Returns the height of the video stream that the event's stream is set to.

Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.