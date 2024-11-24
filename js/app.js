/* global OT API_KEY TOKEN SESSION_ID SAMPLE_SERVER_BASE_URL */

let apiKey;
let sessionId;
let token;

function handleError(error) {
  if (error) {
    console.error(error);
  }
}

function initializeSession() {
  const session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", (event) => {
    document.getElementById("subscribeButton").addEventListener("click", () => {
      const subscriberOptions = {
        insertMode: "append",
        width: "100%",
        height: "100%",
      };

      const subscriber = session.subscribe(
        event.stream,
        "subscriber",
        subscriberOptions,
        handleError
      );

      setInterval(() => {
        console.log(
          `subscriber.stream.videoDimensions.width: ${subscriber.stream.videoDimensions.width}`
        );
        console.log(
          `subscriber.stream.videoDimensions.height: ${subscriber.stream.videoDimensions.height}`
        );
        document.getElementById(
          "subscriberVideoDimensionWidth"
        ).innerText = `subscriber.stream.videoDimensions.width: ${subscriber.stream.videoDimensions.width}`;

        document.getElementById(
          "subscriberVideoDimensionHeight"
        ).innerText = `subscriber.stream.videoDimensions.height: ${subscriber.stream.videoDimensions.height}`;
      }, 5000);
      subscriber.on("videoElementCreated", () => {
        setInterval(() => {
          console.log(`subscriber.videoWidth(): ${subscriber.videoWidth()}`);
          console.log(`subscriber.videoHeight(): ${subscriber.videoHeight()}`);
          document.getElementById(
            "subscriberVideoWidth"
          ).innerText = `subscriber.videoWidth(): ${subscriber.videoWidth()}`;
          document.getElementById(
            "subscriberVideoHeight"
          ).innerText = `subscriber.videoHeight(): ${subscriber.videoHeight()}`;
        }, 5000);
      });
    });
  });

  session.on("sessionDisconnected", (event) => {
    console.log("You were disconnected from the session.", event.reason);
  });

  session.connect(token, (error) => {
    if (error) {
      handleError(error);
    } else {
      document.getElementById("publishButton").addEventListener("click", () => {
        const resolution = document.getElementById("resolutionSelect").value;
        if (!resolution) {
          alert("please select a resolution before publishing");
          return;
        }
        const [width, height] = resolution.split("x").map(Number);
        document.getElementById("publisher").style.display = "block";
        const publisherOptions = {
          insertMode: "append",
          width: "100%",
          height: "100%",
          resolution: `${width}x${height}`,
        };
        const publisher = OT.initPublisher(
          "publisher",
          publisherOptions,
          handleError
        );
        publisher.on("videoElementCreated", () => {
          setInterval(() => {
            console.log(`publisher.videoWidth(): ${publisher.videoWidth()}`);
            document.getElementById(
              "publisherVideoWidth"
            ).innerText = `publisher.videoWidth(): ${publisher.videoWidth()}`;
            console.log(`publisher.videoHeight(): ${publisher.videoHeight()}`);
            document.getElementById(
              "publisherVideoHeight"
            ).innerText = `publisher.videoHeight(): ${publisher.videoHeight()}`;
          }, 5000);
        });

        publisher.on("streamCreated", (event) => {
          setInterval(() => {
            console.log(
              `event.stream.videoDimensions.width: ${event.stream.videoDimensions.width}`
            );
            document.getElementById(
              "publisherVideoDimensionWidth"
            ).innerText = `event.stream.videoDimensions.width: ${event.stream.videoDimensions.width}`;

            console.log(
              `event.stream.videoDimensions.height: ${event.stream.videoDimensions.height}`
            );
            document.getElementById(
              "publisherVideoDimensionHeight"
            ).innerText = `event.stream.videoDimensions.height: ${event.stream.videoDimensions.height}`;
          }, 5000);
        });
        session.publish(publisher, handleError);
      });
    }
  });
}

// See the config.js file.
document.addEventListener("DOMContentLoaded", (event) => {
  if (API_KEY && TOKEN && SESSION_ID) {
    apiKey = API_KEY;
    sessionId = SESSION_ID;
    token = TOKEN;
    initializeSession();
  } else if (SAMPLE_SERVER_BASE_URL) {
    // Make a GET request to get the OpenTok API key, session ID, and token from the server
    fetch(SAMPLE_SERVER_BASE_URL + "/session")
      .then((response) => response.json())
      .then((json) => {
        apiKey = json.apiKey;
        sessionId = json.sessionId;
        token = json.token;
        // Initialize an OpenTok Session object
        initializeSession();
      })
      .catch((error) => {
        handleError(error);
        alert(
          "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
        );
      });
  }
});
